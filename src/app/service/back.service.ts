import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class BackService {

    constructor(private http: HttpClient) { }

    public peticionGet(url: string): any {
        return this.http.get(url);
    }

    public peticionPost(url: string, obj : any): any {
        return this.http.post(url,obj);
    }

}
