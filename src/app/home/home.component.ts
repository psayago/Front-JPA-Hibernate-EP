import { Component, OnInit } from '@angular/core';
import { BackService } from '../service/back.service';
import { Carrito, TipoCarrito } from '../models/carrito';
import { ProductoCompra } from '../models/productoCompra';
import { MyDatabaseService } from '../service/my-database.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public clientes: Array<any> = [];
  public productos: Array<any> = [];
  public urlClientes: string = 'api/getAllClientes';
  public urlProductos: string = 'api/getAllProductos';
  public urlConfirmarVenta: string = 'api/confirmarVenta';
  public fechaActual: string;
  public carrito: Carrito;
  public clienteSeleccionado: Object;
  public cantidadTotalProductos: number;
  public descuento: number = 0;
  public showCarrito: boolean = false;

  events: string[] = [];

  constructor(
    private httpservice: BackService,
    private myDB: MyDatabaseService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.traerClientes()
      .then((res) => {
        this.clientes = res;
        this.clienteSeleccionado = this.clientes[0];
        this.fechaActual = (new Date()).toISOString().slice(0,10);//.toLocaleDateString().split(" ")[0].split("/").reverse().join("-");
        this.carrito = new Carrito(1, this.clienteSeleccionado, [], 0, this.fechaActual);  

        this.traerProductos().then((response) => {
            this.productos = response;
            
            this.myDB.carritos.toArray().then((rsp) => {
              if (rsp != [] && rsp[0] != null) {
                this.carrito = rsp[0];
                this.fechaActual = this.carrito.fechaCreacion;
                this.clienteSeleccionado = this.clientes.find(elem => elem.id == this.carrito.cliente.id);
                console.log(this.carrito.fechaCreacion);
              } else {   
                this.myDB.carritos.add(this.carrito);
              }
            });;
      })
      
      });
  }

  pressButton() {
    console.log(this.carrito);
  }

  mostrarCarrito() {
    if (
      this.carrito &&
      this.carrito.productos &&
      this.clienteSeleccionado &&
      this.carrito.productos.length > 0
    ) {
      this.showCarrito = true;
    }

    return this.showCarrito;
  }

  cargarProducto(product: any) {
    //debugger;
    this.carrito.cliente = this.clienteSeleccionado;
    const lista = this.carrito.productos;
    if (this.yaExisteEnLista(product, lista)) {
      lista.find((element) => element.id == product.id).cantidad++;
    } else {
      lista.push(
        new ProductoCompra(product.id, product.nombre, 1, product.precio)
      );
    }
    this.carrito.fechaCreacion = this.fechaActual;
    this.calcularTotalesCarrito(this.carrito);
    this.myDB.carritos.put(this.carrito);
    console.log('mostrar db');
    this.myDB.carritos.toArray().then((res) => console.log(res));
  }

  yaExisteEnLista(product: any, lista: Array<ProductoCompra>) {
    return lista.some((item) => item.id == product.id);
  }

  calcularTotalesCarrito(carrito: Carrito) {
    const lista = carrito.productos;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let sumaParcial = lista
      .map((elem) => elem.cantidad * elem.precio)
      .reduce(reducer);
    carrito.total = sumaParcial;

    this.cantidadTotalProductos = lista
      .map((elem) => elem.cantidad)
      .reduce(reducer);
    this.calcularDescuentos();
  }

  public calcularDescuentos() {
    if (5 < this.cantidadTotalProductos && this.cantidadTotalProductos <= 10) {
      this.descuento = this.carrito.total * 0.9;
    } else if (10 < this.cantidadTotalProductos) {
      switch (this.carrito.tipoCarrito) {
        case TipoCarrito.COMUN:
          this.descuento = 200.0;
          console.log('descuento $200');
          break;
        case TipoCarrito.PROMOCIONABLE:
          this.descuento = 500.0;
          console.log('descuento $500');
          break;

        case TipoCarrito.VIP:
          console.log('descuento $500');
          break;

        default:
          break;
      }
    }
  }

  confirmarCompra(){
    const promesa = new Promise((resolve,reject) =>{

      this.httpservice.peticionPost(this.urlConfirmarVenta,this.carrito).subscribe(
        response => {
          resolve(response);  
        },
        error => {
          console.error('Hubo un error');
          console.error(error);
          reject(error);
        }
      );
    });
    promesa.then(resp => {
      this.myDB.carritos.clear().then(res=> this.router.navigate(['/*']))
    });

  }

  traerClientes(): Promise<any> {
    return new Promise((resolver, rechazar) => {
        console.log('Inicial');
        this.httpservice.peticionGet(this.urlClientes).subscribe(
          (response) => {
            resolver(response);
            // this.clientes = response;
            // this.clienteSeleccionado = this.clientes[0];
            // this.fechaActual = (new Date()).toISOString().slice(0,10);//.toLocaleDateString().split(" ")[0].split("/").reverse().join("-");
            // console.log(this.fechaActual);        
    
          },
          (error) => {
            rechazar(error)
            console.error('Hubo un error');
          }
        );
    })
  }

  traerProductos() : Promise<any>{
    return new Promise((resolver, rechazar) => {
        this.httpservice.peticionGet(this.urlProductos).subscribe(
          (response) => {
            resolver(response);
          },
          (error) => {
            rechazar(error);
            console.error('Hubo un error');
          }
        );
    })
  }
}
