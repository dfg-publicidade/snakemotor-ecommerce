import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-produto-componente',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoCComponent implements OnInit {
  @Input() item: any;
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.item = changes.item.currentValue;
    }
  }
}
