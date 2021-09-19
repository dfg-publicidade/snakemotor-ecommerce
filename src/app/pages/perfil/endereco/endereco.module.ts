import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { CepService } from 'src/app/service/cep.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { EstadoService } from 'src/app/service/estado.service';
import { PerfilMenuModule } from '../menu/perfil-menu.module';
import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './listagem/listagem.component';
import { EnderecoCreateComponent } from './novo/create.component';
import { EnderecoDetailComponent } from './visualizacao/detail.component';

@NgModule({
  declarations: [
    EnderecoComponent,
    EnderecoCreateComponent,
    EnderecoDetailComponent
  ],
  imports: [
    EnderecoRoutingModule,
    CommonModule,
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
    EnderecoService,
    EstadoService,
    CidadeService,
    CepService
  ]
})
export class EnderecoModule { }
