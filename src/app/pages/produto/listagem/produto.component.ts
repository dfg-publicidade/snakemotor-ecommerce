import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

declare var $: any;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    hideLimitLabels: true
  };

  constructor() {

  }

  ngOnInit(): void {
  }

  getValue() {
    console.log('min: ', this.minValue);
    console.log('max: ', this.maxValue);
  }
}
