import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';



const routes: Routes = [
    { path: 'index', component: IndexComponent},
    { path: 'home', component: HomeComponent },
    { path: 'admin', pathMatch: 'prefix', loadChildren: './modulos/administracion/administracion.module#AdministracionModule'},
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
