import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConstants } from '@core/constants';

export const CSRF = new HttpContextToken(() => '1');

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.headers.has(HttpConstants.CSRF))
            return next.handle(request);

        const csrfRequest = request.clone({
            headers: request.headers.set(HttpConstants.CSRF, request.context.get(CSRF))
        });

        return next.handle(csrfRequest);
    }
}


