export class ProductoCompra {

    id: number;
    nombre: string;
    cantidad: number;
    precio: number;

    constructor(id: number, nombre: string, cantidad: number, precio: number) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

}