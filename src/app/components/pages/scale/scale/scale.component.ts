import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {
  @Input() strings: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
