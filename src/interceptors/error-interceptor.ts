import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('error interceptor')
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error
                if(errorObj.error) {
                    errorObj = errorObj.error
                }

                if(!errorObj.status) {
                    errorObj = JSON.parse(errorObj)
                }

                console.log('erro detectado pelo interceptor')
                console.log(errorObj)
                return Observable.throw(errorObj)
            }) as any
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}