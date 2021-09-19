import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PerfilService } from 'src/app/service/perfil.service';
import { PerfilMenuModule } from '../menu/perfil-menu.module';
import { AlteracaoSenhaComponent } from './alteracao-senha.component';
import { AlteracaoSenhaRoutingModule } from './alteracaoSenha-routing.module';

@NgModule({
  declarations: [
    AlteracaoSenhaComponent
  ],
  imports: [
    AlteracaoSenhaRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    AlertMessageModule,
    PerfilMenuModule
  ],
  providers: [
    PerfilService
  ]
})
export class AlteracaoSenhaModule { }
