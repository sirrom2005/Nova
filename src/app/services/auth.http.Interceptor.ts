/*
* Plug and
*/
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Service } from './service.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor 
{
    constructor(private service:Service) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.endsWith("authenticate")){
            return next.handle(request);
        }

        var authToken = `Bearer ${this.service.getWebToken()}`;
        const authRequest = request.clone({
            setHeaders: {Authorization: authToken}
        });

        return next.handle(authRequest);
    }
}

export const AuthHttpInterceptorProvider = [ 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true
    }
]