import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { AgregarPacienteComponent } from './agregarPaciente.component';
import { AgregarPacienteRoutes } from './agregarPaciente.routing';

//mis imports
//import { LoadingModule } from 'ngx-loading';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
    	ModalModule.forRoot(),
	    LoadingModule.forRoot({
	        animationType: ANIMATION_TYPES.circleSwish,
	        backdropBackgroundColour: 'rgba(0,0,0,0.3)', 
	        backdropBorderRadius: '4px',
	        primaryColour: '#ffffff', 
	        secondaryColour: '#ffffff', 
	        tertiaryColour: '#ffffff',
	        fullScreenBackdrop: true
	    }),
        RouterModule.forChild(AgregarPacienteRoutes),
        CommonModule,
        FormsModule,
    	ReactiveFormsModule
    ],
    declarations: [AgregarPacienteComponent]
})

export class AgregarPacienteModule {}
