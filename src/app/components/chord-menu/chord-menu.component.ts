import { Component, OnInit } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-chord-menu',
  templateUrl: './chord-menu.component.html',
  styleUrls: ['./chord-menu.component.scss']
})
export class ChordMenuComponent implements OnInit {
  mode: string;
  selectMode: string;

  shapeNote: string;
  shapeChord: string;

  notes: string[];
  chords: any[];

  tuning: {note: string}[];
  chord: {note: string}[];

  tuningArray: string[];
  chordArray: string[];

  constructor(private chordGenerator: ChordGeneratorService) {
    this.mode = 'menu';
    this.selectMode = 'shape';

    this.notes = chordGenerator.getAllNotes();
    this.chords = [
      {key: 'Major', value: ChordGeneratorService.Scales.Major},
      {key: 'Minor', value: ChordGeneratorService.Scales.Minor}
    ];

    this.shapeNote = 'C';
    this.shapeChord = 'Major';

    this.tuning = [{note: 'E'}, {note: 'A'}, {note: 'D'}, {note: 'G'}, {note: 'B'}, {note: 'E'}];
    this.chord = [{note: 'C'}, {note: 'E'}, {note: 'G'}];
  }

  removeString() {
    if(this.tuning.length <= 3) {
      return;
    }

    this.tuning.pop();

    if(this.chord.length > this.tuning.length) {
      this.chord.pop();
    }
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
    if(this.chord.length >= 6 || this.chord.length >= this.tuning.length) {
      return;
    }

    this.chord.push({
      note: this.chordGenerator.getNote(this.chord[this.chord.length - 1].note, 7)
    });
  }

  setShapeSelect() {
    this.selectMode = 'shape';
  }

  setNoteSelect() {
    this.selectMode = 'note';
  }

  update(event, i, array) {
    // if the string isn't empty or a valid note, stop the modify
    if(event.target.value !== '' && !this.chordGenerator.isNote(event.target.value)) {
      event.target.value = array[i].note;
    } else {
      array[i].note = event.target.value;
    }
  }

  back() {
    this.mode = 'menu';
  }

  submit() {
    // filter out non-note strings just in case
    this.tuningArray = this.tuning.map(item => item.note).filter(item => this.chordGenerator.isNote(item)).reverse();

    if(this.selectMode === 'note') {
      this.chordArray = this.chord
        .map(item => item.note)
        .reduce((prev, next) => {
          return prev.includes(next) ? prev : prev.concat([next]);
        }, [])
        .filter(item => this.chordGenerator.isNote(item));
    } else {
      this.chordArray = this.chordGenerator.buildChord(
        this.shapeNote,
        [1, 3, 5],
        this.chords.find(chord => chord.key === this.shapeChord).value
      );
    }

    this.mode = 'chords';
  }

  ngOnInit(): void {
  }

}
