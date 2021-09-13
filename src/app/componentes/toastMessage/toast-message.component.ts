import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Helpers from 'src/app/helpers';
declare var $: any;

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit {
  @Input() message: any;
  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.message = changes.message.currentValue;

    setTimeout(() => {
      Helpers.toastMessage();
    }, 100);
  }
}