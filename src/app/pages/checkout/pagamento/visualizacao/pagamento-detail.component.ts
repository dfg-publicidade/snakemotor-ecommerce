import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { PedidoService } from 'src/app/service/pedido.service';

declare var $: any;
declare var PagSeguroDirectPayment: any // MÉTODO PAGSEGURO

@Component({
  selector: 'app-checkout-pagamento',
  templateUrl: './pagamento-detail.component.html',
  styleUrls: ['./pagamento-detail.component.scss']
})
export class PagamentoDetailComponent implements OnInit {
  carrinho: any
  title: string = 'Finalizar pagamento';
  url: string = '/pagamento';
  formaEntrega: any;
  formCartaoCredito: any;
  tipoCartao: any;
  parcelamento: any;

  loadingService: boolean = false;
  loadingServiceCarrinho: boolean = false;

  response: any;

  form: any;

  metatag: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private metadataService: MetadataService,
    private pedidoService: PedidoService
  ) {
  };


  ngOnInit(): void {
    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

    this.atualizaValorCarrinho();
  }

  atualizaValorCarrinho() {
    this.loadingServiceCarrinho = true;
    this.carrinhoService.atualizaCarrinho()
      .subscribe(
        result => {
          this.carrinho = result.content;

          if (this.carrinho) {
            if (this.carrinho.pagseguro) {
              this.loadScriptPagSeguro(this.carrinho.pagseguro.sdk);
            }

            if (this.carrinho.formaEntrega) {
              this.formaEntrega = this.carrinho.formaEntrega;
            }

            let carrinho = this.carrinhoService.getCarrinho();
            if (carrinho.formaPagamento) {
              this.carrinho.formaPagamento = carrinho.formaPagamento;

              switch (carrinho.formaPagamento.name) {
                case 'BOLETO': {
                  //FORM FORMAS DE PAGAMENTO
                  this.form = this.formBuilder.group({
                    formaPagamento: new FormControl('', [
                      Validators.required
                    ]),
                    hashPagamento: new FormControl('', [
                      Validators.required
                    ])
                  },
                    {
                      updateOn: 'change'
                    }
                  );

                  this.form.controls.formaPagamento.setValue('boleto');
                  break;
                }
                case 'CREDIT_CARD': {
                  //FORM DADOS CARTÃO DE CRÉDITO
                  this.form = this.formBuilder.group({
                    formaPagamento: new FormControl('', [
                      Validators.required
                    ]),
                    hashPagamento: new FormControl('', [
                      Validators.required
                    ]),
                    tipo: new FormControl(null, [
                      Validators.required
                    ]),
                    numeroCartao: new FormControl('', [
                      Validators.required
                    ]),
                    nome: new FormControl('', [
                      Validators.required
                    ]),
                    validade: new FormControl('', [
                      Validators.required
                    ]),
                    cpfCnpj: new FormControl('', [
                      Validators.required
                    ]),
                    dataNascto: new FormControl(''),
                    cvv: new FormControl('', [
                      Validators.required
                    ]),
                    qtdeParcelas: new FormControl(null, [
                      Validators.required
                    ]),
                    creditCardToken: new FormControl('')
                  },
                    {
                      updateOn: 'change'
                    }
                  );
                  this.form.controls.formaPagamento.setValue('creditCard');
                  this.form.controls.qtdeParcelas.disable();

                  this.form.controls.numeroCartao.valueChanges.subscribe(() => {
                    setTimeout(() => {
                      if (this.form.get('numeroCartao').value && this.form.get('numeroCartao').value.replaceAll('.', '').length < 7) {
                        delete this.tipoCartao;
                      }
                      if (this.form.get('numeroCartao').value && this.form.get('numeroCartao').value.replaceAll('.', '').length >= 7 && !this.tipoCartao) {
                        this.verificaTipoCartao();
                      }
                    }, 100);
                  });

                  break;
                }
                case 'ONLINE_DEBIT': {
                  this.form.controls.formaPagamento.setValue('eft');
                  break;
                }
              }

            }
          }

          this.loadingServiceCarrinho = false;
        },
        () => {
          this.loadingServiceCarrinho = false;
        }
      );
  }

  finalizarCompra() {
    delete this.response;
    this.loadingService = true;
    let carrinho = this.carrinhoService.getCarrinho();

    carrinho.pagamento = {
      hash: this.form.value.hashPagamento,
      metodo: this.form.value.formaPagamento
    }

    if (carrinho.formaPagamento && carrinho.formaPagamento.name === 'CREDIT_CARD') {
      let parcelamento = this.parcelamento.installments[this.tipoCartao.brand.name].find((parcela: any) => parcela && parcela.quantity === this.form.value.qtdeParcelas);

      carrinho.pagamento.token = this.form.value.creditCardToken ? this.form.value.creditCardToken : '';
      carrinho.pagamento.parcelas = this.form.value.qtdeParcelas ? this.form.value.qtdeParcelas : '';
      carrinho.pagamento.valorParcelamento = parcelamento ? parcelamento.installmentAmount : '';

      carrinho.pagamento.cartao = {
        tipoDocumento: this.form.value.tipo ? this.form.value.tipo : '',
        nome: this.form.value.nome ? this.form.value.nome : '',
        cpfCnpj: this.form.value.cpfCnpj ? this.form.value.cpfCnpj : '',
        dataNascto: this.form.value.dataNascto ? this.form.value.dataNascto : ''
      }
    }

    this.pedidoService.concluirPedido(carrinho)
      .subscribe(
        result => {
          this.loadingService = false;

          if (result.status === 'success') {
            this.carrinhoService.removerCarrinho();
            this.pedidoService.setPedidoCache(result);

            setTimeout(() => {
              this.router.navigate(['/resumo']);
            }, 100);

          } else {
            this.response = result;
            this.scrollTopCarrinho();
          }
        },
        error => {
          this.loadingService = false;
          this.response = error.error;
          this.scrollTopCarrinho();
        },
        () => {
          this.loadingService = false;
        }
      )
  }

  loadScriptPagSeguro(url: string) {
    let component = this;
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = function () {
      component.setSessionPagSeguro();
      component.onSenderHashReady();
    };

    if (document.querySelectorAll('[src="' + url + '"]').length === 0) {
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      component.setSessionPagSeguro();
      this.onSenderHashReady();
    }
  }

  setSessionPagSeguro() {
    PagSeguroDirectPayment.setSessionId(this.carrinho.pagseguro.sessionId);
  }

  onSenderHashReady() {
    PagSeguroDirectPayment.onSenderHashReady((response: any) => {
      let hash = '';

      if (response.status == 'error') {
        console.log(response.message);
      } else {
        hash = response.senderHash;
      }

      this.form.controls.hashPagamento.setValue(hash);
    });
  }


  verificaTipoCartao() {
    PagSeguroDirectPayment.getBrand({
      cardBin: this.form.value.numeroCartao.replaceAll('.', ''),
      success: (response: any) => {
        this.tipoCartao = response;
        this.scrollTop();

        this.verificaQtdeParcelas();
      },
      error: (response: any) => {
        console.log('erro', response);
      },
      complete: (response: any) => {
        //
      }
    });
  }

  verificaQtdeParcelas() {
    PagSeguroDirectPayment.getInstallments({
      amount: this.carrinho.valorTotalNum,
      maxInstallmentNoInterest: this.carrinho.parcelamento.maximoParcelas,
      brand: this.tipoCartao.brand.name,
      success: (response: any) => {
        this.parcelamento = response;

        this.form.controls.qtdeParcelas.enable();

        this.scrollTop();
      },
      error: (response: any) => {
        console.log('erro', response);
      },
      complete: (response: any) => {
        //
      }
    });
  }

  createCardToken() {
    this.loadingService = true;
    let cartaoCreditoMes = this.form.value.validade.split('/')[0];
    let cartaoCreditoAno = this.form.value.validade.split('/')[1];
    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.form.value.numeroCartao.replaceAll('.', ''),
      brand: this.tipoCartao.brand.name,
      cvv: this.form.value.cvv,
      expirationMonth: cartaoCreditoMes,
      expirationYear: cartaoCreditoAno,
      success: (response: any) => {
        this.form.controls.creditCardToken.setValue(response.card.token);
        this.finalizarCompra();
      },
      error: (response: any) => {
        console.log('erro', response);
      },
      complete: (response: any) => {
        //
      }
    });
  }

  scrollTop() {
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('header').offset().top + 1 }, 300);
    }, 100);
  }

  scrollAlertTop() {
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('div.alert-message').offset().top - 250 }, 300);
    }, 100);
  }

  scrollTopCarrinho() {
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('div.carrinho').offset().top - 200 }, 300);
    }, 100);
  }
}