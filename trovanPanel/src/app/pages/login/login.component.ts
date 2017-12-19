import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { RutaBaseService } from '../../services/ruta-base/ruta-base.service';
import { AlertaService } from '../../services/alerta/alerta.service';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test : Date = new Date();

    user= ''
    password='';
    private data:any;
    public loading = false;

    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService, private alertaService: AlertaService) { }

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    Ingresar(){
        //this.router.navigate(['home']);

        this.loading = true;
   
        var datos= {
            user: this.user,
            password: this.password
        }

        console.log('Esperando...');

      this.http.post(this.rutaService.getRutaApi()+'trovanAPI/public/login/web', datos)
        .toPromise()
        .then(
          data => { // Success
            console.log(data);
            this.data=data;
            localStorage.setItem('trovan_token', this.data.token);
            localStorage.setItem('trovan_user_id', this.data.user.id);
            //localStorage.setItem('trovan_user_nombre', this.data.user.nombre);
            localStorage.setItem('trovan_user_tipo', this.data.user.tipo_usuario);
            
            this.router.navigate(['home']);
            this.loading = false;

         },
          msg => { // Error

            console.log(msg)
              //console.log(msg.error.error);
              //alert('Error: '+msg.error.error);
              this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);
              this.loading = false;
          }
        );
    }
}
