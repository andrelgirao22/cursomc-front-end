import { API_CONFIG } from './../config/api.config';
import { PedidoDto } from './../model/pedido.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class PedidoService {

    constructor(private http: HttpClient) {}

    insert(obj: PedidoDto) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj, {observe: 'response', responseType: 'text'}
        )
    }
}