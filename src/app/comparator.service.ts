import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Repository } from './repository';

@Injectable()
export class ComparatorService {
  private list: Repository[] = [];
  private listUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: Http) { }

  getList() {
    // no one should mess with the list, so a copy is returned
    return this.list.slice();
  }

  get onListUpdated() {
    return this.listUpdated;
  }

  changeTargets(...repos: string[]) {
    const observables: Observable<Response>[] = [];

    for (const repoFullName of repos) {
      observables.push(
        this.http.get('https://api.github.com/repos/' + repoFullName).map(res => res.json())
      );
    }

    Observable.forkJoin(observables).subscribe(
      (results) => {
        this.list = [];
        for (const repoData of results) {
          const repo: Repository = new Repository(repoData);
          this.list.push(repo);

          this.fetchContributorsAmount(repo);
          this.fetchLastCommitOnMaster(repo);
        }

        this.listUpdated.emit();
      }
    );
  }

  private fetchContributorsAmount(repo: Repository) {
    // Currently using this strategy: https://stackoverflow.com/a/44347632/3497671
    // I wonder if there is there a better way

    const params = '?per_page=1&anon=1';
    const contributorsObs: Observable<Response> = this.http.get(
      'https://api.github.com/repos/' + repo.data.full_name + '/contributors'
      + params
    );

    contributorsObs.subscribe(
      (contributorsResult: Response) => {
        const link = contributorsResult.headers.get('link');

        // For some reasons, when the amount is 1
        // the 'Link' property is not present in the header
        if (!link) {
          repo.contributors_count = 1;
          return;
        }

        const paramsRet = params + '&page=';
        repo.contributors_count = +link.substring(
          link.lastIndexOf(paramsRet) + paramsRet.length,
          link.indexOf('>; rel="last"'),
        );
      }
    );
  }

  private fetchLastCommitOnMaster(repo: Repository) {
    const headObs: Observable<Response> = this.http.get(
      'https://api.github.com/repos/' + repo.data.full_name + '/git/refs/heads/' + repo.data.default_branch
    );

    headObs.subscribe(
      (headResult: Response) => {
        const hash = headResult.json().object.sha;

        const commitObs: Observable<Response> = this.http.get(
          'https://api.github.com/repos/' + repo.data.full_name + '/commits/' + hash
        );

        commitObs.subscribe(
          (commitResult: Response) => {
            repo.lastCommit = commitResult.json();
          }
        );
      }
    );
  }
}
