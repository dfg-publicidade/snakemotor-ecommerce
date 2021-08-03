import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { ProdutoComponent } from './listagem/produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoDetailComponent } from './visualizacao/produto-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    ProdutoComponent,
    ProdutoDetailComponent
  ],
  imports: [
    ProdutoRoutingModule,
    CommonModule,
    ProdutoComponentModule,
    NgSelectModule,
    NgxSliderModule
  ],
  providers: []
})
export class ProdutoModule { }
