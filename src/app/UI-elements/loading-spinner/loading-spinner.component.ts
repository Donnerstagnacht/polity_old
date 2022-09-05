import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string | undefined;
  @Output() retryAction = new EventEmitter<boolean>();



  constructor() { }

  ngOnInit(): void {
  }

  startRetryAction(): void {
    this.retryAction.emit(true);
  }

}
