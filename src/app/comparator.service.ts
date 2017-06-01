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
          this.list.push(new Repository(repoData));
        }

        this.listUpdated.emit();
      }
    );

    // TODO: // /repos/:owner/:repo/stats/contributors
  }
}
