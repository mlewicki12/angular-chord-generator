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

  tuning: string[];
  chord: string[];

  tuningArray: string[];
  chordArray: string[];

  private chordMap = [
    {key: 'Major', value: ChordGeneratorService.Scales.Major},
    {key: 'Minor', value: ChordGeneratorService.Scales.Minor}
  ];

  constructor(private chordGenerator: ChordGeneratorService) {
    this.mode = 'menu';
    this.selectMode = 'shape';

    this.tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
    this.chord = ['C', 'E', 'G'];

    this.shapeNote = 'C';
    this.shapeChord = 'Major';
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

  updateChord(chord: string) {
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
    this.tuningArray = this.tuning.filter(item => this.chordGenerator.isNote(item)).reverse();

    if(this.selectMode === 'note') {
      this.chordArray = this.chord
        .reduce((prev, next) => {
          return prev.includes(next) ? prev : prev.concat([next]);
        }, [])
        .filter(item => this.chordGenerator.isNote(item));
    } else {
      this.chordArray = this.chordGenerator.buildChord(
        this.shapeNote,
        [1, 3, 5],
        this.chordMap.find(item => item.key === this.shapeChord).value
      );
    }

    this.mode = 'chords';
  }

  ngOnInit(): void {
  }

}
