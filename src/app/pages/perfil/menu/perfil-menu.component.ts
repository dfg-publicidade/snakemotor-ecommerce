import { Component, OnInit, Input } from '@angular/core';
import { PerfilService } from 'src/app/service/perfil.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-perfil-menu',
  templateUrl: './perfil-menu.component.html',
  styleUrls: ['./perfil-menu.component.scss']
})
export class PerfilMenuComponent implements OnInit {
  @Input() active: string = '';

  constructor(private router: Router, private perfilService: PerfilService) { };

  ngOnInit() {

  }

  logout() {
    this.perfilService.removerSessao();
    this.router.navigate(['/']);
  }
}
