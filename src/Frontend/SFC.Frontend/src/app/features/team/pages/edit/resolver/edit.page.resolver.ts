import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { isNullOrEmptyString, LoaderService } from "ngx-sfc-common";
import { catchError, EMPTY, switchMap, Observable, of, finalize, tap } from "rxjs";
import { RoutKey } from "@core/enums";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildPath } from "@core/utils";
import { EnumService } from "@share/services";

@Injectable({ providedIn: 'root' })
export class EditPageResolver implements Resolve<IResolverModel<any>> {

    constructor(
        private router: Router,
        private loaderService: LoaderService,
        private enumService: EnumService) { }

    resolve(route: ActivatedRouteSnapshot):
        Observable<IResolverModel<any>> {
        const id: string | null = route.paramMap.get('id');

        return of({ success: true, message: '', result: {} })
    }
}