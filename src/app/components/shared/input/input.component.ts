import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'chords-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() options: string[];
  @Output() optionsChange = new EventEmitter<string[]>();

  // wrapper so that ngModel works properly
  optionsObj: {value: string}[];

  constructor() {
  }

  ngOnInit(): void {
    this.optionsObj = this.options.map(item => {
      return {value: item};
    });
  }

  update(item: string, index: number) {
    this.optionsObj[index].value = item;
    this.optionsChange.emit(this.optionsObj.map(item => item.value));
  }
}
