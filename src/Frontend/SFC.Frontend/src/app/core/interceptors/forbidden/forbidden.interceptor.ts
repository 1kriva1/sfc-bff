import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { buildPath } from '../../utils';
import { map, Observable } from 'rxjs';
import { HomeRoute } from '@share/enums';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const response = event as HttpResponse<any>;

                        if (response.status === HttpStatusCode.Forbidden) {
                            this.router.navigate([buildPath(HomeRoute.Home)]);
                        }
                    }

                    return event;
                })
            )
    }
}