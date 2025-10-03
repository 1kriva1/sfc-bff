import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { map, Observable } from 'rxjs';

@Injectable()
export class NoContentInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const response = event as HttpResponse<any>;

                        if (response.status === HttpStatusCode.NoContent) {                            
                            return response.clone({ body: { Success: true, Errors: null, Message: CommonConstants.EMPTY_STRING } });
                        }
                    }

                    return event;
                })
            )
    }
}