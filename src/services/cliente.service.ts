import { API_CONFIG } from './../config/api.config';
import { ClienteDto } from '../model/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';
import { ImageUtilService } from './Image-util.service';

@Injectable()
export class ClienteService {

    constructor(
        private http: HttpClient,
        private imageUtilService: ImageUtilService) {}

    findByEmail(email: string) {
        let url = `${API_CONFIG.baseUrl}/clientes/email?email=${email}`
        return this.http.get(url)
    }

    findById(id: string) {
        let url = `${API_CONFIG.baseUrl}/clientes/${id}`
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

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture)

        let formData: FormData = new FormData()
        formData.append('file', pictureBlob, 'file.png')
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData, {
            observe: 'response',
            responseType: 'text'
        })
    }

}