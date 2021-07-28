import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/service/carrinho.service';
declare var $: any;

@Component({
  selector: 'app-modal-carrinho',
  templateUrl: './modal-carrinho.component.html',
  styleUrls: ['./modal-carrinho.component.scss']
})
export class ModalCarrinhoComponent implements OnInit {
  @Input() modalCarrinhoOpen: any;
  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {

  }

  getCarrinho() {
    let carrinho = this.carrinhoService.getCarrinho();

    if (!carrinho || (carrinho && carrinho.length === 0)) {
      $('.modal').modal('hide');
    }

    return carrinho;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modalCarrinhoOpen) {
      this.modalCarrinhoOpen = changes.modalCarrinhoOpen.currentValue;
      if (this.modalCarrinhoOpen) {
        setTimeout(() => {
          $('#modalCarrinho').modal('show');
        }, 100);

      } else {
        setTimeout(() => {
          $('#modalCarrinho').modal('hide');
        }, 100);

      }
    }
  }
}
