import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-note-select',
  templateUrl: './note-select.component.html',
  styleUrls: ['./note-select.component.scss']
})
export class NoteSelectComponent implements OnInit {
  @Input() notes: {note: string}[];
  @Output() notesChange = new EventEmitter<{note: string}[]>();

  constructor(private chordGenerator: ChordGeneratorService) { }

  ngOnInit(): void {
  }

  removeNote() {
    if(this.notes.length <= 3) {
      return;
    }

    this.notes.pop();
    this.notesChange.emit(this.notes);
  }

  addNote() {
    if(this.notes.length >= 12) {
      return;
    }

    // get the fifth
    this.notes.push({
      note: this.chordGenerator.getNote(this.notes[this.notes.length - 1].note, 7)
    });

    this.notesChange.emit(this.notes);
  }

}
