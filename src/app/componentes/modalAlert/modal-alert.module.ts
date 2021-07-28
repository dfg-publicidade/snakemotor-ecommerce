import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalAlertComponent } from './modal-alert.component';

@NgModule({
  declarations: [
    ModalAlertComponent
  ],
  exports: [
    ModalAlertComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
})
export class ModalAlertModule { }
