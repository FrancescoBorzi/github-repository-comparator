import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ComparatorService } from './comparator.service';
import { ComparisonTableComponent } from './comparison-table/comparison-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    ComparisonTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ComparatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
