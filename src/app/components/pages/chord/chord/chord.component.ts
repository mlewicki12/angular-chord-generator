import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.scss']
})
export class ChordComponent implements OnInit {
  @Input() strings: string[];
  @Input() chord: number[];

  getChord(index: number): string {
    return `${this.chord[index]}`;
  }

  constructor() {
  //  this.strings = ['E', 'B', 'G', 'D', 'A', 'E']; 
  //  this.chord = [0, 1, 0, 2, 3, -1];
  }

  ngOnInit(): void {
  }

}
