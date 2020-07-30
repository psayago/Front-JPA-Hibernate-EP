import { ProductoCompra } from './productoCompra'

export class Carrito {

    id: number;
    cliente: any;
    productos: Array<ProductoCompra>;
    total: number;
    fechaCreacion: string;
    tipoCarrito: TipoCarrito;

    constructor(id: number, cliente: any, productos: Array<any>, total: number, fechaCreacion: string) {
        this.id = id;
        this.cliente = cliente;
        this.productos = productos;
        this.total = total;
        this.fechaCreacion = fechaCreacion;
        this.tipoCarrito = TipoCarrito.COMUN;
    }
}

export enum TipoCarrito {
    COMUN ,
    PROMOCIONABLE,
    VIP 
}

