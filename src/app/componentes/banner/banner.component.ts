import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() items: any = [];
  @Input() options: OwlOptions;
  innerWidth: number = 0;
  isMobile: boolean = false;

  constructor(private router: Router) {
    this.options = {
      loop: true,
      items: 1,
      nav: true,
      autoWidth: true,
      dots: true,
      autoplay: true,
      navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
      responsive: {
        0: {
          items: 1
        }
      }
    };
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.mobile();
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.items = changes.items.currentValue;
    }
    if (changes.options) {
      this.options = changes.options.currentValue;
    }
  }

  mobile() {
    if (this.innerWidth < 575) {
      this.isMobile = true
    } else {
      this.isMobile = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    this.mobile();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
}
