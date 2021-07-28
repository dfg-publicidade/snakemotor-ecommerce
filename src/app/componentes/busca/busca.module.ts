import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  providers: [],
})
export class BuscaModule { }
