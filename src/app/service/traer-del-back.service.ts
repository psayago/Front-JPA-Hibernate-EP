import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class TraerDelBackService {

    constructor(private http: HttpClient) { }

    public peticion(url: string): any {
        return this.http.get(url);
    }

}
