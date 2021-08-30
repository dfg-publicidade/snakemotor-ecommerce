import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss']
})
export class ProdutoDetailComponent implements OnInit {
  op: string = '';
  produtoPermalink: string = '';
  url: string = '/produtos';

  produtoOpcao: any;
  produtosPorCategoria: any;

  metatag: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoOpcaoService: ProdutoOpcaoService,
    private metadataService: MetadataService
  ) {
  };


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produtoPermalink = params['produtoPermalink'];
    });

    this.route.queryParams.subscribe(params => {
      this.op = params['op'];

      if (this.op) {
        this.buscarProdutoOpcao();
      }
    });
  }

  buscarProdutoOpcao() {
    this.produtoOpcaoService.visualizar(this.op)
      .subscribe(
        result => {
          this.produtoOpcao = result.content;
          this.produtoOpcao.preco = ProdutoUtil.getPreco(this.produtoOpcao);
          this.produtoOpcao.imagem = ProdutoUtil.getImagemDestaque(this.produtoOpcao);

          if (!this.produtoOpcao.imagem) {
            this.produtoOpcao.imagem = '/res/imagens/sem-imagem.png';
          }

          this.produtoOpcao.imagens = ProdutoUtil.getGaleriaImagens(this.produtoOpcao);

          //INICIO META TAG
          this.metatag.url = this.router.url;
          this.metatag.title = `Depoimento - ${this.produtoOpcao.produto.nome} | ${environment.title}`;
          this.metatag.description = `${this.produtoOpcao.produto.descricaoCurta}`;
          this.metatag.image = `${this.produtoOpcao.produto.imagem}`;
          this.metadataService.updateMetadata(this.metatag);
          //FIM META TAG

          //PRODUTO RELACIONADOS
          this.listarProdutosPorCategoria(this.produtoOpcao.produto.categoria.id, 4, true);
        }
      );
  }

  listarProdutosPorCategoria(categoriaId: string, limite: number, aleatorio: boolean) {
    this.produtoOpcaoService.listarPorCategoria(categoriaId, limite, aleatorio)
      .subscribe(
        result => {
          this.produtosPorCategoria = result.content.items;
        }
      );
  }
}
