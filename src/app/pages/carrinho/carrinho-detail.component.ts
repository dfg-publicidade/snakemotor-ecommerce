import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';

@Component({
  selector: 'app-carrinho-detail',
  templateUrl: './carrinho-detail.component.html',
  styleUrls: ['./carrinho-detail.component.scss']
})
export class CarrinhoDetailComponent implements OnInit {
  carrinho: any
  urlProduto: string = '/produtos'
  formFrete: any;
  formaEntrega: any;
  loadingServiceFrete: boolean = false;

  constructor(private formBuilder: FormBuilder, private carrinhoService: CarrinhoService) {
    this.formFrete = formBuilder.group({
      cep: new FormControl('', [
        Validators.required
      ]),
      formaEntrega: new FormControl('')
    });

    this.formFrete.controls.formaEntrega.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.selecionarFormaEntrega();
      }, 100);
    });
  };


  ngOnInit(): void {
    let carrinho = this.carrinhoService.getCarrinho();

    if (carrinho) {
      if (carrinho.cep) {
        this.formFrete.controls.cep.setValue(carrinho.cep);
      }
    }

    this.atualizaValorCarrinho();
  }

  atualizaValorCarrinho() {
    this.loadingServiceFrete = true;
    this.carrinhoService.atualizaCarrinho()
      .subscribe(
        result => {
          this.carrinho = result.content;

          this.carrinho.produtos.forEach((produto: any, index: number) => {
            this.carrinho.produtos[index].imagem = ProdutoUtil.getImagemDestaque(produto);

            if (!this.carrinho.produtos[index].imagem) {
              this.carrinho.produtos[index].imagem = '/res/imagens/sem-imagem.png';
            }
          });


          this.getFormaEntrega();

          this.loadingServiceFrete = false;
        },
        () => {
          this.loadingServiceFrete = false;
        }
      );
  }

  consultarFrete() {
    this.formFrete.controls.formaEntrega.setValue('');
    this.getCarrinho();
    this.atualizaValorCarrinho();
  }

  selecionarFormaEntrega() {
    this.getFormaEntrega();
    this.getCarrinho();
    this.atualizaValorCarrinho();
  }

  getFormaEntrega() {
    if (this.carrinho) {
      if (this.carrinho.formasEntrega && this.carrinho.formasEntrega.length > 0) {
        this.formaEntrega = this.carrinho.formasEntrega.find((formaEntrega: any) => formaEntrega && formaEntrega.permalink === this.formFrete.value.formaEntrega);
      } else if (this.carrinho.formaEntrega) {
        this.formaEntrega = this.carrinho.formaEntrega;
      }
    }
  }

  getCarrinho() {
    let carrinho = this.carrinhoService.getCarrinhoVazio();

    if (this.carrinho) {
      this.carrinho.produtos.forEach((produto: any) => {
        carrinho.produtos.push({
          produto: produto.id,
          qtde: produto.qtde
        })
        carrinho.cep = this.formFrete.value.cep ? this.formFrete.value.cep : '';
        carrinho.formaEntrega = this.formFrete.value.formaEntrega ? this.formFrete.value.formaEntrega : '';
      });

      this.carrinhoService.setCarrinho(carrinho);
    }
  }

  removerCarrinho(produto: any) {
    this.carrinhoService.removerItemCarrinho(produto);

    this.carrinho = this.carrinhoService.getCarrinho();

    this.atualizaValorCarrinho();
  }
}
