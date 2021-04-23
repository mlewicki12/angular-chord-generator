import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChordGeneratorService {
  private notes = [
    // encoding flats with a capital B bc that's the only way toUpperCase will work without me writing a workaround for it
    // and im lazy
    ['A'], ['A#', 'BB'], 'B', 'C', ['C#', 'DB'], 'D', ['D#', 'EB'], 'E', 'F', ['F#', 'GB'], 'G', ['G#', 'AB']
  ];

  static Scales = {
    Major: [2, 2, 1, 2, 2, 2],
    Minor: [2, 1, 2, 2, 1, 2]
  }

  getAllNotes() {
    return this.notes.map(item => item[0]);
  }

  findNote(note: string, string?: string[]) {
    const notes = string ?? this.notes;
    const ret = notes.findIndex(item => item.includes(note.toUpperCase()));

    // wrong note
    if(ret === -1) {
      throw `invalid note provided, couldn't find ${note}`;
    }

    return ret;
  }

  isNote(note: string) {
    return this.notes.find(item => item.includes(note.toUpperCase())) !== undefined;
  }

  buildString(note: string) {
    const ret = [];
    const firstNoteIndex = this.findNote(note);

    for(let i = 0; i < 12; ++i) {
      let index = (firstNoteIndex + i) % 12;
      ret.push(this.notes[index][0]);      
    }

    return ret;
  }

  buildFromIntervals(note: string, intervals: number[]) {
    const ret = [];

    let index = this.findNote(note);
    ret.push(this.notes[index][0]);

    intervals.forEach(interval => {
      index += interval;
      index %= 12;

      ret.push(this.notes[index][0]);
    });

    return ret;
  }

  buildScaleShapes(note: string, scale: number[], tuning: string[]) {
    const notes = this.buildFromIntervals(note, scale);

    const fretArray = ['  '];
    for(let i = 0; i < 12; ++i) {
      let add = `${i}`;
      fretArray.push(` ${add}${add.length === 1 ? ' ' : ''} `);
    }


    const ret = tuning
      .map(item => this.buildString(item)
        .map(fret => notes.find(note => note === fret) ? fret : '-')
        .map(fret => `-${fret}${fret.length === 1 ? '-' : ''}-`))
      .map((item, index) => {
        item.unshift(`${tuning[index]}${tuning[index].length === 1 ? ' ' : ''}`);
        return item;
      })
      .map(item => item.join('|'))
      .concat([fretArray.join(' ')]);

    return ret;
  }

  getInterval(note1: string, note2: string) {
    const ret = 0;
    const firstNoteIndex = this.findNote(note1);

    for(let i = 0; i < 12; ++i) {
      let index = (firstNoteIndex + i) % 12;

      // we found them
      if(this.notes[index].includes(note2)) {
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

  getNote(string: string, interval: number) {
    if(interval === -1) {
      return 'X';
    }

    return this.buildString(string)[interval];
  }

  // this is not really needed, but will make it easier down the line to define chords
  buildChord(string: string, intervals: number[], scaleDef: number[]) {
    const scale = this.buildFromIntervals(string, scaleDef);
    const ret = [];

    intervals.forEach(interval => {
      if(interval >= scale.length) {
        throw `invalid interval ${interval}`;
      }

      ret.push(scale[interval - 1]);
    });

    return ret;
  }

  private isEqual(obj1: any[], obj2: any[]) {
    if(obj1.length !== obj2.length) {
      return false;
    }

    for(let i = 0; i < obj1.length; ++i) {
      if(obj1[i] != obj2[i]) {
        return false;
      }
    }

    return true;
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
      // make sure the length is acceptable(tm)
      .filter(item => this.getChordLength(item) < 5)
      // make sure each chord has all the required notes
      .filter(item => {
        let generatedChord = item
          // change each fret to a note
          .map((note, index) => this.getNote(strings[index], note))
          // make sure there's no mutes
          .filter(note => note !== 'X')
          // make sure there's no doubles
          .reduce((prev, next) => {
            return prev.includes(next) ? prev : prev.concat([next]);
          }, []).sort();
        
        return this.isEqual(generatedChord, chord.sort());
      });

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
