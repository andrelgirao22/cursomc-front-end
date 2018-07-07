import { LocalUser } from './../model/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../model/credenciais.dto';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

import { JwtHelper } from 'angular2-jwt'

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper()

    constructor(
        private http: HttpClient,
        private storageService: StorageService) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds, 
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {}, 
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    successfulLogin(authorizationValue: string) {
        console.log('authorization', authorizationValue)
        let token = authorizationValue.substring(7)
        let user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storageService.setLocalUser(user)
    }

    logout() {
        this.storageService.setLocalUser(null)
    }

}