import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilMenuComponent } from './perfil-menu.component';

@NgModule({
	declarations: [
		PerfilMenuComponent
	],
	exports: [
		PerfilMenuComponent
	],
	imports: [
		RouterModule,
		CommonModule
	],
	providers: [
	]
})
export class PerfilMenuModule {
}
