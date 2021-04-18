import { Component, OnInit } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-chordlist',
  templateUrl: './chordlist.component.html',
  styleUrls: ['./chordlist.component.scss']
})
export class ChordListComponent implements OnInit {
  strings: string[];
  chords: any[];

  constructor(chordGenerator: ChordGeneratorService) {
    this.strings = ['E', 'B', 'G', 'D', 'A', 'E'];
    this.chords = chordGenerator.generate(['C', 'E', 'G'], this.strings);
  }

  ngOnInit(): void {
  }

}
