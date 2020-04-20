import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdatesComponent } from './updates/updates.component';
import { FactsComponent } from './facts/facts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridComponent } from './grid/grid.component';
import {MaterialModule} from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { QuestionanswersComponent } from './questionanswers/questionanswers.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdatesComponent,
    FactsComponent,
    GridComponent,
    QuestionanswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
