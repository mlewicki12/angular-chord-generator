import { Component, OnInit } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-chord-menu',
  templateUrl: './chord-menu.component.html',
  styleUrls: ['./chord-menu.component.scss']
})
export class ChordMenuComponent implements OnInit {
  mode: string;

  tuning: string[];
  chord: string[];

  tempChord: string[];
  tempTuning: string[];

  constructor(public chordGenerator: ChordGeneratorService) {

    this.mode = 'menu';

    this.tuning = ['E', 'B', 'G', 'D', 'A', 'E'];
    this.tempTuning = this.tuning.slice();

    this.chord = ['C', 'E', 'G'];
    this.tempChord = this.chord.slice();
  }

  onTuningChange(event, index) {
    this.tempTuning[index] = event;
  }

  onChordChange(event, index) {
    this.tempChord[index] = event;
  }

  removeString() {
    if(this.tuning.length <= 3) {
      return;
    }

    this.tuning.pop();
    this.tempTuning = this.tuning.slice();
  }

  addString() {
    if(this.tuning.length >= 12) {
      return;
    }

    // get the fifth
    this.tuning.push(
      this.chordGenerator.getNote(this.tuning[this.tuning.length - 1], 7)
    );

    this.tempTuning = this.tuning.slice();
  }

  removeChord() {
    if(this.chord.length <= 2) {
      return;
    }

    this.chord.pop();
    this.tempChord = this.chord.slice();
  }

  addChord() {
    // arbitrary limits fuck yeah
    if(this.chord.length >= 6) {
      return;
    }

    this.chord.push(
      this.chordGenerator.getNote(this.chord[this.chord.length - 1], 7)
    );

    this.tempChord = this.chord.slice();
  }

  update() {
    this.tuning = this.tempTuning.slice();
    this.chord = this.tempChord.slice();
  }

  submit() {
    this.mode = 'chords';
  }

  ngOnInit(): void {
  }

}
