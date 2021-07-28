import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { BuscaComponent } from '../componentes/busca/busca.component';
import { PipeModule } from '../pipe/pipeModule';
import { PerfilService } from '../service/perfil.service';
import { CategoriaService } from '../service/categoria.service';
import { CarrinhoService } from '../service/carrinho.service';
import { ConfiguracaoService } from '../service/configuracao.service';
import { LoadingModule } from '../componentes/loading/loading.module';

@NgModule({
	declarations: [
		LayoutComponent,
		HeaderComponent,
		MenuMobileComponent,
		FooterComponent,
		BuscaComponent
	],
	exports: [
		LayoutComponent,
		BuscaComponent
	],
	imports: [
		FormsModule,
		RouterModule,
		CommonModule,
		PipeModule,
		LoadingModule
	],
	providers: [
		PerfilService,
		CategoriaService,
		CarrinhoService,
		ConfiguracaoService,
		ConfiguracaoService
	]
})
export class LayoutModule {
}
