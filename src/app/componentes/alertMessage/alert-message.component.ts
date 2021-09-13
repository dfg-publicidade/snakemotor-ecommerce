import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  @Input() result: any;
  constructor() {
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.result = changes.result.currentValue;
  }
}