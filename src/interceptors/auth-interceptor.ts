import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let localUser = this.storage.getLocalUser()
        let N = API_CONFIG.baseUrl.length
        console.log(req.url) 
        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseUrl
        console.log('auth interceptor')
        if(localUser && requestToApi && localUser.token) {
            const authReq = 
                req.clone({headers: req.headers.append('Authorization', `Bearer ${localUser.token}`)});
            return next.handle(authReq)
        } else {
            return next.handle(req)
        }
            
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}