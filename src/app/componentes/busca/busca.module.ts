import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { BuscaComponent } from './busca.component';

@NgModule({
  declarations: [
    BuscaComponent
  ],
  exports: [
    BuscaComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [
    ProdutoOpcaoService
  ],
})
export class BuscaModule { }
