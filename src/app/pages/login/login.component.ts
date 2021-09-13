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
  loadingService: boolean = false;
  response: any;

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

  scrollTop() {
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('.alert-message').offset().top - 300 }, 300);
    }, 100);
  }
}
