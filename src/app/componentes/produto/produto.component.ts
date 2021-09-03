import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProdutoUtil } from 'src/app/util/produtoUtil';
declare var $: any;

@Component({
  selector: 'app-produto-componente',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoCComponent implements OnInit {
  @Input() item: any;
  url: string = '/produtos';
  timestamp: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      this.item = changes.item.currentValue;
      if (this.item && this.item.id) {
        setTimeout(() => {
          this.item.imagem = ProdutoUtil.getImagemDestaque(this.item);

          if (!this.item.imagem) {
            this.item.imagem = '/res/imagens/sem-imagem.png';
          }
        }, 100);
      }
    }
  }
}
