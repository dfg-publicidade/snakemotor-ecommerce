import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
  }


  ngOnInit() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        $('.modal').modal('hide');
      }
      else if (route instanceof NavigationEnd) {
        $('html, body').animate({ scrollTop: $('body').offset().top }, 300);
      }
    });
  }
}
