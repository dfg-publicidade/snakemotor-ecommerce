import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Helpers from 'src/app/helpers';
import { MetadataService } from 'src/app/service/metaData.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { PerfilService } from 'src/app/service/perfil.service';

declare var $: any;

@Component({
  selector: 'app-meusdados-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class MeusDadosComponent implements OnInit {
  url: string = '/perfil';
  title: string = 'Meus dados';

  id: string = '';
  entity: any
  response: any;

  loadingService: boolean = false;

  metatag: any = {};

  form: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private metadataService: MetadataService,
    private formBuilder: FormBuilder
  ) {

    this.form = formBuilder.group({
      nome: new FormControl('', [
        Validators.required
      ]),
      tipo: new FormControl(null, [
        Validators.required
      ]),
      cpfCnpj: new FormControl('', [
        Validators.required
      ]),
      dataNascto: new FormControl('', [
        Validators.required
      ]),
      celular: new FormControl('', [
        Validators.required,
        Validators.minLength(15)
      ]),
      telefone: new FormControl(''),
      aceiteOferta: new FormControl(''),
      aceiteContato: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    },
      {
        updateOn: 'change'
      }
    );

    this.form.controls.tipo.valueChanges.subscribe(() => {
      this.form.controls['cpfCnpj'].setValue('');
    });

    this.form.controls.tipo.disable();
    this.form.controls.nome.disable();
    this.form.controls.cpfCnpj.disable();
  }

  ngOnInit(): void {
    this.visualizar();

    //INICIO META TAG
    this.metatag.url = this.router.url;
    this.metatag.title = this.title;
    this.metadataService.updateMetadata(this.metatag);
    //FIM META TAG

  }

  visualizar() {
    this.loadingService = true;

    this.perfilService.visualizar()
      .subscribe(
        result => {
          this.loadingService = false;

          this.entity = result.content;

          this.form.patchValue(this.entity);

        });
  }

  alterar() {
    delete this.response;
    this.loadingService = true;
    this.perfilService.alterar(this.form)
      .subscribe(
        result => {
          this.response = result;
          this.loadingService = false;

          Helpers.scrollPageTop();
        },
        (error) => {
          this.loadingService = false;
          this.response = error.error;

          Helpers.scrollPageTop();
        }
      );
  }
}
