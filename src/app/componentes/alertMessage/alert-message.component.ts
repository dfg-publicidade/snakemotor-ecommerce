import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {
  @Input() config: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config) {
      this.config = changes.config.currentValue;

      if (this.config.status !== 'error') {
        this.config.css = 'alert-' + this.config.status;
      } else {
        this.config.css = 'alert-danger';
      }

      setTimeout(() => {
        let component = this;
        $('#' + this.config.id).show();

        $("[data-hide]").on("click", function () {
          $('#' + component.config.id).hide();
        });
      }, 100);

      setTimeout(() => {
        $('#' + this.config.id).hide();
      }, 5000);
    }
  }
}
