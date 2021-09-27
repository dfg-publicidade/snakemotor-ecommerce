import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Helpers from 'src/app/helpers';
import { CepService } from 'src/app/service/cep.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { EstadoService } from 'src/app/service/estado.service';
import { MetadataService } from 'src/app/service/metaData.service';

declare var $: any;

@Component({
  selector: 'app-endereco-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class EnderecoDetailComponent implements OnInit {
  url: string = '/perfil/enderecos';
  title: string = 'Meus endereços';

  id: string = '';
  entity: any
  estados: any;
  cidades: any;
  cep: any;

  loadingService: boolean = false;
  loadingServiceExclusao: boolean = false;
  loadingServiceCep: boolean = false;
  loadingServiceEstado: boolean = false;
  loadingServiceCidade: boolean = false;

  metatag: any = {};

  form: any;

  response: any;
  responseExclusao: any;
  subscription: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private cepService: CepService,
    private enderecoService: EnderecoService,
    private metadataService: MetadataService,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
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

    this.form.controls.uf.disable();
    this.form.controls.cidade.disable();

    this.form.controls.cep.valueChanges.subscribe(() => {
      if (this.form.get('cep').value && this.form.get('cep').value.length === 10) {
        this.buscarEnderecoPorCep();
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.visualizar();
      }
    });


    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

  }

  visualizar() {
    this.loadingService = true;

    this.enderecoService.visualizar(this.id)
      .subscribe(
        result => {
          this.loadingService = false;

          this.entity = result.content;

          this.form.patchValue(this.entity);

          this.listarEstados();
          this.listarCidades();

        });
  }

  alterar() {
    delete this.response;
    this.loadingService = true;
    this.enderecoService.alterar(this.id, this.form)
      .subscribe(
        result => {
          this.response = result;
          this.loadingService = false;

          Helpers.scrollPageTop();
        },
        (error) => {
          this.loadingService = false;
          this.response = error.error;

          Helpers.scrollPageTop();
        }
      );
  }

  excluir() {
    delete this.responseExclusao;
    this.loadingServiceExclusao = true;
    this.enderecoService.excluir(this.id)
      .subscribe(
        result => {
          this.responseExclusao = result;
          this.loadingServiceExclusao = false;

          setTimeout(() => {
            $('#exclusaoEndereco').modal('hide');
            
            setTimeout(() => {
              this.router.navigate([this.url]);
            }, 500);

          }, 3500);

        },
        (error) => {
          this.loadingServiceExclusao = false;
          this.responseExclusao = error.error;
        }
      );
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
            this.form.controls.uf.enable();
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
            this.form.controls.uf.setValue(result.content.items[0].id);
            this.form.controls.uf.enable();

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

    if (this.form.controls.uf.value) {
      this.loadingServiceCidade = true;
      this.cidadeService.listarPorEstado(this.form.controls.uf.value, this.form.value.nomeCidade)
        .subscribe(
          result => {
            this.loadingServiceCidade = false;
            this.cidades = result.content.items;

            if (this.cidades && this.cidades.length > 0) {
              this.form.controls.cidade.enable();

              if (this.form.value.nomeCidade) {
                let cidade = this.cidades.find((cidade: any) => cidade.nome === this.form.value.nomeCidade);

                if (!cidade) {
                  cidade = this.cidades.find((cidade: any) => cidade.id === this.entity.cidade.id);
                }

                if (cidade) {
                  this.form.controls.cidade.setValue(cidade.id);
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

  buscarEnderecoPorCep() {
    this.subscription.forEach((subscription: any) => {
      subscription.unsubscribe();
    });

    this.limparEstadoSelecionado();
    this.limparCidadeSelecionada();

    this.loadingServiceCep = true;
    let cep = this.form.controls.cep.value;
    if (cep) {
      cep = cep.replaceAll('.', '');
      cep = cep.replaceAll('-', '');
    }
    let sub = this.cepService.buscarEndereco(cep)
      .subscribe(
        result => {
          this.loadingServiceCep = false;
          this.listarEstadosPorSigla(result.uf);

          this.form.patchValue({
            logradouro: result.logradouro,
            bairro: result.bairro,
            nomeCidade: result.localidade
          });
        },
        () => {
          this.loadingServiceCep = false;
        }
      )

    this.subscription.push(sub);
  }

  limparEstadoSelecionado() {
    this.cidades = [];
    this.form.controls.uf.setValue(null);
    this.form.controls.uf.disable();
  }

  limparCidadeSelecionada() {
    this.cidades = [];
    this.form.controls.cidade.setValue(null);
    this.form.controls.cidade.disable();
  }
}
