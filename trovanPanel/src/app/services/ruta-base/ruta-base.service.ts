import { Injectable } from '@angular/core';

@Injectable()
export class RutaBaseService {

  //Local
  //public api_base = 'http://localhost/gitHub/proyectoTrovan/';
  //public images_base = 'http://localhost/gitHub/proyectoTrovan/images_uploads/';

  //Remoto
  public api_base = 'http://trovan.internow.com.mx/';
  public images_base = 'http://trovan.internow.com.mx/images_uploads/';

  constructor() { }

  getRutaApi(){
  	return this.api_base;
  }

  getRutaImages(){
  	return this.images_base;
  }

}
