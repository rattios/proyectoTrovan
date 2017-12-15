import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { AgregarPacienteComponent } from './agregarPaciente.component';
import { AgregarPacienteRoutes } from './agregarPaciente.routing';

@NgModule({
    imports: [
        RouterModule.forChild(AgregarPacienteRoutes),
        CommonModule,
        FormsModule
    ],
    declarations: [AgregarPacienteComponent]
})

export class AgregarPacienteModule {}
