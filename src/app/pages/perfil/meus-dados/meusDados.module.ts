import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PerfilService } from 'src/app/service/perfil.service';
import { PerfilMenuModule } from '../menu/perfil-menu.module';
import { MeusDadosRoutingModule } from './meusDados-routing.module';
import { MeusDadosComponent } from './visualizacao/detail.component';

@NgModule({
  declarations: [
    MeusDadosComponent
  ],
  imports: [
    MeusDadosRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    AlertMessageModule,
    PerfilMenuModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [
    PerfilService
  ]
})
export class MeusDadosModule { }
