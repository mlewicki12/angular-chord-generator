import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChordComponent } from './components/chord/chord.component';
import { ChordListComponent } from './components/chordlist/chordlist.component';

@NgModule({
  declarations: [
    AppComponent,
    ChordComponent,
    ChordListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
