import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export type ChipElement = {
      choosen: boolean,
      label: string
}

@Component({
  selector: 'app-chips-picker-generic',
  templateUrl: './chips-picker-generic.component.html',
  styleUrls: ['./chips-picker-generic.component.scss']
})
export class ChipsPickerGenericComponent implements OnInit {
  @Input() chips: ChipElement[] = [];
  @Input() multipleChoicesPossible: boolean = false;
  @Output() newLabel = new EventEmitter<string>();
  @Output() newLabelList = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  activate(label: string): void {
    this.chips.forEach(chip => {
      if (chip.label === label) {
        chip.choosen = !chip.choosen;
        this.newLabel.emit(label);
      } else {
          chip.choosen = false;
      }
    });
  }

  publishNewLabels(label: string): void {
    let selectedLabels: string[] = [];
    this.chips.forEach(chip => {
      if (chip.label === label) {
        chip.choosen = !chip.choosen;
      }
      if (chip.choosen === true) {
        selectedLabels.push(chip.label);
      }
    })
    this.newLabelList.emit(selectedLabels);
  }

}
