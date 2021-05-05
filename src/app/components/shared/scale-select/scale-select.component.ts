import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-scale-select',
  templateUrl: './scale-select.component.html',
  styleUrls: ['./scale-select.component.scss']
})
export class ScaleSelectComponent implements OnInit {
  notes: string[];
  chords: {key: string, value: number[]}[];

  shapeNote: string;
  @Output() shapeNoteChange = new EventEmitter<string>();

  shapeChord: string;
  @Output() shapeChordChange = new EventEmitter<number[]>();

  constructor(private chordGenerator: ChordGeneratorService) {
    this.notes = chordGenerator.getAllNotes();
    this.chords = [
      {key: 'Major', value: ChordGeneratorService.Scales.Major},
      {key: 'Minor', value: ChordGeneratorService.Scales.Minor}
    ];

    this.shapeNote = 'C';
    this.shapeChord = 'Major';
  }

  updateNote(note: string) {
    this.shapeNote = note;
    this.shapeNoteChange.emit(note);
  }

  updateChord(chord: string) {
    this.shapeChord = chord;
    this.shapeChordChange.emit(this.chords.find(item => item.key === chord).value);
  }

  ngOnInit(): void {
    this.shapeNoteChange.emit(this.shapeNote);
    this.shapeChordChange.emit(this.chords.find(item => item.key === this.shapeChord).value);
  }

}
