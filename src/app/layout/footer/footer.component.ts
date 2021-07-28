import { Component, OnInit } from '@angular/core';
import { ConfiguracaoService } from 'src/app/service/configuracao.service';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  configuracao: any;
  time: any = new Date().getTime();
  constructor(private configuracaoService: ConfiguracaoService) {
  }

  ngOnInit() {
    this.buscarConfiguracao();
  }

  buscarConfiguracao() {
    this.configuracaoService.buscar()
      .subscribe(
        result => {
          if (result) {
            this.configuracao = result;

            setTimeout(() => {
              $('.btn-group-fab').on('click', '.btn', function () {
                $('.btn-group-fab').toggleClass('active');
              });
              $('has-tooltip').tooltip();
            }, 100);
          }
        }
      );
  }

  getOnlyNumber(telefone: string){
   return telefone.replace(/^\+|-|\(|\)/g, '').replace(' ', '');
  }
}
