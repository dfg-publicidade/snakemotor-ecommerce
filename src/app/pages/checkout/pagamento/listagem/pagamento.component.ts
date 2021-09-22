import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { MetadataService } from 'src/app/service/metaData.service';

declare var $: any;
declare var PagSeguroDirectPayment: any // MÉTODO PAGSEGURO

@Component({
  selector: 'app-checkout-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
  carrinho: any
  url: string = '/pagamento';
  title: string = 'Pagamento';
  formaEntrega: any;
  formasPagamento: any;
  formaPagamentoSelecionada: any;

  loadingService: boolean = false;
  loadingServiceCarrinho: boolean = false;
  loadingServiceCupom: boolean = false;

  responseFormasPagamento: any;
  responseCupom: any;

  form: any;
  formCupom: any;

  metatag: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private metadataService: MetadataService
  ) {
    //FORM ENDERECO
    this.form = formBuilder.group({
      pagamento: new FormControl('', [
        Validators.required
      ])
    },
      {
        updateOn: 'change'
      }
    );

    //FORM CUPOM
    this.formCupom = formBuilder.group({
      cupom: new FormControl('', [
        Validators.required
      ])
    }
    );

    this.form.controls.pagamento.valueChanges.subscribe(() => {
      setTimeout(() => {
        let pagamento = this.form.get('pagamento').value;
        if (pagamento) {
          this.formaPagamentoSelecionada = this.formasPagamento.find((fPagto: any) => fPagto && fPagto[0] === pagamento);

          let tipoPagamento = pagamento !== 'pix' &&  pagamento !== 'deposito' ? 'pagseguro' : pagamento;

          let carrinho = this.carrinhoService.getCarrinho();
          carrinho.pagamento = {
            metodo: pagamento,
            formaPagamento: tipoPagamento
          };
          carrinho.formaPagamento = this.formaPagamentoSelecionada[1];
          this.carrinhoService.setCarrinho(carrinho);
        }
      }, 100);
    });
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
    if (this.formCupom.value.cupom) {
      delete this.responseCupom;
      this.loadingServiceCupom = true;
    }
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

            if (this.formCupom.value.cupom && this.carrinho.cupom && this.carrinho.cupom.mensagem) {
              this.responseCupom = {
                status: 'warning',
                content: {
                  message: this.carrinho.cupom.mensagem
                }
              }

            }
          }

          this.loadingServiceCarrinho = false;
          this.loadingServiceCupom = false;
        },
        () => {
          this.loadingServiceCarrinho = false;
          this.loadingServiceCupom = false;
        }
      );
  }

  loadScriptPagSeguro(url: string) {
    let component = this;
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = function () {
      component.setSessionPagSeguro();
      component.listarFormasPagamento();
    };

    if (document.querySelectorAll('[src="' + url + '"]').length === 0) {
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      component.listarFormasPagamento();
    }
  }

  setSessionPagSeguro() {
    PagSeguroDirectPayment.setSessionId(this.carrinho.pagseguro.sessionId);
  }

  listarFormasPagamento() {
    console.log('listando formas de pagamento');
    PagSeguroDirectPayment.getPaymentMethods({
      amount: this.carrinho.valorTotalNum,
      success: (response: any) => {
        this.formasPagamento = Object.entries(response.paymentMethods);

        this.formasPagamento.forEach((fPagamento: any, index: number) => {
          this.formasPagamento[index].bancos = Object.entries(fPagamento[1].options);
        });
      },
      error: (response: any) => {
        let error = '';

        $.each(response.errors, function (index: number, value: any) {
          error += `${index}: ${value}<br/>`;
        });

        this.responseFormasPagamento = {
          status: 'error',
          content: {
            message: error
          }
        }

        if (response.errors['59001']) {
          delete this.responseFormasPagamento;
          this.setSessionPagSeguro();
          this.listarFormasPagamento();
        }

      },
      complete: (response: any) => {
        console.log('finalizado listagem de formas de pagamento');
        this.scrollTop();
      }
    });
  }

  consultarCupom() {
    let carrinho = this.carrinhoService.getCarrinho();
    carrinho.cupom = this.formCupom.value.cupom;

    this.carrinhoService.setCarrinho(carrinho);

    this.atualizaValorCarrinho();
  }

  removerCupom() {
    let carrinho = this.carrinhoService.getCarrinho();
    delete this.carrinho.cupom;
    delete carrinho.cupom;

    this.carrinhoService.setCarrinho(carrinho);
    this.atualizaValorCarrinho();
  }

  scrollTop() {
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('header').offset().top + 1 }, 300);
    }, 100);
  }
}