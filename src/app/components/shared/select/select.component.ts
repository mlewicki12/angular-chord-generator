import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'chords-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();o

  @Input() options: string[];

  constructor() { }

  ngOnInit(): void {
  }

  update(item: string) {
    this.value = item;
    this.valueChange.emit(item);
  }

}
