import { API_CONFIG } from './../config/api.config';
import { ClienteDto } from '../model/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient) {}

    findByEmail(email: string) {
        let url = `${API_CONFIG.baseUrl}/clientes/email?email=${email}`
        return this.http.get(url)
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }

    insert(obj: ClienteDto) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, {
            observe: 'response',
            responseType: 'text'
        })
    }

}