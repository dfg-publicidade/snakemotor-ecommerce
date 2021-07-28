import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalCarrinhoComponent } from './modal-carrinho.component';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { CarrinhoComponenteModule } from 'src/app/pages/carrinho/componente/modal-carrinho.module';

@NgModule({
  declarations: [
    ModalCarrinhoComponent
  ],
  exports: [
    ModalCarrinhoComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    PipeModule,
    CarrinhoComponenteModule
  ],
  providers: [
    CarrinhoService
  ],
})
export class ModalCarrinhoModule { }
