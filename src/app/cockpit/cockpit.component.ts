import { Component, Input, OnInit } from '@angular/core';
import { ComparatorService } from "../comparator.service";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Input() repo1: string = "ShinDarth/PvPstats";
  @Input() repo2: string = "Helias/Keira2";

  constructor(private comparatorService: ComparatorService) { }

  ngOnInit() {
  }

  onCompare() {
    this.comparatorService.changeTargets(this.repo1, this.repo2);
  }

}
