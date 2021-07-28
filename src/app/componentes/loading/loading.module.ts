import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
})
export class LoadingModule { }
