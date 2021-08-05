import { Component, OnInit } from '@angular/core';
import { GalleryImage } from 'ngx-doe-gallery';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss']
})
export class ProdutoDetailComponent implements OnInit {
  images: GalleryImage[];


  constructor() {
    this.images = [];
  };


  ngOnInit(): void {
    // Set gallery items array
    this.images = [
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg'),
      new GalleryImage('/res/imagens/temporarias/produto-1.jpg', '/res/imagens/temporarias/produto-1.jpg')
    ];
  }
}
