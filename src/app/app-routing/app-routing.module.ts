import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxPermissionsGuard} from 'ngx-permissions';

import { AuthLoginComponent } from '../auth/auth-login/auth-login.component';
import { AuthSignUpComponent } from '../auth/auth-sign-up/auth-sign-up.component';
import { ComicDeseoListComponent } from '../ComicDeseo/ComicDeseo-List/comicDeseo-list.component';
import { ComicDeseoDetailComponent } from '../ComicDeseo/comicDeseo-detail/comicdeseo-detail.component';
//import { ComicDeseoDetailComponent } from '../ComicDeseo/ComicDeseo-Detail/comicDeseo-Detail.component';

const routes: Routes = [



    {
        path: 'comicsdeseo',
        children:[

            {path:'list', component: ComicDeseoListComponent},
            {path: ':id', component: ComicDeseoDetailComponent, outlet:'detail'}
           
        ]
        

    },

     {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: AuthLoginComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['GUEST']
                    }
                }
            },
            {
                path: ':sign-up',
                component: AuthSignUpComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['GUEST']
                    }
                }
            }
        ]
    },
    {
        path: 'form',
        component: FormularioComponent
    },
    {
        path: 'comprador',
        children: [
            {
                path: '',
                component: CompradorListComponent
            },
            {
                path: ':id',
                component: CompradorDetailComponent
            }
        ]
    }, {
        path: 'vendedores',
        children: [{
            path: 'list',
            component: VendedorListComponent
        }, {
            path: ':id',
            component: VendedorDetailComponent


        }

        ]
    },
    {
        path: 'comic',
        children: [{
            path: 'list',
            component: ComicListComponent
        },
        {
            path: ':id',
            component: ComicDetailComponent
        }
        ]
    },
    {
        path: 'home',
        component: AuthLoginComponent
    },
    {
        path: 'orden',
        children:[{path:'list',
        component: OrdenPedidoListComponent,
       },
       {path:'detail',
        component: OrdenPedidoDetailComponent,
        outlet: 'det'
       },
    ]
        
    },
    {
        path: '**',
        redirectTo: 'home',
    }
    

       
   
  
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  // RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {

}


