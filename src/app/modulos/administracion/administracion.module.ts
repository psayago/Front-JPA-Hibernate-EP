import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarClienteComponent } from './componentes/registrar-cliente/registrar-cliente.component';
import { RegistrarProductoComponent } from './componentes/registrar-producto/registrar-producto.component';

const ruta: Routes =[
  { path: 'register-cliente', component: RegistrarClienteComponent },
  { path: 'register-producto', component: RegistrarProductoComponent }
]

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  RouterModule.forChild(ruta)
  ]
})
export class AdministracionModule { }
