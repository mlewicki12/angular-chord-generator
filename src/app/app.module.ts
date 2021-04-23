import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChordComponent } from './components/chord/chord.component';
import { ChordListComponent } from './components/chordlist/chordlist.component';
import { ChordMenuComponent } from './components/chord-menu/chord-menu.component';
import { ScaleComponent } from './components/scale/scale.component';

@NgModule({
  declarations: [
    AppComponent,
    ChordComponent,
    ChordListComponent,
    ChordMenuComponent,
    ScaleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
