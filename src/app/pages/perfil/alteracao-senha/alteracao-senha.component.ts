import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Helpers from 'src/app/helpers';
import { MetadataService } from 'src/app/service/metaData.service';
import { PerfilService } from 'src/app/service/perfil.service';

@Component({
  selector: 'app-alteracao-senha',
  templateUrl: './alteracao-senha.component.html',
  styleUrls: ['./alteracao-senha.component.scss']
})
export class AlteracaoSenhaComponent implements OnInit {
  url: string = '/perfil/senha';
  title: string = 'Alteração de senha';

  loadingService: boolean = false;

  metatag: any = {};

  form: any;

  response: any;

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private metadataService: MetadataService,
    private formBuilder: FormBuilder
  ) {

    this.form = formBuilder.group({
      senhaAtual: new FormControl('', [
        Validators.required,
      ]),
      senha: new FormControl('', [
        Validators.required
      ]),
      confirmacaoSenha: new FormControl('', [
        Validators.required,
      ])
    },
      {
        updateOn: 'change'
      }
    );

    this.form.controls.confirmacaoSenha.valueChanges.subscribe(() => {
      let senha = this.form.get('senha').value;
      let confirmacaoSenha = this.form.get('confirmacaoSenha').value;

      if (senha === confirmacaoSenha) {
        this.form.controls['confirmacaoSenha'].setErrors(null);
      } else {
        this.form.controls['confirmacaoSenha'].setErrors({ mismatch: true });
      }
    });
  }

  ngOnInit(): void {
    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG
  }

  alterar() {
    delete this.response;
    this.loadingService = true;
    this.perfilService.alterarSenha(this.form)
      .subscribe(
        result => {
          this.response = result;
          this.loadingService = false;

          Helpers.scrollPageTop();
          this.form.reset();
        },
        (error) => {
          this.loadingService = false;
          this.response = error.error;

          Helpers.scrollPageTop();
        }
      );
  }
}
