import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryVideo } from 'ngx-doe-gallery';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CarrinhoWhatsappService } from 'src/app/service/carrinhoWhatsapp.service';
import { MetadataService } from 'src/app/service/metaData.service';
import { ProdutoOpcaoService } from 'src/app/service/produtoOpcao.service';
import { ProdutoUtil } from 'src/app/util/produtoUtil';
import { Util } from 'src/app/util/util';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss'],
})
export class ProdutoDetailComponent implements OnInit {
  op: string = '';
  produtoPermalink: string = '';
  url: string = '/produtos';
  urlCarrinho: string = '/carrinho';
  urlCarrinhoWp: string = '/carrinho-wp';

  produtoOpcao: any;
  cores: any;
  tamanhos: any;
  produtosPorCategoria: any;
  produtoOpcaoSelecionado: any;
  carrinho: any;
  carrinhoWp: any;
  qtdes: any = [];
  toastMessage: any;

  metatag: any = {};

  formVariacao: any;

  imagemSelecionada: any;

  categoria: any;

  urlVideo: any;
  urlVideoSeguro: any;
  thumbVideo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produtoOpcaoService: ProdutoOpcaoService,
    private carrinhoService: CarrinhoService,
    private carrinhoWpService: CarrinhoWhatsappService,
    private metadataService: MetadataService,
    private sanitizer: DomSanitizer
  ) {
    this.formVariacao = this.formBuilder.group({
      tamanho: new FormControl(null, [Validators.required]),
      qtde: new FormControl(1, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.produtoPermalink = params['produtoPermalink'];
    });

    this.route.queryParams.subscribe((params) => {
      this.op = params['op'];

      if (this.op) {
        this.buscarProdutoOpcao();
      }
    });
  }

  buscarProdutoOpcao() {
    delete this.produtoOpcao;
    this.formVariacao.controls.tamanho.setValue(null);

    this.produtoOpcaoService.visualizar(this.op).subscribe((result) => {
      this.produtoOpcao = result.content.entity;
      this.cores = result.content.cores;
      this.tamanhos = result.content.tamanhos;

      if (this.produtoOpcao.video) {
        this.urlVideo = `${Util.linkYoutubeEmbed()}/${this.produtoOpcao.video}`;

         this.urlVideoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${Util.linkYoutubeEmbed()}/${this.produtoOpcao.video}`
        );

        this.thumbVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://img.youtube.com/vi/${this.produtoOpcao.video}/0.jpg`
        );
      } else {
        if (this.produtoOpcao.produto.video) {
          this.urlVideo = `${Util.linkYoutubeEmbed()}/${this.produtoOpcao.produto.video}`;

          this.urlVideoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(
           `${Util.linkYoutubeEmbed()}/${this.produtoOpcao.produto.video}`
         );

          this.thumbVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://img.youtube.com/vi/${this.produtoOpcao.produto.video}/0.jpg`
          );
        }
      }

      this.cores.forEach((pOpcao: any, index: number) => {
        this.cores[index].imagem = ProdutoUtil.getImagemDestaque(pOpcao);

        if (!this.cores[index].imagem) {
          this.cores[index].imagem = '/res/imagens/sem-imagem.png';
        }
      });

      this.produtoOpcao.imagens = ProdutoUtil.getGaleriaImagens(
        this.produtoOpcao
      );

      if(this.urlVideo) { 
      this.produtoOpcao.imagens.push(new GalleryVideo(this.urlVideo, this.thumbVideo));
      }

      if (!this.tamanhos || (this.tamanhos && this.tamanhos.length <= 1)) {
        if (this.tamanhos && this.tamanhos.length === 1) {
          this.produtoOpcaoSelecionado = this.tamanhos[0];
        }
        this.formVariacao.get('tamanho').clearValidators();
        this.formVariacao.get('tamanho').updateValueAndValidity();
      }

      this.produtoOpcaoSelecionado = this.produtoOpcao;

      this.getQtdes();

      //INICIO META TAG
      this.metatag.url = this.router.url;
      this.metatag.title = `${this.produtoOpcao.produto.nome} | ${environment.title}`;
      this.metatag.description = `${this.produtoOpcao.produto.descricaoCurta}`;
      this.metatag.image = `${this.produtoOpcao.produto.imagem}`;
      this.metadataService.updateMetadata(this.metatag);
      //FIM META TAG

      //PRODUTO RELACIONADOS
      this.listarProdutosPorCategoria(
        this.produtoOpcao.produto.categoria.id,
        4,
        true
      );
    });
  }

  listarProdutosPorCategoria(
    categoriaId: string,
    limite: number,
    aleatorio: boolean
  ) {
    this.produtoOpcaoService
      .listarPorCategoria(categoriaId, limite, aleatorio, this.op)
      .subscribe((result) => {
        this.produtosPorCategoria = result.content.items;
      });
  }

  selecionarOpcao(event: any) {
    this.formVariacao.controls.qtde.setValue(null);
    this.op = event;
    this.produtoOpcaoSelecionado = this.tamanhos.find(
      (pOpcao: any) => pOpcao && pOpcao.id === this.op
    );

    this.produtoOpcaoSelecionado.adicionadoCarrinho = this.jaPossuiCarrinho(this.produtoOpcaoSelecionado.id);

    this.getQtdes();
  }

  getQtdes() {
    this.qtdes = [];

    if (
      this.produtoOpcaoSelecionado &&
      this.produtoOpcaoSelecionado.estoqueAtual
    ) {
      for (
        let qtde = 1;
        qtde <= this.produtoOpcaoSelecionado.estoqueAtual;
        qtde++
      ) {
        this.qtdes.push(qtde);
      }

      if (this.qtdes.length > 0) {
        this.formVariacao.controls.qtde.setValue(1);
        this.formVariacao.controls.qtde.enable();
      }
    } else {
      this.formVariacao.controls.qtde.disable();
    }
  }

  comprar() {
    let carrinho = this.carrinhoService.getCarrinho();

    if (!carrinho) {
      carrinho = this.carrinhoService.getCarrinhoVazio();
    }

    carrinho.produtos.push({
      qtde: this.formVariacao.value.qtde,
      produto: this.produtoOpcaoSelecionado.id,
    });

    this.carrinhoService.setCarrinho(carrinho);

    setTimeout(() => {
      this.router.navigate([this.urlCarrinho]);
    }, 100);
  }

  comprarWp() {
    let carrinho = this.carrinhoWpService.getCarrinho();

    if (!carrinho) {
      carrinho = this.carrinhoWpService.getCarrinhoVazio();
    }

    carrinho.produtos.push({
      qtde: this.formVariacao.value.qtde,
      produto: this.produtoOpcaoSelecionado.id,
    });

    this.carrinhoWpService.setCarrinho(carrinho);

    setTimeout(() => {
      this.router.navigate([this.urlCarrinhoWp]);
    }, 100);
  }

  jaPossuiCarrinho(produtoOpcaoId: string): boolean {
    this.carrinho = this.carrinhoService.getCarrinho();
    this.carrinhoWp = this.carrinhoWpService.getCarrinho();

    let possuiCarrinho = false;

    if (this.carrinho) {
      possuiCarrinho = this.carrinho.produtos.find(
        (pOpcao: any) => pOpcao && pOpcao.produto === produtoOpcaoId
      );
    }

    if (this.carrinhoWp) {
      possuiCarrinho = this.carrinhoWp.produtos.find(
        (pOpcao: any) => pOpcao && pOpcao.produto === produtoOpcaoId
      );
    }

    return possuiCarrinho;
  }

  previewConteudo(imagem: any) {
    this.imagemSelecionada = imagem.item.src;

    $('body').addClass('lightbox-body');
    $('.lightbox').show();
  }

  hidePreview(event?: any) {
    if (
      !event ||
      (event && !event.path) ||
      (event.path && event.path.length > 0 && event.path[0])
    ) {
      $('body').removeClass('lightbox-body');
      $('.lightbox').hide();

      delete this.imagemSelecionada;
    }
  }
}
