import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PerfilService } from 'src/app/service/perfil.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    AlertMessageModule
  ],
  providers: [
    PerfilService
  ]
})
export class LoginModule { }
