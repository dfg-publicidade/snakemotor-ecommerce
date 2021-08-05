import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { GalleryModule } from 'ngx-doe-gallery';
import { ProdutoComponentModule } from 'src/app/componentes/produto/produto.module';
import { ProdutoComponent } from './listagem/produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoDetailComponent } from './visualizacao/produto-detail.component';

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
    NgxSliderModule,
    GalleryModule
  ],
  providers: []
})
export class ProdutoModule { }
