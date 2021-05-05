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
  shapeChord: number[];

  tuning: {note: string}[];
  chord: {note: string}[];

  tuningArray: string[];
  chordArray: string[];

  constructor(private chordGenerator: ChordGeneratorService) {
    this.mode = 'menu';
    this.selectMode = 'shape';

    this.tuning = [{note: 'E'}, {note: 'A'}, {note: 'D'}, {note: 'G'}, {note: 'B'}, {note: 'E'}];
    this.chord = [{note: 'C'}, {note: 'E'}, {note: 'G'}];
  }

  setShapeSelect() {
    this.selectMode = 'shape';
  }

  setNoteSelect() {
    this.selectMode = 'note';
  }

  updateNote(note: string) {
    this.shapeNote = note;
  }

  updateChord(chord: number[]) {
    this.shapeChord = chord;
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
      debugger;
      this.chordArray = this.chordGenerator.buildChord(
        this.shapeNote,
        [1, 3, 5],
        this.shapeChord
      );
    }

    this.mode = 'chords';
  }

  ngOnInit(): void {
  }

}
