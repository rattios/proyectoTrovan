import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { RutaBaseService } from '../services/ruta-base/ruta-base.service';
import { AlertaService } from '../services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';


declare var $:any;
declare var swal:any;

@Component({
    moduleId: module.id,
    selector: 'agregarPaciente-cmp',
    templateUrl: 'agregarPaciente.component.html',
    styleUrls : ['agregarPaciente.css']
})

export class AgregarPacienteComponent implements OnInit, AfterViewInit{

    //Selectores
    public especies = [];
    public razas = [];
    public posImplantes = [];

    private data:any;
    public loading = false;
    public eligiendoPropietario = true;
    public creandoPropietario = false;
    public creandoAnimal = false;
    public propietario = null;
    public propietario_ci = null;
    public animal = null;

    //Modal automatica
    @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
    public isModalShown:boolean = false;

    public showModal():void {
    this.isModalShown = true;
    }

    public hideModal():void {
    this.autoShownModal.hide();
    }

    public onHidden():void {
    this.isModalShown = false;
    }

    //Formularios
    myFormPropietarios: FormGroup;
    myFormAnimales: FormGroup;

    public ciudades:any;
    public provincias:any;

    //Casos 1 por defecto para las direcciones
    public caso_dir = 1;

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

        //Caso 1 por defecto
        this.myFormPropietarios = this.fb.group({
            nombre: [null, [Validators.required]],
            apellido_paterno: [null, [Validators.required]],
            apellido_materno: [null],
            ci: [null, [Validators.required]],
            exp: ['LP', [Validators.required]],
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
            telefono: [null, [Validators.required]],
            celular_1: [null, [Validators.required]],
            celular_2: [null],
            email: [null, [Validators.required]],
            user: [null],
            password: [null, [Validators.required]],
            password_conf: [null, [Validators.required]],
            tipo_usuario: [6]
        });

        console.log(this.ciudades[0].provincias[0].provincia);
        console.log(this.myFormPropietarios.value.provincia);

        this.myFormAnimales = this.fb.group({
            foto: [null],
            propietario_id: [null],
            propietario_nombre: [{value: null, disabled: true}],
            veterinario_id: [1],
            nombre_animal: [null, [Validators.required]],
            f_nacimiento: [null, [Validators.required]],
            edad: [null, [Validators.required]],
            especie_id: [null, [Validators.required]],
            genero: ['Macho', [Validators.required]],
            raza_id: [null, [Validators.required]],
            peso: [null, [Validators.required]],
            altura: [null, [Validators.required]],
            pelaje: [null, [Validators.required]],
            color_ojos: [null, [Validators.required]],
            temperamento: [null, [Validators.required]],
            tatuaje: ['Si', [Validators.required]],
            pediegree: ['Si', [Validators.required]],
            esterilizado: ['Si', [Validators.required]],
            f_ult_vacuna: [null],
            tipo_ult_vacuna: [null],
            marca_ult_vacuna: [null],
            origen_ult_vacuna: [null],
            microchip: [null, [Validators.required]],
            tipo_microchip: ['Trovan Unique', [Validators.required]],
            posicion_implante_id: [null, [Validators.required]],
            otros_rasgos: [null],
            madre_id: [null],
            padre_id: [null]
        });

    }

    ngOnInit(){

        this.setSelectoresAnimal();

        // // Init Tags Input
        if($(".tagsinput").length != 0){
            $(".tagsinput").tagsinput();
        }
        
        $('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
         });

    }

    ngAfterViewInit(){
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    setSelectoresAnimal(){

        this.loading = true;
        this.http.get(this.rutaService.getRutaApi()+'trovanAPI/public/animales/especies/razas/posImplantes?token='+localStorage.getItem('trovan_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.especies = this.data.especies;
             this.razas = this.data.razas;
             this.posImplantes = this.data.posImplantes;


             this.loading = false;

             if (this.especies.length == 0) {
                this.alertaService.showNotification('bottom','right', 'info', 'No hay especies disponibles para la creación de animales.');
             }
             if (this.razas.length == 0) {
                this.alertaService.showNotification('bottom','right', 'info', 'No hay razas disponibles para la creación de animales.');
             }
             if (this.posImplantes.length == 0) {
                this.alertaService.showNotification('bottom','right', 'info', 'No hay posiciones de implante disponibles para la creación de animales.');
             }

            
             if (this.especies.length > 0) {
                this.myFormAnimales.patchValue({especie_id : this.especies[0].id});             
             }
             if (this.razas.length > 0) {
                this.myFormAnimales.patchValue({raza_id : this.razas[0].id});
             }
             if (this.posImplantes.length > 0) {
                this.myFormAnimales.patchValue({posicion_implante_id : this.posImplantes[0].id});
             }
           },
           msg => { // Error
             console.log(msg);
             console.log(msg.error.error);

             this.loading = false;

             //token invalido/ausente o token expiro
             if(msg.status == 400 || msg.status == 401){ 
                  //alert(msg.error.error);
                  //ir a login

                  this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);
                  setTimeout(()=>{this.router.navigate(['pages']);},2000);

              }
           }
         );

    }

    buscarPropietario(){
        this.loading = true;
        this.http.get(this.rutaService.getRutaApi()+'trovanAPI/public/usuarios/propietario/'+this.propietario_ci+'?token='+localStorage.getItem('trovan_token'))
         .toPromise()
         .then(
           data => { // Success
             console.log(data);
             this.data=data;
             this.propietario = this.data.usuario;
             if (!this.propietario.apellido_materno) {
                this.propietario.apellido_materno = '';
             }
             this.myFormAnimales.patchValue({propietario_id : this.propietario.id});
             this.myFormAnimales.patchValue({propietario_nombre : this.propietario.nombre+' '+this.propietario.apellido_paterno+' '+this.propietario.apellido_materno}); 
             this.loading = false;

             //this.showSwal('success-message', this.propietario);
             this.showModal();


           },
           msg => { // Error
             console.log(msg);
             console.log(msg.error.error);

             this.loading = false;

             //token invalido/ausente o token expiro
             if(msg.status == 400 || msg.status == 401){ 
                  //alert(msg.error.error);
                  //ir a login

                  this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);
                  setTimeout(()=>{this.router.navigate(['pages']);},2000);

              }
              //propietario no encontrado
              else if(msg.status == 404){ 
                  //alert(msg.error.error);

                  this.alertaService.showNotification('bottom','right', 'info', msg.error.error);

              }
              

           }
         );
    }

    showSwal  (type, propietario){
        if (!propietario.apellido_materno) {
            propietario.apellido_materno = '';
        }

        if(type == 'success-message'){
            swal({
                type: "success",
                title: "Propietario!",
                text: "",
                showCancelButton: true,
                confirmButtonText: 'ok',
                cancelButtonText: 'Cancelar',
                confirmButtonClass: "btn btn-success",
                cancelButtonClass: "btn btn-danger",
                buttonsStyling: false,
                html:
                    '<b>Nombre:</b> '+propietario.nombre+' '+propietario.apellido_paterno+' '+propietario.apellido_materno+'<br />'+
                    '<b>Cédula:</b> '+propietario.ci


            })
            .then(function() {
                  console.log('elegido');
                  
                }, function(dismiss) {
                  // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                  if (dismiss === 'overlay' || dismiss === 'cancel' || dismiss === 'close' || dismiss === 'esc') {
                    console.log('cancelado');
                  
                  }
            })

        }
    }

    showBusqueda(){
        this.eligiendoPropietario = true;
        this.creandoPropietario = false;
        this.creandoAnimal = false;
    }

    showFormPropietario(){
        this.eligiendoPropietario = false;
        this.creandoPropietario = true;
        this.creandoAnimal = false;
    }

    showFormAnimal(){
        this.eligiendoPropietario = false;
        this.creandoPropietario = false;
        this.creandoAnimal = true;
    }

    setCiudad(ciudad){
        console.log(ciudad);
        let index = this.ciudades.findIndex((item) => item.ciudad === ciudad);
        if(index !== -1){
            console.log(index);
            this.provincias = this.ciudades[index].provincias;

            //Seteo sin el formControlName en el html
            this.myFormPropietarios.patchValue({ciudad : ciudad});
        }

        var formAux = Object.assign({},this.myFormPropietarios.value);

        //Caso 1
        if (ciudad != 'Santa Cruz') {

            this.caso_dir = 1;

            this.myFormPropietarios = this.fb.group({
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                ci: [formAux.ci, [Validators.required]],
                exp: [formAux.exp, [Validators.required]],
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
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                email: [formAux.email, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [6]
            });

            formAux = null;
        }
        //Caso 2
        if (ciudad == 'Santa Cruz') {

            this.caso_dir = 2;

            this.myFormPropietarios = this.fb.group({
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                ci: [formAux.ci, [Validators.required]],
                exp: [formAux.exp, [Validators.required]],
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
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                email: [formAux.email, [Validators.required]],
                celular_2: [formAux.celular_2],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [6]
            });

            formAux = null;
        }
        
    }

    setProvincia(provincia){
        console.log(provincia);

        var formAux = Object.assign({},this.myFormPropietarios.value);

        //console.log(formAux.cargo);

        //Caso 1
        if (this.myFormPropietarios.value.ciudad === 'La Paz' && provincia === 'Pedro Domingo Murillo' ||
         this.myFormPropietarios.value.ciudad === 'La Paz-El Alto' && provincia === 'Pedro Domingo Murillo' ||
         this.myFormPropietarios.value.ciudad === 'Cochabamba' && provincia === 'Arani' ||
         this.myFormPropietarios.value.ciudad === 'Oruro' && provincia === 'Atahuallpa' ||
         this.myFormPropietarios.value.ciudad === 'Chuquisaca' && provincia === 'Belisario Boeto' ||
         this.myFormPropietarios.value.ciudad === 'Tarija' && provincia === 'Aniceto Arce' ||
         this.myFormPropietarios.value.ciudad === 'Pando' && provincia === 'Abuna' ||
         this.myFormPropietarios.value.ciudad === 'Potosi' && provincia === 'Alonzo de Ibañez' ||
         this.myFormPropietarios.value.ciudad === 'Beni' && provincia === 'Cercado') {

            this.caso_dir = 1;

            this.myFormPropietarios = this.fb.group({
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                ci: [formAux.ci, [Validators.required]],
                exp: [formAux.exp, [Validators.required]],
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
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                email: [formAux.email, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [6]
            });

            formAux = null;
        }
        //Caso 2
        if (this.myFormPropietarios.value.ciudad == 'Santa Cruz' && provincia == 'Andres Ibañez') {

            this.caso_dir = 2;

            this.myFormPropietarios = this.fb.group({
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                ci: [formAux.ci, [Validators.required]],
                exp: [formAux.exp, [Validators.required]],
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
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                email: [formAux.email, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [6]
            });

            formAux = null;
        }
        //Caso 3
        if (this.myFormPropietarios.value.ciudad === 'Santa Cruz' && provincia != 'Andres Ibañez' ||
         this.myFormPropietarios.value.ciudad === 'La Paz' && provincia != 'Pedro Domingo Murillo' ||
         this.myFormPropietarios.value.ciudad === 'La Paz-El Alto' && provincia != 'Pedro Domingo Murillo' ||
         this.myFormPropietarios.value.ciudad === 'Cochabamba' && provincia != 'Arani' ||
         this.myFormPropietarios.value.ciudad === 'Oruro' && provincia != 'Atahuallpa' ||
         this.myFormPropietarios.value.ciudad === 'Chuquisaca' && provincia != 'Belisario Boeto' ||
         this.myFormPropietarios.value.ciudad === 'Tarija' && provincia != 'Aniceto Arce' ||
         this.myFormPropietarios.value.ciudad === 'Pando' && provincia != 'Abuna' ||
         this.myFormPropietarios.value.ciudad === 'Potosi' && provincia != 'Alonzo de Ibañez' ||
         this.myFormPropietarios.value.ciudad === 'Beni' && provincia != 'Cercado') {

            this.caso_dir = 3;

            this.myFormPropietarios = this.fb.group({
                nombre: [formAux.nombre, [Validators.required]],
                apellido_paterno: [formAux.apellido_paterno, [Validators.required]],
                apellido_materno: [formAux.apellido_materno],
                ci: [formAux.ci, [Validators.required]],
                exp: [formAux.exp, [Validators.required]],
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
                telefono: [formAux.telefono, [Validators.required]],
                celular_1: [formAux.celular_1, [Validators.required]],
                celular_2: [formAux.celular_2],
                email: [formAux.email, [Validators.required]],
                user: [formAux.user],
                password: [formAux.password, [Validators.required]],
                password_conf: [formAux.password_conf, [Validators.required]],
                tipo_usuario: [5]
            });

            formAux = null;
        }
        
    }

    registrarPropietario(){
        console.log(this.myFormPropietarios.value);

        if (this.myFormPropietarios.value.password != this.myFormPropietarios.value.password_conf) {
            this.alertaService.showNotification('bottom','right', 'danger', 'Las contraseñas no coinciden.');
        }
        else{

            //Setear el user con el email
            this.myFormPropietarios.patchValue({user : this.myFormPropietarios.value.email});
  
            this.loading = true;

            //console.log(this.myFormPropietarios.value);
      
            this.http.post(this.rutaService.getRutaApi()+'trovanAPI/public/usuarios', this.myFormPropietarios.value)
            .toPromise()
            .then(
              data => { // Success
                console.log(data);
                this.data=data;
                //this.showNotification('bottom','right', 'success', this.data.message);
                this.alertaService.showNotification('bottom','right', 'success', this.data.message);

                this.propietario = this.data.usuario;
                if (!this.propietario.apellido_materno) {
                    this.propietario.apellido_materno = '';
                 }
                this.myFormAnimales.patchValue({propietario_id : this.propietario.id});
                this.myFormAnimales.patchValue({propietario_nombre : this.propietario.nombre+' '+this.propietario.apellido_paterno+' '+this.propietario.apellido_materno}); 
                console.log(this.propietario);

                this.loading = false;

                this.showFormAnimal();

             },
              msg => { // Error
                console.log(msg);
                console.log(msg.error.error);

                this.loading = false;

                //token invalido/ausente o token expiro
                if(msg.status == 400 || msg.status == 401){ 
                     //alert(msg.error.error);
                     //ir a login

                     this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);
                     setTimeout(()=>{this.router.navigate(['pages']);},2000);

                }
                //propietario no creado
                else { 
                    //alert(msg.error.error);

                    this.alertaService.showNotification('bottom','right', 'danger', msg.error.error);

                }
              }
            );
        }
    }



}
