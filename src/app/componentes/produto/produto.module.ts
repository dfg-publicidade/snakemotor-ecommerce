import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { ProdutoCComponent } from './produto.component';

@NgModule({
  declarations: [
    ProdutoCComponent
  ],
  exports: [
    ProdutoCComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    PipeModule
  ],
  providers: [],
})
export class ProdutoComponentModule { }
