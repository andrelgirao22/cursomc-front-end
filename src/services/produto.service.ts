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

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }

}