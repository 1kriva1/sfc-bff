import { HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConstants } from '@core/constants';

export const INCLUDE = new HttpContextToken<string[]>(() => []);

@Injectable()
export class IncludeInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const include: string[] = req.context.get(INCLUDE);

        if (include.length) {
            req = req.clone({ setHeaders: { [HttpConstants.INCLUDE_HEADER_KEY]: include.join(',') } });
        }
        
        return next.handle(req);
    }
}