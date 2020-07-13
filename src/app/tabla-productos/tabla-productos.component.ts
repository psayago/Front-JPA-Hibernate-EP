import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
    selector: 'app-tabla-productos',
    templateUrl: './tabla-productos.component.html',
    styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {

    @Input() listaProductos: Array<any>;
    @Output() producto = new EventEmitter<Object>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public cargarEnCarrito(producto: any) {
        this.producto.emit(producto)
        console.log(this.producto);

    }

}
