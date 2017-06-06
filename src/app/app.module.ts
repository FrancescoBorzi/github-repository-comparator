import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ComparatorService } from './comparator.service';
import { ComparisonTableComponent } from './comparison-table/comparison-table.component';
import { RepositoryStatsComponent } from './repository-stats/repository-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    ComparisonTableComponent,
    RepositoryStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule
  ],
  providers: [ComparatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
