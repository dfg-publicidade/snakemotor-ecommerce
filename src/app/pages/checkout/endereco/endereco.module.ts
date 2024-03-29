import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CepService } from 'src/app/service/cep.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { EstadoService } from 'src/app/service/estado.service';
import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './endereco.component';

@NgModule({
  declarations: [
    EnderecoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EnderecoRoutingModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    AlertMessageModule,
    NgxMaskModule.forRoot({ 
      dropSpecialCharacters: false
    })
  ],
  providers: [
    CarrinhoService,
    EnderecoService,
    CidadeService,
    EstadoService,
    CepService
  ]
})
export class EnderecoModule { }
