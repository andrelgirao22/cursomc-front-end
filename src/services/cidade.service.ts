import { API_CONFIG } from './../config/api.config';
import { CidadeDto } from './../model/cidade.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class CidadeService {

    constructor(public http : HttpClient) {}

    findAll(estadoId: string): Observable<CidadeDto[]> {
        return this.http.get<CidadeDto[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`)
    }

}