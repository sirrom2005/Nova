/*
* Plug and play
*/
import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

        return next.handle(authRequest)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 500) {
                    this.service.sessionExpireLogout();
                }
                if(error.status === 403) {
                    this.service.forbiddenLogout();
                }
                return throwError(error);
            })
        );
    }
}

export const AuthHttpInterceptorProvider = [ 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true
    }
]