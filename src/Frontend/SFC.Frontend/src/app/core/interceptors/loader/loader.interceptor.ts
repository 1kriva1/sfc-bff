import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken,
    HttpResponse,
} from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { LoaderService } from 'ngx-sfc-common';
import { ILoaderModel } from './loader.model';

export const LOADER = new HttpContextToken<ILoaderModel>(() => ({ show: false }));

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const model: ILoaderModel = request.context.get(LOADER);

        if (model.show) {
            this.loaderService.show(model.id!);

            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse)
                        this.loaderService.hide(model.id!);

                    return event;
                }),
                catchError(error => {
                    this.loaderService.hide(model.id!);
                    return throwError(() => error);
                }));
        }

        return next.handle(request);
    }
}
