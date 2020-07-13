import { ProductoCompra } from './productoCompra'

export class Carrito {

    id: number;
    cliente: any;
    productos: Array<ProductoCompra>;
    total: number;
    fechaCreacion: Date;
    tipoCarrito: TipoCarrito;

    constructor(id: number, cliente: any, productos: Array<any>, total: number, fechaCreacion: Date) {
        this.id = id;
        this.cliente = cliente;
        this.productos = productos;
        this.total = total;
        this.fechaCreacion = fechaCreacion;
        this.tipoCarrito = TipoCarrito.COMUN;
    }
}

export enum TipoCarrito {
    COMUN = "comun",
    PROMOCIONABLE = "promocionable",
    VIP = "vip"
}

