import { Component, Input, OnInit } from '@angular/core';
import { ChordGeneratorService } from 'src/app/services/chordgenerator.service';

@Component({
  selector: 'app-chordlist',
  templateUrl: './chordlist.component.html',
  styleUrls: ['./chordlist.component.scss']
})
export class ChordListComponent implements OnInit {
  @Input() strings: string[];
  @Input() chord: string[];

  chords: any[];

  constructor(public chordGenerator: ChordGeneratorService) {
  }

  ngOnInit(): void {
    this.chords = this.chordGenerator.generate(this.chord, this.strings);
  }

}
