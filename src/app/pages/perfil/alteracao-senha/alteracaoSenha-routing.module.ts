import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlteracaoSenhaComponent } from './alteracao-senha.component';

const routes: Routes = [
  {
    path: '',
    component: AlteracaoSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlteracaoSenhaRoutingModule { }
