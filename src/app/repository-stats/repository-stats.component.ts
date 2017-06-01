import { Component, Input, OnInit } from '@angular/core';
import { Repository } from "../repository";

@Component({
  selector: 'app-repository-stats',
  templateUrl: './repository-stats.component.html',
  styleUrls: ['./repository-stats.component.css']
})
export class RepositoryStatsComponent implements OnInit {
  @Input() repo: Repository;

  constructor() { }

  ngOnInit() {
  }

}
