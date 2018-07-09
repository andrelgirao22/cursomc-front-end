import { FieldMessage } from './../model/fieldmessage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService, private alertCtrl: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
                console.log('erro status',errorObj.status)

                switch(errorObj.status) {
                    case 401: this.handle401(); break;
                    case 403: this.handle403(); break;
                    case 422: this.handle422(errorObj); break;
                    default: this.handleDefautlError(errorObj);
                }


                return Observable.throw(errorObj)
            }) as any
    }

    handle401() {
        console.log('erro 401')
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [{text : 'Ok'}]
        })

        alert.present()

    }

    handle403() {
        this.storage.setLocalUser(null)
    }

    handle422(erroObj) {
        console.log('tt')
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Erro de Validação',
            message: this.listErrors(erroObj.errors),
            enableBackdropDismiss: false,
            buttons: [{text : 'Ok'}]
        })

        alert.present()
    }

    handleDefautlError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro' +  errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{text : 'Ok'}]
        })

        alert.present()
    }

    private listErrors(messages: FieldMessage[]): string {
        let s: string = ''
        for(let i=0; i< messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>:' + messages[i].message + "</p>"
        }
        return s
    }
    
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}