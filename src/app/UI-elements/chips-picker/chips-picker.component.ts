import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chips-picker',
  templateUrl: './chips-picker.component.html',
  styleUrls: ['./chips-picker.component.scss']
})
export class ChipsPickerComponent implements OnInit {
  @Input() multipeOptionsPossible: boolean = false;
  @Output() choosenOption: EventEmitter<string> = new EventEmitter<string>();
  localFilterOn: boolean = false;
  regionalFilterOn: boolean = false;
  federalFilterOn: boolean = false;

  singleOption: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setLocalFilter(): void {
    if(this.multipeOptionsPossible) {
      this.localFilterOn = !this.localFilterOn;
    } else {
      this.localFilterOn = true;
      this.regionalFilterOn = false;
      this.federalFilterOn = false;
      this.choosenOption.emit('local')
    }
  }

  setRegionalFilter(): void {
    if(this.multipeOptionsPossible) {
      this.regionalFilterOn = !this.regionalFilterOn;

    } else {
      this.localFilterOn = false;
      this.regionalFilterOn = true;
      this.federalFilterOn = false;
      this.choosenOption.emit('regional');
    }
  }

  setFederalFilter(): void {
    if(this.multipeOptionsPossible) {
      this.federalFilterOn = !this.federalFilterOn;
    } else {
      this.localFilterOn = false;
      this.regionalFilterOn = false;
      this.federalFilterOn = true;
      this.choosenOption.emit('federal');
    }
  }



}
