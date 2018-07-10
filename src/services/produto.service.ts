import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {}

    findByCategoria(categoriaId: string): Observable<any> {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}`)
    }

}