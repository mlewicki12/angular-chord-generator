import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChordComponent } from './components/pages/chord/chord/chord.component';
import { ChordListComponent } from './components/pages/chord/chordlist/chordlist.component';
import { ChordMenuComponent } from './components/pages/chord/chord-menu/chord-menu.component';
import { ScaleComponent } from './components/pages/scale/scale/scale.component';
import { AppRoutingModule } from './app-routing.module';
import { NoteSelectComponent } from './components/shared/note-select/note-select.component';
import { ScaleSelectComponent } from './components/shared/scale-select/scale-select.component';

@NgModule({
  declarations: [
    AppComponent,
    ChordComponent,
    ChordListComponent,
    ChordMenuComponent,
    ScaleComponent,
    NoteSelectComponent,
    ScaleSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
