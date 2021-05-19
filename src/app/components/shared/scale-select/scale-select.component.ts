import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-scale-select',
  templateUrl: './scale-select.component.html',
  styleUrls: ['./scale-select.component.scss']
})
export class ScaleSelectComponent implements OnInit {
  notes: string[];
  chords: string[];

  @Input() shapeNote: string;
  @Output() shapeNoteChange = new EventEmitter<string>();

  @Input() shapeChord: string;
  @Output() shapeChordChange = new EventEmitter<string>();

  ngOnInit(): void {
  }

  constructor(private chordGenerator: ChordGeneratorService) {
    this.notes = chordGenerator.getAllNotes();
    this.chords = ['Major', 'Minor'];
  }

  updateNote(note: string) {
    this.shapeNote = note;
    this.shapeNoteChange.emit(note);
  }
  
  updateChord(note: string) {
    this.shapeChord = note;
    this.shapeChordChange.emit(note);
  }
}
