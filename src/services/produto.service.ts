import { ProdutoDto } from './../model/produto.dto';
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

    findById(produto_id: string) {
        return this.http.get<ProdutoDto>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`)
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }

}