import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastMessageComponent } from './toast-message.component';

@NgModule({
  declarations: [
    ToastMessageComponent
  ],
  exports: [
    ToastMessageComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [],
})
export class ToastMessageModule { }
