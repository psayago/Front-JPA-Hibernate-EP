import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Carrito } from '../models/carrito';

@Injectable()
export class MyDatabaseService extends Dexie {
    carritos: Dexie.Table<Carrito, number>

    constructor() {
        super('MyDatabaseService');
        this.version(1).stores({
            carritos: '++id, clientes, productos, total, fechaCreacion'
        });
    }
}

