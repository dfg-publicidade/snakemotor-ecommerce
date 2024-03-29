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
import { ProdutoOpcaoService } from '../service/produtoOpcao.service';
import { CarrinhoWhatsappService } from '../service/carrinhoWhatsapp.service';

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
		CarrinhoWhatsappService,
		ConfiguracaoService,
		ProdutoOpcaoService
	]
})
export class LayoutModule {
}
