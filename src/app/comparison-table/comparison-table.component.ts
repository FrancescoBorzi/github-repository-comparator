import { Component, OnInit } from '@angular/core';

import { ComparatorService } from '../comparator.service';
import { Repository } from '../repository';

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.css']
})
export class ComparisonTableComponent implements OnInit {

  private list: Repository[];

  constructor(private cs: ComparatorService) { }

  ngOnInit() {
    this.list = this.cs.getList();
    this.cs.onListUpdated.subscribe(() => this.list = this.cs.getList());

    // just a shortcut for development
    this.cs.changeTargets("angular/angular", "microsoft/typescript");
  }

}
