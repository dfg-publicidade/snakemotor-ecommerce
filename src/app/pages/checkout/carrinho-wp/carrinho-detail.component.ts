import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CarrinhoWhatsappService } from 'src/app/service/carrinhoWhatsapp.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';

@Component({
  selector: 'app-carrinho-detail-whatsapp',
  templateUrl: './carrinho-detail.component.html',
  styleUrls: ['./carrinho-detail.component.scss']
})
export class CarrinhoDetailWhatsappComponent implements OnInit {
  carrinho: any
  title: string = 'Meu carrinho (Whatsapp)';
  urlProduto: string = '/produtos'
  formFrete: any;
  formaEntrega: any;
  formasEntrega: any;
  loadingServiceFrete: boolean = false;
  private subscription: any;

  metatag: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoWhatsappService,
    private metadataService: MetadataService
  ) {
    this.formFrete = formBuilder.group({
      cep: new FormControl('', [
        Validators.required
      ]),
      formaEntrega: new FormControl('')
    });
  };


  ngOnInit(): void {
    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    this.subscription = [];

    //remove forma entrega, para selecionar novamente
    let carrinho = this.carrinhoService.getCarrinho();

    if (carrinho) {
      this.carrinhoService.setCarrinho(carrinho);

      if (carrinho.cep) {
        delete carrinho.cep;
      }

      this.atualizaValorCarrinho();
    }else{
      this.carrinho = {};
    }
  }

  atualizaValorCarrinho() {
    this.subscription.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
    this.loadingServiceFrete = true;
    let sub = this.carrinhoService.atualizaCarrinho()
      .subscribe(
        result => {
          this.carrinho = result.content;

          this.carrinho.produtos.forEach((produto: any, index: number) => {
            this.carrinho.produtos[index].imagem = ProdutoUtil.getImagemDestaque(produto);

            if (!this.carrinho.produtos[index].imagem) {
              this.carrinho.produtos[index].imagem = '/res/imagens/sem-imagem.png';
            }
          });

          this.formasEntrega = this.carrinho.formasEntrega;

          this.loadingServiceFrete = false;
        },
        () => {
          this.loadingServiceFrete = false;
        }
      );

    this.subscription.push(sub);
  }

  alterarQtde(acao: string, index: number) {
    if (acao === 'aumentar') {
      if (this.carrinho.produtos[index].qtde < this.carrinho.produtos[index].estoqueAtual) {
        this.carrinho.produtos[index].qtde++
      }
    } else if (acao === 'diminuir') {
      if (this.carrinho.produtos[index].qtde > 1) {
        this.carrinho.produtos[index].qtde--
      }
    }

    this.getCarrinho();
    this.atualizaValorCarrinho();
  }

  consultarFrete() {
    delete this.formasEntrega;
    this.formFrete.controls.formaEntrega.setValue('');
    this.getCarrinho();
    this.atualizaValorCarrinho();
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
      });

      this.carrinhoService.setCarrinho(carrinho);
    }
  }

  removerCarrinho(produto: any) {
    this.carrinhoService.removerItemCarrinho(produto);

    this.carrinho = this.carrinhoService.getCarrinho();

    if (this.carrinho) {
      this.atualizaValorCarrinho();
    } else {
      this.carrinho = {};
    }
  }
}
