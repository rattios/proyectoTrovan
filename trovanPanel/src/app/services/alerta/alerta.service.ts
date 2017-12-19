import { Injectable } from '@angular/core';

declare var $:any;

@Injectable()
export class AlertaService {

  constructor() { }

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

}
