import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Carrito } from '../models/carrito';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

    @Input() carrito: Carrito;
    @Input() descuento: number;

    constructor() { }

    ngOnInit(): void {

    }

}
