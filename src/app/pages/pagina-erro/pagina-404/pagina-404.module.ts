import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { MetadataService } from 'src/app/service/metaData.service';
import { Pagina404RoutingModule } from './pagina-404-routing.module';
import { Pagina404Component } from './pagina-404.component';

@NgModule({
	declarations: [
		Pagina404Component
	],
	imports: [
		FormsModule,
		RouterModule,
		CommonModule,
		Pagina404RoutingModule,
		PipeModule
	],
	providers: [
		MetadataService
	]
})
export class Pagina404Module {
}
