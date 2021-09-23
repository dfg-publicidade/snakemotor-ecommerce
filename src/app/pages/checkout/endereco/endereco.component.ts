import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CepService } from 'src/app/service/cep.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { EstadoService } from 'src/app/service/estado.service';
import { MetadataService } from 'src/app/service/metaData.service';

declare var $: any;

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
  formEnderecoCreate: any;
  formaEntrega: any;
  enderecos: any;
  responseEnderecoCreate: any;

  estados: any;
  cidades: any;
  cep: any;

  loadingServiceCarrinho: boolean = false;
  loadingServiceEndereco: boolean = false;
  loadingServiceCep: boolean = false;
  loadingServiceEstado: boolean = false;
  loadingServiceCidade: boolean = false;
  loadingServiceEnderecoCreate: boolean = false;

  private subscription: any;

  metatag: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private metadataService: MetadataService,
    private enderecoService: EnderecoService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private cepService: CepService,
  ) {

    //FORM ENDERECO
    this.formEnderecoCreate = formBuilder.group({
      logradouro: new FormControl('', [
        Validators.required,
      ]),
      numero: new FormControl('', [
        Validators.required,
      ]),
      cep: new FormControl('', [
        Validators.required,
      ]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [
        Validators.required,
      ]),
      uf: new FormControl(null, [
        Validators.required,
      ]),
      cidade: new FormControl(null, [
        Validators.required,
      ]),
      principal: new FormControl(''),
      nomeCidade: new FormControl('') //campo para guardar a referencia na busca por cep
    },
      {
        updateOn: 'change'
      }
    );

    this.formEnderecoCreate.controls.uf.disable();
    this.formEnderecoCreate.controls.cidade.disable();

    //VERIFICA CAMPO CEP PARA BUSCAR O ENDEREÇO, NO CADASTRO DE NOVO ENDEREÇO;
    this.formEnderecoCreate.controls.cep.valueChanges.subscribe(() => {
      if (this.formEnderecoCreate.get('cep').value && this.formEnderecoCreate.get('cep').value.length === 10) {
        this.buscarEnderecoPorCep();
      }
    });


    //FORM SELECAO FRETE
    this.formFrete = formBuilder.group({
      endereco: new FormControl('', [
        Validators.required
      ]),
      cep: new FormControl('', [
        Validators.required
      ]),
      formaEntrega: new FormControl('', [
        Validators.required
      ])
    });

    //VERIFICA CAMPO ENDEREÇO, PARA BUSCAR AS FORMAS DE ENTREGA
    this.formFrete.controls.endereco.valueChanges.subscribe(() => {
      if (this.carrinho && this.carrinho.formasEntrega) {
        delete this.carrinho.formasEntrega;
      }
      setTimeout(() => {
        let endereco = this.enderecos.find((end: any) => end && end.id === this.formFrete.value.endereco);

        if (endereco) {
          let cep = endereco.cep;

          if (cep) {
            this.formFrete.controls.cep.setValue(endereco.cep);
            this.consultarFrete();
          }

        }
      }, 100);
    });

    //SELEÇÃO DE FORMA DE ENTREGA
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

    //remove forma entrega, para selecionar novamente
    let carrinho = this.carrinhoService.getCarrinho();
    delete carrinho.formaEntrega;
    this.carrinhoService.setCarrinho(carrinho);

    this.listarEnderecos();
    this.atualizaValorCarrinho();
    this.listarEstados();
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
      });

      carrinho.cep = this.formFrete.value.cep ? this.formFrete.value.cep : '';
      carrinho.formaEntrega = this.formFrete.value.formaEntrega ? this.formFrete.value.formaEntrega : '';
      let endereco = this.enderecos.find((end: any) => end && end.id === this.formFrete.value.endereco);
      carrinho.endereco = endereco.id;

      this.carrinhoService.setCarrinho(carrinho);
    }
  }

  inserirEndereco() {
    delete this.responseEnderecoCreate;
    this.loadingServiceEnderecoCreate = true;
    this.enderecoService.inserir(this.formEnderecoCreate)
      .subscribe(
        result => {
          this.responseEnderecoCreate = result;
          this.loadingServiceEnderecoCreate = false;

          if (this.responseEnderecoCreate.status === 'success') {
            this.listarEnderecos();

            this.formEnderecoCreate.reset();
            setTimeout(() => {
              delete this.responseEnderecoCreate;
              $('#modalEnderecoCheckout').modal('hide');
            }, 5000);
          }

          this.scrollModalTop();
        },
        (error) => {
          this.loadingServiceEnderecoCreate = false;
          this.responseEnderecoCreate = error.error;
        }
      );
  }

  buscarEnderecoPorCep() {
    this.limparEstadoSelecionado();
    this.limparCidadeSelecionada();

    this.loadingServiceCep = true;
    let cep = this.formEnderecoCreate.controls.cep.value;
    if (cep) {
      cep = cep.replaceAll('.', '');
      cep = cep.replaceAll('-', '');
    }
    this.cepService.buscarEndereco(cep)
      .subscribe(
        result => {
          this.loadingServiceCep = false;
          this.listarEstadosPorSigla(result.uf);

          this.formEnderecoCreate.patchValue({
            logradouro: result.logradouro,
            bairro: result.bairro,
            nomeCidade: result.localidade
          });
        },
        () => {
          this.loadingServiceCep = false;
        }
      )
  }

  alterarFrete() {
    delete this.carrinho.formasEntrega;
    delete this.carrinho.formaEntrega;

    this.consultarFrete();
  }

  listarEstados() {
    this.limparCidadeSelecionada();

    this.loadingServiceEstado = true;
    this.estadoService.listarPorNomePais('Brasil')
      .subscribe(
        result => {
          this.loadingServiceEstado = false;
          this.estados = result.content.items;

          if (this.estados && this.estados.length > 0) {
            this.formEnderecoCreate.controls.uf.enable();
          }
        },
        () => {
          this.loadingServiceEstado = false;
        }
      )
  }

  listarEstadosPorSigla(ufSigla: string) {
    this.loadingServiceEstado = true;

    this.limparCidadeSelecionada();

    this.estadoService.buscarPorSigla(ufSigla)
      .subscribe(
        result => {
          this.loadingServiceEstado = false;
          if (result.content.items && result.content.items[0]) {
            this.formEnderecoCreate.controls.uf.setValue(result.content.items[0].id);
            this.formEnderecoCreate.controls.uf.enable();

            this.listarCidades();
          }
        },
        () => {
          this.loadingServiceEstado = false;
        }
      )
  }

  listarCidades() {
    this.limparCidadeSelecionada();

    if (this.formEnderecoCreate.controls.uf.value) {
      this.loadingServiceCidade = true;
      this.cidadeService.listarPorEstado(this.formEnderecoCreate.controls.uf.value, this.formEnderecoCreate.value.nomeCidade)
        .subscribe(
          result => {
            this.loadingServiceCidade = false;
            this.cidades = result.content.items;

            if (this.cidades && this.cidades.length > 0) {
              this.formEnderecoCreate.controls.cidade.enable();

              if (this.formEnderecoCreate.value.nomeCidade) {
                let cidade = this.cidades.find((cidade: any) => cidade.nome === this.formEnderecoCreate.value.nomeCidade);

                if (cidade) {
                  this.formEnderecoCreate.controls.cidade.setValue(cidade.id);
                }
              }
            }
          },
          () => {
            this.loadingServiceCidade = false;
          }
        )
    }
  }

  limparEstadoSelecionado() {
    this.cidades = [];
    this.formEnderecoCreate.controls.uf.setValue(null);
    this.formEnderecoCreate.controls.uf.disable();
  }

  limparCidadeSelecionada() {
    this.cidades = [];
    this.formEnderecoCreate.controls.cidade.setValue(null);
    this.formEnderecoCreate.controls.cidade.disable();
  }

  scrollModalTop() {
    setTimeout(() => {
      $('div.modal-body').animate({ scrollTop: $('.alert-message').offset().top - 300 }, 300);
    }, 100);
  }
}