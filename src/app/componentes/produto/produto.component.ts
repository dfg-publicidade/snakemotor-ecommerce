import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-produto-componente',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoCComponent implements OnInit {
  @Input() item: any;
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
          this.item.preco = this.getPreco(this.item);
          this.item.imagem = this.getImagemDestaque(this.item);

          if (!this.item.imagem) {
            this.item.imagem = '/res/imagens/sem-imagem.png';
          }
        }, 100);
      }
    }
  }

  getImagemDestaque(item: any): string {
    let imagens = [];

    if (item.imagens) {
      imagens = item.imagens;
    } else {
      if (item.produto && item.produto.imagens) {
        imagens = item.produto.imagens;
      }
    }

    if (imagens && imagens.length > 0) {
      this.timestamp = new Date().getTime();

      let imagemDestaque: any;

      imagens.find((img: any) => {
        if (img.destaque) {
          imagemDestaque = img;
        }
      });

      return imagemDestaque ? `${imagemDestaque.xs.original}?timestamp=${this.timestamp}` : `${imagens[0].xs.original}?timestamp=${this.timestamp}`;
    } else {
      return '';
    }
  }

  getPreco(item: any): any {
    let normal: string = '';
    let desconto: string = '';
    let sobConsulta: boolean = false;

    if (item.produto.precoVenda) {
      normal = item.produto.precoVenda;
    };
    
    if (item.produto.precoPromocional) {
      desconto = item.produto.precoPromocional;
    };
    if (item.produto.precoSobConsulta) {
      normal = '';
      desconto = '';
      sobConsulta = true;
    };
    if (item.precoVenda) {
      normal = item.precoVenda;
    };
    if (item.precoPromocional) {
      desconto = item.precoPromocional;
    };
    
    if (item.precoSobConsulta) {
      normal = '';
      desconto = '';
      sobConsulta = true;
    }

    return {
      normal: normal,
      desconto: desconto,
      sobConsulta: sobConsulta
    };
  }
}
