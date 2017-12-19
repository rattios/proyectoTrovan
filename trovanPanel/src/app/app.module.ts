import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
//import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';

//Mis imports
import { HttpClientModule } from '@angular/common/http';
//import { LoadingModule } from 'ngx-loading';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { RutaBaseService } from './services/ruta-base/ruta-base.service';
import { AlertaService } from './services/alerta/alerta.service';


@NgModule({
    imports:      [
        LoadingModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        /*HttpModule,*/
        SidebarModule,
        NavbarModule,
        FooterModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    providers: [
        RutaBaseService,
        AlertaService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
