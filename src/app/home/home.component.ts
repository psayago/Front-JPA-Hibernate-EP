import { Component, OnInit } from '@angular/core';
import { TraerDelBackService } from '../service/traer-del-back.service';
import { Carrito, TipoCarrito } from '../models/carrito'
import { ProductoCompra } from '../models/productoCompra';
import { MyDatabaseService } from '../service/my-database.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    public clientes: Array<any> = [];
    public productos: Array<any> = [];
    public urlClientes: string = 'api/getAllClientes';
    public urlProductos: string = 'api/getAllProductos';
    public fechaActual: Date;
    public carrito: Carrito;
    public clienteSeleccionado;
    public cantidadTotalProductos: number;
    public descuento: number = 0;

    events: string[] = [];

    constructor(private traerDelBack: TraerDelBackService,
        private myDB: MyDatabaseService) { }

    ngOnInit(): void {
        this.traerClientes().then(res => {
            this.traerProductos()
        }).then(response => {
            this.myDB.carritos.toArray().then(rsp => {
                if (rsp != [] || rsp[0] == null) {
                    this.carrito = rsp[0];
                    this.fechaActual = this.carrito.fechaCreacion;
                    this.clienteSeleccionado = this.carrito.cliente;
                    console.log(this.carrito.fechaCreacion);

                } else {
                    this.carrito = new Carrito(1, {}, [], 0, this.fechaActual);
                    this.myDB.carritos.add(this.carrito);
                }
            });

        });

    }

    pressButton() {
        console.log(this.carrito);
    }

    mostrarCarrito() {
        //return this.clienteSeleccionado != null && this.carrito.productos.length > 0;
        return true
    }

    cargarProducto(product: any) {
        debugger;
        this.carrito.cliente = this.clienteSeleccionado;
        const lista = this.carrito.productos;
        if (this.yaExisteEnLista(product, lista)) {
            lista.find(element => element.id == product.id).cantidad++;
        } else {
            lista.push(new ProductoCompra(product.id, product.nombre, 1, product.precio));
        }
        this.carrito.fechaCreacion = this.fechaActual;
        this.calcularTotalesCarrito(this.carrito);
        this.myDB.carritos.put(this.carrito);
        console.log("mostrar db");
        this.myDB.carritos.toArray().then(res => console.log(res));

    }

    yaExisteEnLista(product: any, lista: Array<ProductoCompra>) {
        return lista.some(item => item.id == product.id);
    }

    calcularTotalesCarrito(carrito: Carrito) {
        const lista = carrito.productos;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let sumaParcial = lista.map(elem => elem.cantidad * elem.precio).reduce(reducer);
        carrito.total = sumaParcial;

        this.cantidadTotalProductos = lista.map(elem => elem.cantidad).reduce(reducer);
        this.calcularDescuentos();
    }

    public calcularDescuentos() {
        if (5 < this.cantidadTotalProductos && this.cantidadTotalProductos <= 10) {
            this.descuento = this.carrito.total * 0.90;
        } else if (10 < this.cantidadTotalProductos) {
            switch (this.carrito.tipoCarrito) {
                case TipoCarrito.COMUN:
                    this.descuento = 200.00;
                    console.log("descuento $200");
                    break;
                case TipoCarrito.PROMOCIONABLE:
                    this.descuento = 500.00;
                    console.log("descuento $500");
                    break;

                case TipoCarrito.VIP:
                    console.log("descuento $500");
                    break;

                default: break;
            }
        }
    }

    async traerClientes() {
        await this.traerDelBack.peticion(this.urlClientes).subscribe(
            response => {
                this.clientes = response;
            },
            error => {
                console.error("Hubo un error");
            });
    }

    async traerProductos() {
        await this.traerDelBack.peticion(this.urlProductos).subscribe(
            response => {
                this.productos = response;
            },
            error => {
                console.error("Hubo un error");
            });
    }


}
