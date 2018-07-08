import { EstadoDto } from './../model/estado.dto';
import { API_CONFIG } from './../config/api.config';
import { CidadeDto } from './../model/cidade.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class EstadoService {

    constructor(public http : HttpClient) {}

    findAll(): Observable<EstadoDto[]> {
        return this.http.get<EstadoDto[]>(`${API_CONFIG.baseUrl}/estados`)
    }

}