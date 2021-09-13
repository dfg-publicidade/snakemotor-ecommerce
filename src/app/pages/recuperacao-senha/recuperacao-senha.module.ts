import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PerfilService } from 'src/app/service/perfil.service';
import { RecuperacaoSenhaRoutingModule } from './recuperacao-senha-routing.module';
import { RecuperacaoSenhaComponent } from './recuperacao-senha.component';

@NgModule({
  declarations: [
    RecuperacaoSenhaComponent
  ],
  imports: [
    RecuperacaoSenhaRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    AlertMessageModule
  ],
  providers: [
    PerfilService
  ]
})
export class RecuperacaoSenhaModule { }
