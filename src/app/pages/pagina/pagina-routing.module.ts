import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaDetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaRoutingModule { }
