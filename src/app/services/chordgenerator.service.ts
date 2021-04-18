import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChordGeneratorService {
  private notes = [
    'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'
  ];

  findNote(note: string, string?: string[]) {
    const notes = string ?? this.notes;
    const ret = notes.findIndex(item => item === note);

    // wrong note
    if(ret === -1) {
      throw `invalid note provided, couldn't find ${note}`;
    }

    return ret;
  }

  buildString(note: string) {
    const ret = [];
    const firstNoteIndex = this.findNote(note);

    for(let i = 0; i < 12; ++i) {
      let index = (firstNoteIndex + i) % 12;
      ret.push(this.notes[index]);      
    }

    return ret;
  }

  getInterval(note1: string, note2: string) {
    const ret = 0;
    const firstNoteIndex = this.findNote(note1);

    for(let i = 0; i < 12; ++i) {
      let index = (firstNoteIndex + i) % 12;

      // we found them
      if(this.notes[index] === note2) {
        return i;
      }
    }

    // we didn't find them :(
    throw `invalid note provided, couldn't find ${note2}`;
  }

  // clears a string except for the searched notes
  flushString(note: string, chord: string[]) {
    const string = this.buildString(note);

    return string.map((stringNote) => {
      if(chord.includes(stringNote)) {
        return this.getInterval(note, stringNote);
      }

      return undefined;
    }).filter(item => item !== undefined);
  }

  getChordLength(chord: number[]) {
    let min = 50, max = -1;

    chord
      // remove 0 from the calculation, because it's open and doesn't need to be fretted
      .filter(item => item !== 0)
      .forEach(note => {
        if(note < min) {
          min = note;
        }

        if(note > max) {
          max = note;
        }
      }
    );

    return max - min;
  }

  generate(chord: string[], strings: string[]) {
    const chordNotes = strings.map(note => this.flushString(note, chord).concat([-1]));
    const chords = this.generateRec(chordNotes, [])
      // idk why this is - 2, but that seems to work, sooo ¯\_(ツ)_/¯
      .map(item => item.flat(strings.length - 2))
      // combine the original string arrays
      .reduce((prev, next) => {
        return prev.concat(next);
      }, [])
      .filter(item => this.getChordLength(item) > 5);

    return chords;
  }

  private generateRec(strings: number[][], chords: any[]) {
    // exit condition
    if(strings.length <= 0) {
      return chords;
    }

    let ret = [];
    for(let i = 0; i < strings[0].length; ++i) {
      ret.push(this.generateRec(strings.slice(1), chords.concat([strings[0][i]])));
    }

    return ret;
  }

  constructor() { }
}
