import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { RutaBaseService } from '../../services/ruta-base/ruta-base.service';
import { AlertaService } from '../../services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html',
    styleUrls : ['register.css']
})

export class RegisterComponent implements OnInit{
    test : Date = new Date();

    //Para las asociaciones
    public ciudades:any;
    public provincias:any;
    //Para las clinicas o veterinarios
    public provincias2:any;

    //Formularios
    myFormAsociaciones: FormGroup;
    myFormClinicasVeterinarios: FormGroup;

    //Casos 1 por defecto para las direcciones
    public caso_dir = 1;
    public caso_dir2 = 1;

    private data:any;
    public loading = false;
    public tipo: string = '4';


    constructor(private http: HttpClient,private router: Router, private rutaService: RutaBaseService, private alertaService: AlertaService, private fb: FormBuilder) { 

        this.ciudades = [{id:0, ciudad: 'La Paz', provincias: [{id:1, provincia: 'Pedro Domingo Murillo'}, {id:2, provincia:'Sud Yungas'},{id:3, provincia: 'Pacajes'},{id:4, provincia: 'Omasuyos'},{id:5, provincia: 'Nor Yungas'},{id:6, provincia: 'Muñecas'},{id:7, provincia: 'Manco Kapac'},{id:8, provincia: 'Los Andes'},{id:9, provincia: 'Larecaja'},{id:10, provincia: 'Jose Ramon Loayza'},
                {id:11, provincia: 'Jose Manuel Pando'},{id:12, provincia: 'Inquisivi'},{id:13, provincia: 'Ingavi'},{id:14, provincia: 'Gualberto Villarroel'},{id:15, provincia: 'Franz Tamayo'},{id:16, provincia: 'Eliodoro Camacho'},{id:17, provincia: 'Caranavi'},{id:18, provincia: 'Bautista Saavedra'},{id:19, provincia: 'Aroma'},{id:20, provincia: 'Abel Iturralde'}]},
                {id:1, ciudad: 'La Paz-El Alto', provincias: [{id:1, provincia: 'Pedro Domingo Murillo'}, {id:2, provincia:'Sud Yungas'},{id:3, provincia: 'Pacajes'},{id:4, provincia: 'Omasuyos'},{id:5, provincia: 'Nor Yungas'},{id:6, provincia: 'Muñecas'},{id:7, provincia: 'Manco Kapac'},{id:8, provincia: 'Los Andes'},{id:9, provincia: 'Larecaja'},{id:10, provincia: 'Jose Ramon Loayza'},
                {id:11, provincia: 'Jose Manuel Pando'},{id:12, provincia: 'Inquisivi'},{id:13, provincia: 'Ingavi'},{id:14, provincia: 'Gualberto Villarroel'},{id:15, provincia: 'Franz Tamayo'},{id:16, provincia: 'Eliodoro Camacho'},{id:17, provincia: 'Caranavi'},{id:18, provincia: 'Bautista Saavedra'},{id:19, provincia: 'Aroma'},{id:20, provincia: 'Abel Iturralde'}]},
                {id:2, ciudad: 'Santa Cruz', provincias: [{id:1, provincia:'Andres Ibañez'},{id:2, provincia:'Angel Sandoval'},{id:3, provincia:'Chiquitos'},{id:4, provincia:'Cordillera'},{id:5, provincia:'Florida'},{id:6, provincia:'German Busch'},{id:7, provincia:'Guarayos'},{id:8, provincia:'Ichilo'},{id:9, provincia:'Jose Miguel De Velasco'},{id:10, provincia:'Ignacio Warnes'},{id:11, provincia:'Manuel Maria Caballero'},
                {id:12, provincia:'Nuflo de Chavez'},{id:13, provincia:'Obispo Santistevan'},{id:14, provincia:'Sara'},{id:15, provincia:'Vallegrande'}]},
                {id:3, ciudad: 'Cochabamba', provincias: [{id:1, provincia:'Arani'},{id:2, provincia:'Arque'},{id:3, provincia:'Ayopaya'},{id:4, provincia:'Bolivar'},{id:5, provincia:'Capinota'},{id:6, provincia:'Carrasco'},{id:7, provincia:'Rodeado'},{id:8, provincia:'Chapare'},{id:9, provincia:'Esteban Arce'},{id:10, provincia:'German Jordan'},{id:11, provincia:'Provincia Mizque'},
                {id:12, provincia:'Narciso Campero'},{id:13, provincia:'Punata'},{id:14, provincia:'Quillacollo'},{id:15, provincia:'Tapacari'},{id:16, provincia:'Tiraque'}]},
                {id:4, ciudad: 'Oruro', provincias: [{id:1, provincia:'Atahuallpa'},{id:2, provincia:'Carangas'},{id:3, provincia:'Rodeado'},{id:4, provincia:'Eduardo Avaroa'},{id:5, provincia:'Ladislao Cabrera'},{id:6, provincia:'Costa'},{id:7, provincia:'Nor Carangas'},{id:8, provincia:'Pantaleon Dalence'},{id:9, provincia:'Poopo'},{id:10, provincia:'Puerto Mejillones'},{id:11, provincia:'Sajama'},
                {id:12, provincia:'San Pedro De Totora'},{id:13, provincia:'Saucari'},{id:14, provincia:'Sebastian Pagador'},{id:15, provincia:'Sud Carangas'},{id:16, provincia:'Tomas Barron'}]},
                {id:5, ciudad: 'Chuquisaca', provincias: [{id:1, provincia:'Belisario Boeto'},{id:2, provincia:'Hernando Siles'},{id:3, provincia:'Jaime Sudañez'},{id:4, provincia:'Juana Azurduy De Padilla'},{id:5, provincia:'Luis Calvo'},{id:6, provincia:'Nor Cinti'},{id:7, provincia:'Oropeza'},{id:8, provincia:'Sud Cinti'},{id:9, provincia:'Tomina'},{id:10, provincia:'Yamparaez'}]},
                {id:6, ciudad: 'Tarija', provincias: [{id:1, provincia:'Aniceto Arce'},{id:2, provincia:'Burdet O’conor'},{id:3, provincia:'Cercado'},{id:4, provincia:'Eustaquio Mendez'},{id:5, provincia:'Gran Chaco'},{id:6, provincia:'Jose Maria Aviles'}]},
                {id:7, ciudad: 'Pando', provincias: [{id:1, provincia:'Abuna'},{id:2, provincia:'Roman'},{id:3, provincia:'Madre de Dios'},{id:4, provincia:'Manuripi'},{id:5, provincia:'Nicolas Suarez'}]},
                {id:8, ciudad: 'Potosi', provincias: [{id:1, provincia:'Alonzo De Ibañez'},{id:2, provincia:'Antonio Quijarro'},{id:3, provincia:'Bernardino Bilbao'},{id:4, provincia:'Charcas'},{id:5, provincia:'Chayanta'},{id:6, provincia:'Cornelio Saavedra'},{id:7, provincia:'Daniel Fields'},{id:8, provincia:'Enrique Baldivieso'},{id:9, provincia:'Jose Maria Linares'},{id:10, provincia:'Modesto Omiste'},{id:11, provincia:'Nor Chichas'},
                {id:12, provincia:'Nor Lipez'},{id:13, provincia:'Rafael Bustillo'},{id:14, provincia:'Sud Chichas'},{id:15, provincia:'Sud Lipez'},{id:16, provincia:'Tomas Frias'}]},
                {id:9, ciudad: 'Beni', provincias: [{id:1, provincia:'Cercado'},{id:2, provincia:'Itenez'},{id:3, provincia:'Jose Ballivian'},{id:4, provincia:'Mamore'},{id:5, provincia:'Marban'},{id:6, provincia:'Moxos'},{id:7, provincia:'Vaca Diez'},{id:8, provincia:'Yacuma'}]}];
    
        this.provincias = this.ciudades[0].provincias;

        this.provincias2 = this.ciudades[0].provincias;

        //Caso 1 por defecto
        this.myFormAsociaciones = this.fb.group({
            nombre_asociacion: [null, [Validators.required]],
            matricula_rema: [null, [Validators.required]],
            ciudad: [this.ciudades[0].ciudad, [Validators.required]],
            provincia: [this.ciudades[0].provincias[0].provincia, [Validators.required]],
            direccion_tipo: [1],
            //municipio: [null, [Validators.required]],
            zona: [null, [Validators.required]],
            av: [null, [Validators.required]],
            calle: [null, [Validators.required]],
            nro: [null, [Validators.required]],
            //barrio: [null, [Validators.required]],
            //mz: [null, [Validators.required]],
            //uv: [null, [Validators.required]],
            nombre: [null, [Validators.required]],
            apellido_paterno: [null, [Validators.required]],
            apellido_materno: [null],
            email: [null, [Validators.required]],
            telefono: [null, [Validators.required]],
            celular_1: [null, [Validators.required]],
            celular_2: [null],
            user: [null],
            password: [null, [Validators.required]],
            password_conf: [null, [Validators.required]],
            tipo_usuario: [5]
        });

        console.log(this.ciudades[0].ciudad);
        console.log(this.myFormAsociaciones.value.ciudad);
        console.log(this.ciudades[0].provincias[0].provincia);
        console.log(this.myFormAsociaciones.value.provincia);

        //Caso 1 por defecto
        this.myFormClinicasVeterinarios = this.fb.group({
            colegio_medico: ['COMVETCRUZ SANTA CRUZ', [Validators.required]],
            matricula: [null, [Validators.required]],
            ciudad: [this.ciudades[0].ciudad, [Validators.required]],
            provincia: [this.ciudades[0].provincias[0].provincia, [Validators.required]],
            direccion_tipo: [1],
            //municipio: [null, [Validators.required]],
            zona: [null, [Validators.required]],
            av: [null, [Validators.required]],
            calle: [null, [Validators.required]],
            nro: [null, [Validators.required]],
            //barrio: [null, [Validators.required]],
            //mz: [null, [Validators.required]],
            //uv: [null, [Validators.required]],
            nombre: [null, [Validators.required]],
            apellido_paterno: [null, [Validators.required]],
            apellido_materno: [null],
            email: [null, [Validators.required]],
            telefono: [null, [Validators.required]],
            celular_1: [null, [Validators.required]],
            user: [null],
            password: [null, [Validators.required]],
            password_conf: [null, [Validators.required]],
            tipo_usuario: [4]
        });

        console.log(this.ciudades[0].ciudad);
        console.log(this.myFormClinicasVeterinarios.value.ciudad);
        console.log(this.ciudades[0].provincias[0].provincia);
        console.log(this.myFormClinicasVeterinarios.value.provincia);
        
    }

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
    }

    setTipo(tipo){
        this.tipo = tipo;
    }

    showNotification(from, align, color, message){
        //var type = ['','info','success','warning','danger','rose','primary'];

        //var color = Math.floor((Math.random() * 6) + 1);

        $.notify({
            icon: "notifications",
            message: message

        },{
            /*type: type[color],*/
            type: color,
            timer: 3000,
            placement: {
                from: from,
                align: align
            }
        });
    }

    //Para las asociaciones
    setCiudad(ciudad){
        console.log(ciudad);
        let index = this.ciudades.findIndex((item) => item.ciudad === ciudad);
        if(index !== -1){
            console.log(index);
            this.provincias = this.ciudades[index].provincias;

            //Seteo sin el formControlName en el html
            this.myFormAsociaciones.patchValue({ciudad : ciudad});
        }

        var formAux = Object.assign({},this.myFormAsociaciones.value);

        //Caso 1
        if (ciudad != 'Santa Cruz') {

            this.caso_dir = 1;

            this.myFormAsociaciones = this.fb.group({
                nombre_asociacion: [formAux.nombre_asociacion, [Validators.required]],
                matricula_rema: [formAux.matricula_rema, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [this.provincias[0].provincia, [Validators.required]],
                direccion_tipo: [1],
                //municipio: [null, [Validators.required]],
                zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                //barrio: [null, [Validators.required]],
                //mz: [null, [Validators.required]],
                //uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [5]
            });

            formAux = null;
        }
        //Caso 2
        if (ciudad == 'Santa Cruz') {

            this.caso_dir = 2;

            this.myFormAsociaciones = this.fb.group({
                nombre_asociacion: [formAux.nombre_asociacion, [Validators.required]],
                matricula_rema: [formAux.matricula_rema, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [this.provincias[0].provincia, [Validators.required]],
                direccion_tipo: [2],
                //municipio: [null, [Validators.required]],
                //zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                barrio: [null, [Validators.required]],
                mz: [null, [Validators.required]],
                uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [5]
            });

            formAux = null;
        }
        
    }

    setProvincia(provincia){
        console.log(provincia);

        var formAux = Object.assign({},this.myFormAsociaciones.value);

        //console.log(formAux.cargo);

        //Caso 1
        if (this.myFormAsociaciones.value.ciudad === 'La Paz' && provincia === 'Pedro Domingo Murillo' ||
         this.myFormAsociaciones.value.ciudad === 'La Paz-El Alto' && provincia === 'Pedro Domingo Murillo' ||
         this.myFormAsociaciones.value.ciudad === 'Cochabamba' && provincia === 'Arani' ||
         this.myFormAsociaciones.value.ciudad === 'Oruro' && provincia === 'Atahuallpa' ||
         this.myFormAsociaciones.value.ciudad === 'Chuquisaca' && provincia === 'Belisario Boeto' ||
         this.myFormAsociaciones.value.ciudad === 'Tarija' && provincia === 'Aniceto Arce' ||
         this.myFormAsociaciones.value.ciudad === 'Pando' && provincia === 'Abuna' ||
         this.myFormAsociaciones.value.ciudad === 'Potosi' && provincia === 'Alonzo de Ibañez' ||
         this.myFormAsociaciones.value.ciudad === 'Beni' && provincia === 'Cercado') {

            this.caso_dir = 1;

            this.myFormAsociaciones = this.fb.group({
                nombre_asociacion: [formAux.nombre_asociacion, [Validators.required]],
                matricula_rema: [formAux.matricula_rema, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [formAux.provincia, [Validators.required]],
                direccion_tipo: [1],
                //municipio: [null, [Validators.required]],
                zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                //barrio: [null, [Validators.required]],
                //mz: [null, [Validators.required]],
                //uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [5]
            });

            formAux = null;
        }
        //Caso 2
        if (this.myFormAsociaciones.value.ciudad == 'Santa Cruz' && provincia == 'Andres Ibañez') {

            this.caso_dir = 2;

            this.myFormAsociaciones = this.fb.group({
                nombre_asociacion: [formAux.nombre_asociacion, [Validators.required]],
                matricula_rema: [formAux.matricula_rema, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [formAux.provincia, [Validators.required]],
                direccion_tipo: [2],
                //municipio: [null, [Validators.required]],
                //zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                barrio: [null, [Validators.required]],
                mz: [null, [Validators.required]],
                uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [5]
            });

            formAux = null;
        }
        //Caso 3
        if (this.myFormAsociaciones.value.ciudad === 'Santa Cruz' && provincia != 'Andres Ibañez' ||
         this.myFormAsociaciones.value.ciudad === 'La Paz' && provincia != 'Pedro Domingo Murillo' ||
         this.myFormAsociaciones.value.ciudad === 'La Paz-El Alto' && provincia != 'Pedro Domingo Murillo' ||
         this.myFormAsociaciones.value.ciudad === 'Cochabamba' && provincia != 'Arani' ||
         this.myFormAsociaciones.value.ciudad === 'Oruro' && provincia != 'Atahuallpa' ||
         this.myFormAsociaciones.value.ciudad === 'Chuquisaca' && provincia != 'Belisario Boeto' ||
         this.myFormAsociaciones.value.ciudad === 'Tarija' && provincia != 'Aniceto Arce' ||
         this.myFormAsociaciones.value.ciudad === 'Pando' && provincia != 'Abuna' ||
         this.myFormAsociaciones.value.ciudad === 'Potosi' && provincia != 'Alonzo de Ibañez' ||
         this.myFormAsociaciones.value.ciudad === 'Beni' && provincia != 'Cercado') {

            this.caso_dir = 3;

            this.myFormAsociaciones = this.fb.group({
                nombre_asociacion: [formAux.nombre_asociacion, [Validators.required]],
                matricula_rema: [formAux.matricula_rema, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [formAux.provincia, [Validators.required]],
                direccion_tipo: [3],
                municipio: [null, [Validators.required]],
                zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                //barrio: [null, [Validators.required]],
                //mz: [null, [Validators.required]],
                //uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [5]
            });

            formAux = null;
        }
        
    }

    //Para las clinicas o veterinarios
    setCiudad2(ciudad){
        console.log(ciudad);
        let index = this.ciudades.findIndex((item) => item.ciudad === ciudad);
        if(index !== -1){
            console.log(index);
            this.provincias2 = this.ciudades[index].provincias;

            //Seteo sin el formControlName en el html
            this.myFormClinicasVeterinarios.patchValue({ciudad : ciudad});
        }

        var formAux = Object.assign({},this.myFormClinicasVeterinarios.value);

        //Caso 1
        if (ciudad != 'Santa Cruz') {

            this.caso_dir2 = 1;

            this.myFormClinicasVeterinarios = this.fb.group({
                colegio_medico: [formAux.colegio_medico, [Validators.required]],
                matricula: [formAux.matricula, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [this.provincias2[0].provincia, [Validators.required]],
                direccion_tipo: [1],
                //municipio: [null, [Validators.required]],
                zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                //barrio: [null, [Validators.required]],
                //mz: [null, [Validators.required]],
                //uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [4]
            });

            formAux = null;
        }
        //Caso 2
        if (ciudad == 'Santa Cruz') {

            this.caso_dir2 = 2;

            this.myFormClinicasVeterinarios = this.fb.group({
                colegio_medico: [formAux.colegio_medico, [Validators.required]],
                matricula: [formAux.matricula, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [this.provincias2[0].provincia, [Validators.required]],
                direccion_tipo: [2],
                //municipio: [null, [Validators.required]],
                //zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                barrio: [null, [Validators.required]],
                mz: [null, [Validators.required]],
                uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [4]
            });

            formAux = null;
        }
        
    }

    setProvincia2(provincia){
        console.log(provincia);

        var formAux = Object.assign({},this.myFormClinicasVeterinarios.value);

        //console.log(formAux.cargo);

        //Caso 1
        if (this.myFormClinicasVeterinarios.value.ciudad === 'La Paz' && provincia === 'Pedro Domingo Murillo' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'La Paz-El Alto' && provincia === 'Pedro Domingo Murillo' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Cochabamba' && provincia === 'Arani' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Oruro' && provincia === 'Atahuallpa' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Chuquisaca' && provincia === 'Belisario Boeto' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Tarija' && provincia === 'Aniceto Arce' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Pando' && provincia === 'Abuna' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Potosi' && provincia === 'Alonzo de Ibañez' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Beni' && provincia === 'Cercado') {

            this.caso_dir2 = 1;

            this.myFormClinicasVeterinarios = this.fb.group({
                colegio_medico: [formAux.colegio_medico, [Validators.required]],
                matricula: [formAux.matricula, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [formAux.provincia, [Validators.required]],
                direccion_tipo: [1],
                //municipio: [null, [Validators.required]],
                zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                //barrio: [null, [Validators.required]],
                //mz: [null, [Validators.required]],
                //uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [4]
            });

            formAux = null;
        }
        //Caso 2
        if (this.myFormClinicasVeterinarios.value.ciudad == 'Santa Cruz' && provincia == 'Andres Ibañez') {

            this.caso_dir2 = 2;

            this.myFormClinicasVeterinarios = this.fb.group({
                colegio_medico: [formAux.colegio_medico, [Validators.required]],
                matricul: [formAux.matricula, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [formAux.provincia, [Validators.required]],
                direccion_tipo: [2],
                //municipio: [null, [Validators.required]],
                //zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                barrio: [null, [Validators.required]],
                mz: [null, [Validators.required]],
                uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [4]
            });

            formAux = null;
        }
        //Caso 3
        if (this.myFormClinicasVeterinarios.value.ciudad === 'Santa Cruz' && provincia != 'Andres Ibañez' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'La Paz' && provincia != 'Pedro Domingo Murillo' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'La Paz-El Alto' && provincia != 'Pedro Domingo Murillo' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Cochabamba' && provincia != 'Arani' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Oruro' && provincia != 'Atahuallpa' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Chuquisaca' && provincia != 'Belisario Boeto' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Tarija' && provincia != 'Aniceto Arce' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Pando' && provincia != 'Abuna' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Potosi' && provincia != 'Alonzo de Ibañez' ||
         this.myFormClinicasVeterinarios.value.ciudad === 'Beni' && provincia != 'Cercado') {

            this.caso_dir2 = 3;

            this.myFormClinicasVeterinarios = this.fb.group({
                colegio_medico: [formAux.colegio_medico, [Validators.required]],
                matricula: [formAux.matricula, [Validators.required]],
                ciudad: [formAux.ciudad, [Validators.required]],
                provincia: [formAux.provincia, [Validators.required]],
                direccion_tipo: [3],
                municipio: [null, [Validators.required]],
                zona: [null, [Validators.required]],
                av: [formAux.av, [Validators.required]],
                calle: [formAux.calle, [Validators.required]],
                nro: [formAux.nro, [Validators.required]],
                //barrio: [null, [Validators.required]],
                //mz: [null, [Validators.required]],
                //uv: [null, [Validators.required]],
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                email: [formAux.email, [Validators.required]],
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [4]
            });

            formAux = null;
        }
        
    }

    registrarAsociacion(){
        console.log(this.myFormAsociaciones.value);

        if (this.myFormAsociaciones.value.password != this.myFormAsociaciones.value.password_conf) {
            //alert('Las contraseñas no coinciden');
            //this.showNotification('bottom','right', 'danger', 'Las contraseñas no coinciden.');
            this.alertaService.showNotification('bottom','right', 'danger', 'Las contraseñas no coinciden.');
        }
        else{

            //Setear el user con el email
            this.myFormAsociaciones.patchValue({user : this.myFormAsociaciones.value.email});
  
            this.loading = true;

            console.log(this.myFormAsociaciones.value);
      
            this.http.post(this.rutaService.getRutaApi()+'trovanAPI/public/usuarios', this.myFormAsociaciones.value)
            .toPromise()
            .then(
              data => { // Success
                console.log(data);
                this.data=data;
                //this.showNotification('bottom','right', 'success', this.data.message);
                this.alertaService.showNotification('bottom','right', 'success', this.data.message);
                this.loading = false;

             },
              msg => { // Error

                console.log(msg)
                  //console.log(msg.error.error);
                  //alert('Error: '+msg.error.error);
                  //this.showNotification('bottom','right', 'danger', msg.error.error);
                  this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);
                  this.loading = false;
              }
            );
        }
    }

    registrarClinicaVeterinario(){
        console.log(this.myFormClinicasVeterinarios.value);

        if (this.myFormClinicasVeterinarios.value.password != this.myFormClinicasVeterinarios.value.password_conf) {
            //alert('Las contraseñas no coinciden');
            //this.showNotification('bottom','right', 'danger', 'Las contraseñas no coinciden.');
            this.alertaService.showNotification('bottom','right', 'danger', 'Las contraseñas no coinciden.');
        }
        else{

            //Setear el user con el email
            this.myFormClinicasVeterinarios.patchValue({user : this.myFormClinicasVeterinarios.value.email});
  
            this.loading = true;

            console.log(this.myFormClinicasVeterinarios.value);
      
            this.http.post(this.rutaService.getRutaApi()+'trovanAPI/public/usuarios', this.myFormClinicasVeterinarios.value)
            .toPromise()
            .then(
              data => { // Success
                console.log(data);
                this.data=data;
                //this.showNotification('bottom','right', 'success', this.data.message);
                this.alertaService.showNotification('bottom','right', 'success', this.data.message);
                this.loading = false;

             },
              msg => { // Error

                console.log(msg)
                  //console.log(msg.error.error);
                  //alert('Error: '+msg.error.error);
                  //this.showNotification('bottom','right', 'danger', msg.error.error);
                  this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);
                  this.loading = false;
              }
            );
        }
    }



}
