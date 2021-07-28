import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertMessageComponent } from './alert-message.component';

@NgModule({
  declarations: [
    AlertMessageComponent
  ],
  exports: [
    AlertMessageComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
})
export class AlertMessageModule { }
