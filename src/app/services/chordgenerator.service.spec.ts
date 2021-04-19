import { flush, TestBed } from '@angular/core/testing';

import { ChordGeneratorService } from './chordgenerator.service';

describe('ChordGeneratorService', () => {
  let service: ChordGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChordGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findNote gets index of specified note from default array', () => {
    const note = service.findNote('E');
    expect(note).toBe(7);
  });

  it('findNote works with given string', () => {
    const note = service.findNote('G', ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']);
    expect(note).toBe(3);
  })

  it('isNote says A is a note', () => {
    const note = service.isNote('A');
    expect(note).toBe(true);
  });

  it('isNote works with flats', () => {
    const note = service.isNote('Ab');
    expect(note).toBe(true);
  })

  it('buildString should build string', () => {
    const sampleString = service.buildString('E');
    expect(sampleString).toEqual(['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']);
  });

  it('flushString builds string as expected', () => {
    const flushedString = service.flushString('E', ['C', 'E', 'G']);
    expect(flushedString).toEqual([0, 3, 8]);
  });

  it('getChordLength gets the stretch distance for a chord', () => {
    const chordLength = service.getChordLength([0, 1, 8]);
    expect(chordLength).toEqual(7);
  })

  it('generate produces a list of chords', () => {
    const chords = service.generate(['C', 'E', 'G'], ['E', 'B', 'G', 'D']);
    expect(chords).toEqual([
      [ 0, 1, 0, 2 ], [ 0, 1, 0, 5 ], [ 0, 1, 0, -1 ], [ 0, 1, 5, 5 ], [ 0, 5, 5, 5 ], [ 0, 8, 0, 10 ], [ 0, 8, 5, 5 ], [ 0, 8, 9, 10 ],
      [ 3, 1, 0, 2 ], [ 3, 1, 5, 2 ], [ 3, 1, -1, 2 ], [ 3, 5, 5, 2 ], [ 3, 5, 5, 5 ],
      [ 8, 5, 0, 5 ], [ 8, 5, 5, 5 ], [ 8, 5, 9, 5 ], [ 8, 8, 9, 5 ], [ 8, 8, 9, 10 ],
      [ -1, 1, 0, 2 ]
    ]);
  });

  it('getInterval finds correct interval', () => {
    const interval = service.getInterval('G', 'C');
    expect(interval).toBe(5);
  });
});
