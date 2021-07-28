import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() loading: boolean = false;
  @Input() tipoLoading: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      this.loading = changes.loading.currentValue;
    }
  }
}
