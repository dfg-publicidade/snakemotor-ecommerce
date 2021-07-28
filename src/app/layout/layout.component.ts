import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
  selector: '.page-wrapper',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LayoutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
   
  }

  public toggleMenu() {
    $('aside').toggleClass('open');
    $('body, html').toggleClass('aside-menu-open');
    return false;
  }
}
