import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent {
  @Input() config: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config) {
      this.config = changes.config.currentValue;

      setTimeout(() => {
        $('#' + this.config.id).modal('show');
      }, 100);
    }
  }
}
