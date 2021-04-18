import { Component, OnInit } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-chord-menu',
  templateUrl: './chord-menu.component.html',
  styleUrls: ['./chord-menu.component.scss']
})
export class ChordMenuComponent implements OnInit {
  mode: string;

  tuning: {note: string}[];
  chord: {note: string}[];

  tuningArray: string[];
  chordArray: string[];

  constructor(public chordGenerator: ChordGeneratorService) {

    this.mode = 'menu';

    this.tuning = [{note: 'E'}, {note: 'B'}, {note: 'G'}, {note: 'D'}, {note: 'A'}, {note: 'E'}];

    this.chord = [{note: 'C'}, {note: 'E'}, {note: 'G'}];
  }

  removeString() {
    if(this.tuning.length <= 3) {
      return;
    }

    this.tuning.pop();
  }

  addString() {
    if(this.tuning.length >= 12) {
      return;
    }

    // get the fifth
    this.tuning.push({
      note: this.chordGenerator.getNote(this.tuning[this.tuning.length - 1].note, 7)
    });
  }

  removeChord() {
    if(this.chord.length <= 2) {
      return;
    }

    this.chord.pop();
  }

  addChord() {
    // arbitrary limits fuck yeah
    if(this.chord.length >= 6) {
      return;
    }

    this.chord.push({
      note: this.chordGenerator.getNote(this.chord[this.chord.length - 1].note, 7)
    });
  }

  submit() {
    this.tuningArray = this.tuning.map(item => item.note);
    this.chordArray = this.chord.map(item => item.note);

    this.mode = 'chords';
  }

  ngOnInit(): void {
  }

}
