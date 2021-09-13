import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/service/perfil.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;
  formRecuperacaoSenha: any;

  loadingService: boolean = false;
  loadingServiceRecuperacaoSenha: boolean = false;
  response: any;
  responseRecuperacaoSenha: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService
  ) {
    this.form = formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      senha: new FormControl('', [
        Validators.required
      ])
    });

    this.formRecuperacaoSenha = formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  };

  ngOnInit(): void {
  }

  login() {
    delete this.response;
    this.loadingService = true;
    this.perfilService.login(this.form)
      .subscribe(
        result => {
          this.response = result;
          this.loadingService = false;

          if (this.response && this.response.status === 'success') {
            if (this.response.content) {
              this.perfilService.setSession(this.response.content);

              setTimeout(() => {
                this.router.navigate(['/']);
              }, 100);

            }

            this.form.reset();
          } else {
            this.scrollTop();
          }
        },
        (error) => {
          this.loadingService = false;
          this.response = error.error;

          this.scrollTop();
        }
      );
  }

  recuperarSenha() {
    delete this.responseRecuperacaoSenha;
    this.loadingServiceRecuperacaoSenha = true;
    this.perfilService.envioEmailRecuperacaoSenha(this.formRecuperacaoSenha)
      .subscribe(
        result => {
          this.responseRecuperacaoSenha = result;
          this.loadingServiceRecuperacaoSenha = false;

          this.formRecuperacaoSenha.reset();

          setTimeout(() => {
            delete this.responseRecuperacaoSenha;
            $('#modalRecuperacaoSenha').modal('hide');
          }, 5000);
        },
        (error) => {
          this.loadingServiceRecuperacaoSenha = false;
          this.responseRecuperacaoSenha = error.error;
        }
      );
  }

  scrollTop() {
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('.alert-message').offset().top - 300 }, 300);
    }, 100);
  }
}
