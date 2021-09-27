import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertMessageModule } from 'src/app/componentes/alertMessage/modal-alert.module';
import { PipeModule } from 'src/app/pipe/pipeModule';
import { MetadataService } from 'src/app/service/metaData.service';
import { PaginaService } from 'src/app/service/pagina.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { PaginaDetailComponent } from './detail.component';
import { PaginaRoutingModule } from './pagina-routing.module';

@NgModule({
  declarations: [
    PaginaDetailComponent
  ],
  imports: [
    PaginaRoutingModule,
    CommonModule,
    PipeModule
  ],
  providers: [
    PaginaService,
    MetadataService
  ]
})
export class PaginaModule { }
