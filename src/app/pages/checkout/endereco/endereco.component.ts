import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';

@Component({
  selector: 'app-checkout-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  carrinho: any
  title: string = 'Endereço de entrega';
  urlProduto: string = '/endereco'
  formFrete: any;
  formaEntrega: any;
  enderecos: any;

  loadingServiceCarrinho: boolean = false;
  loadingServiceEndereco: boolean = false;

  private subscription: any;

  metatag: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private metadataService: MetadataService,
    private enderecoService: EnderecoService
  ) {
    this.formFrete = formBuilder.group({
      endereco: new FormControl('', [
        Validators.required
      ]),
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
    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    this.subscription = [];

    let carrinho = this.carrinhoService.getCarrinho();

    if (carrinho) {
      if (carrinho.cep) {
        this.formFrete.controls.cep.setValue(carrinho.cep);
      }
    }

    this.listarEnderecos();
    this.atualizaValorCarrinho();
  }

  atualizaValorCarrinho() {
    this.subscription.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
    this.loadingServiceCarrinho = true;
    let sub = this.carrinhoService.atualizaCarrinho()
      .subscribe(
        result => {
          this.carrinho = result.content;

          this.getFormaEntrega();

          this.loadingServiceCarrinho = false;
        },
        () => {
          this.loadingServiceCarrinho = false;
        }
      );

    this.subscription.push(sub);
  }

  listarEnderecos() {
    this.subscription.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
    this.loadingServiceEndereco = true;
    this.enderecoService.listarTodos()
      .subscribe(
        result => {
          this.enderecos = result.content.items;

          if (this.enderecos && this.enderecos.length === 1) {
            this.formFrete.controls.endereco.setValue(this.enderecos[0].id);
            this.formFrete.controls.cep.setValue(this.enderecos[0].cep);
            this.consultarFrete();
          }

          this.getFormaEntrega();

          this.loadingServiceEndereco = true;
        },
        () => {
          this.loadingServiceEndereco = true;
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
}
