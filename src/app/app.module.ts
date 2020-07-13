import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TraerDelBackService } from './service/traer-del-back.service';
import { MyDatabaseService } from './service/my-database.service'
import { FormsModule } from '@angular/forms';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import Dexie from 'dexie';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TablaProductosComponent,
        CarritoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [TraerDelBackService, MyDatabaseService],
    bootstrap: [AppComponent]
})
export class AppModule { }
