import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BackService } from './service/back.service';
import { MyDatabaseService } from './service/my-database.service'
import { FormsModule } from '@angular/forms';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import Dexie from 'dexie';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AdministracionModule } from './modulos/administracion/administracion.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TablaProductosComponent,
        CarritoComponent,
        MenuComponent,
        IndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        AdministracionModule,
        MatFormFieldModule
    ],
    providers: [BackService, MyDatabaseService],
    bootstrap: [AppComponent]
})
export class AppModule { }
