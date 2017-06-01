import { Component, Input, OnInit } from '@angular/core';
import { ComparatorService } from "../comparator.service";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Input() repo1: string;
  @Input() repo2: string;

  constructor(private cs: ComparatorService) { }

  ngOnInit() {
  }

  onCompare() {
    this.cs.changeTargets(this.repo1, this.repo2);
  }

}
