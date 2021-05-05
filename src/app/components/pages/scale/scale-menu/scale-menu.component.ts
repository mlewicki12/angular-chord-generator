import { Component, OnInit } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-scale-menu',
  templateUrl: './scale-menu.component.html',
  styleUrls: ['./scale-menu.component.scss']
})
export class ScaleMenuComponent implements OnInit {
  mode: string;

  shapeNote: string;
  shapeChord: number[];
  chordName: string;

  chords: {key: string, value: number[]}[];
  strings: string[];

  tuning: {note: string}[];

  constructor(private chordGenerator: ChordGeneratorService) {
    this.mode = 'menu';
    this.tuning = [{note: 'E'}, {note: 'A'}, {note: 'D'}, {note: 'G'}, {note: 'B'}, {note: 'E'}];

    this.chords = [
      {key: 'Major', value: ChordGeneratorService.Scales.Major},
      {key: 'Minor', value: ChordGeneratorService.Scales.Minor}
    ];
  }

  updateNote(note: string) {
    this.shapeNote = note;
  }

  updateChord(chord: number[]) {
    this.shapeChord = chord;
    this.chordName = this.chords.find(item => item.value === chord)?.key;
  }

  back() {
    this.mode = 'menu';
  }

  submit() {
    this.strings = this.chordGenerator.buildScaleShapes(this.shapeNote, this.shapeChord, this.tuning.map(item => item.note));
    debugger;

    this.mode = 'chords';
  }

  ngOnInit(): void {
  }

}
