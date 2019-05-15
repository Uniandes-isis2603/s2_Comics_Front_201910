import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { VendedorDetailComponent } from './vendedor-detail/vendedor-detail.component';
import {VendedorCalificacionesComponent} from './Vendedor-Calificaciones/vendedor-calificaciones.component'
import {VendedorAddCalificacionComponent} from './vendedor-add-calificacion/vendedor-add-calificacion.component'
import { VendedorService } from './vendedor.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {VendedorEditCalificacionComponent} from './vendedor-edit-calificacion/vendedor-edit-calificacion.component';
import {VendedorEditComponent} from './vendedor-edit/vendedor-edit.component';
import {VendedorComicsComponent} from './vendedor-comic/vendedor-comic.component';
import {ComicModule} from "../Comic/Comic.module";
import {ComicService} from "../Comic/comic.service";
@NgModule({
    imports: [       
        CommonModule,
        FormsModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        ComicModule
    ],
    declarations: [VendedorListComponent,VendedorDetailComponent,
        VendedorCalificacionesComponent,
         VendedorAddCalificacionComponent,VendedorEditCalificacionComponent, VendedorEditComponent,VendedorComicsComponent],
    providers: [VendedorService,ComicService],
    exports:[VendedorListComponent,VendedorEditCalificacionComponent]
})
export class VendedorModule {}