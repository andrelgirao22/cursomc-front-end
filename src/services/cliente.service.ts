import { API_CONFIG } from './../config/api.config';
import { ClienteDto } from './domain/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient, private storage: StorageService) {}

    findByEmail(email: string) :Observable<ClienteDto> {
        let token = this.storage.getLocalUser().token
        let authHeader = new HttpHeaders({'Authorization': `Bearer ${token}`})
        //localhost:8080/clientes/email?email=andrelgirao22@hotmail.com
        let url = `${API_CONFIG.baseUrl}/clientes/email?email=${email}`
        console.log('url', url)
        return this.http.get<ClienteDto>(url, {headers: authHeader}
        )
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'})
    }

}