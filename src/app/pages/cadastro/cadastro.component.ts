import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CepService } from 'src/app/service/cep.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { EstadoService } from 'src/app/service/estado.service';
declare var $: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  form: any;
  estados: any;
  cidades: any;
  cep: any;

  loadingServiceCep: boolean = false;
  loadingServiceEstado: boolean = false;
  loadingServiceCidade: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private cepService: CepService
  ) {
    this.form = formBuilder.group({
      //DADOS PESSOAIS
      nome: new FormControl('', [
        Validators.required
      ]),
      tipo: new FormControl(null, [
        Validators.required
      ]),
      cpfCnpj: new FormControl('', [
        Validators.required
      ]),
      dataNascto: new FormControl('', [
        Validators.required
      ]),
      celular: new FormControl('', [
        Validators.required,
        Validators.minLength(15)
      ]),
      telefone: new FormControl(''),
      senha: new FormControl('', [
        Validators.required
      ]),
      confirmacaoSenha: new FormControl('', [
        Validators.required,
      ]),
      aceiteOferta: new FormControl('', [
        Validators.required
      ]),
      aceiteContato: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      //ENDERECO
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
      nomeCidade: new FormControl('') //campo para guardar a referencia na busca por cep
    },
      {
        updateOn: 'change'
      }
    );

    this.form.controls.uf.disable();
    this.form.controls.cidade.disable();

    this.form.controls.tipo.valueChanges.subscribe(() => {
      this.form.controls['cpfCnpj'].setValue('');
    });

    this.form.controls.confirmacaoSenha.valueChanges.subscribe(() => {
      let senha = this.form.get('senha').value;
      let confirmacaoSenha = this.form.get('confirmacaoSenha').value;

      if (senha === confirmacaoSenha) {
        this.form.controls['confirmacaoSenha'].setErrors(null);
      } else {
        this.form.controls['confirmacaoSenha'].setErrors({ mismatch: true });
      }
    });

    this.form.controls.cep.valueChanges.subscribe(() => {
      if (this.form.get('cep').value && this.form.get('cep').value.length === 10) {
        this.buscarEnderecoPorCep();
      }
    });
  };

  ngOnInit(): void {
    this.listarEstados();
  }

  cadastrar() {

  }

  buscarEnderecoPorCep() {
    this.limparEstadoSelecionado();
    this.limparCidadeSelecionada();

    this.loadingServiceCep = true;
    let cep = this.form.controls.cep.value;
    if (cep) {
      cep = cep.replaceAll('.', '');
      cep = cep.replaceAll('-', '');
    }
    this.cepService.buscarEndereco(cep)
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

  trocarEtapa(etapa: string) {
    $('#endereco').collapse('toggle');
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
