import { API_CONFIG } from './../config/api.config';
import { ClienteDto } from './domain/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient) {}

    findByEmail(email: string) :Observable<ClienteDto> {
        let url = `${API_CONFIG.baseUrl}/clientes/email?email=${email}`
        return this.http.get<ClienteDto>(url)
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }

}