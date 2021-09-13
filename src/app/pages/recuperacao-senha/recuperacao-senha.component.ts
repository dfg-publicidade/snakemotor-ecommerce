import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from 'src/app/service/perfil.service';

declare var $: any;

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html',
  styleUrls: ['./recuperacao-senha.component.scss']
})
export class RecuperacaoSenhaComponent implements OnInit {
  form: any;
  id: string = '';
  hash: string = '';

  loadingService: boolean = false;
  response: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService
  ) {
    this.form = formBuilder.group({
      id: new FormControl('', [
        Validators.required
      ]),
      hash: new FormControl('', [
        Validators.required
      ]),
      senha: new FormControl('', [
        Validators.required
      ]),
      confirmacaoSenha: new FormControl('', [
        Validators.required
      ])
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
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.hash = params['hash'];

      if (this.id) {
        this.form.controls.id.setValue(this.id);
      }

      if (this.hash) {
        this.form.controls.hash.setValue(this.hash);
      }

    });
  }


  recuperarSenha() {
    delete this.response;
    this.loadingService = true;
    this.perfilService.recuperarSenha(this.form)
      .subscribe(
        result => {
          this.response = result;
          this.loadingService = false;

          this.form.reset();

          setTimeout(() => {
            $('#modalRecuperaSenhaSucesso').modal('show');
          }, 100);

          setTimeout(() => {
            $('#modalRecuperaSenhaSucesso').modal('hide');

            this.router.navigate(['/login']);
          }, 5000);
        },
        (error) => {
          this.loadingService = false;
          this.response = error.error;
        }
      );
  }
}
