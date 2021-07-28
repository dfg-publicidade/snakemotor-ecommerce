import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  busca: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  buscarProdutos() {
    this.router.navigate(['/produtos'], {
      queryParams: {
        q: this.busca
      }
    });
  }
}
