import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { CepService } from 'src/app/service/cep.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { EstadoService } from 'src/app/service/estado.service';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CadastroRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [
    EstadoService,
    CidadeService,
    CepService
  ]
})
export class CadastroModule { }
