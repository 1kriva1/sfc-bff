import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { isNullOrEmptyString, LoaderService } from "ngx-sfc-common";
import { catchError, EMPTY, switchMap, Observable, of, finalize, tap } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildPath } from "@core/utils";
import { EnumService } from "@share/services";
import { PlayerService } from "../../../services/player/player.service";
import { IGetPlayerResponse } from "../../../services/player/models";
import { mapProfileModel } from "../mapper/edit.page.mapper";
import { IProfileModel } from "../mapper/models";
import { HomeRoute } from "@share/enums";

export const EditPageResolver: ResolveFn<IResolverModel<IProfileModel>> =
    (route: ActivatedRouteSnapshot): Observable<IResolverModel<IProfileModel>> => {
        const id: string | null = route.paramMap.get('id'),
            loaderService: LoaderService = inject(LoaderService),
            enumService: EnumService = inject(EnumService),
            router: Router = inject(Router);

        return isNullOrEmptyString(id) ? EMPTY : inject(PlayerService).get(+id!).pipe(
            tap(() => loaderService.show()),
            switchMap(async (response: IGetPlayerResponse) => {
                return {
                    success: response.Success,
                    result: response.Success
                        ? await mapProfileModel(response.Player, enumService)
                        : null
                };
            }),
            catchError((error: BaseErrorResponse) => {
                router.navigate([buildPath(HomeRoute.Home)]);
                return of({ result: null, success: false, message: error.Message });
            }),
            finalize(() => loaderService.hide())
        );
    };