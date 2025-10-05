import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, EMPTY, switchMap, Observable, of, finalize, tap } from "rxjs";
import { isDefined, LoaderService } from "ngx-sfc-common";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { ITeamPlayerViewPageModel } from "./team-player-view-page.model";
import { mapTeamPlayerViewPageModelAsync } from "./team-player-view-page.mapper";

export const TeamPlayerViewPageResolver: ResolveFn<IResolverModel<ITeamPlayerViewPageModel>> =
    (route: ActivatedRouteSnapshot): Observable<IResolverModel<ITeamPlayerViewPageModel>> => {
        const id: number | null = getRouteId(route),
            loaderService: LoaderService = inject(LoaderService);

        if (!isDefined(id)) {
            console.error('Missing Id in view team player page route.');
            return EMPTY;
        }

        return of(id).pipe(
            tap(() => loaderService.show()),
            switchMap(async (response: any) => buildResolverModel(response, await mapTeamPlayerViewPageModelAsync(response))),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ITeamPlayerViewPageModel>(error))),
            finalize(() => loaderService.hide())
        );
    };