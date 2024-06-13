import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { isNullOrEmptyString, LoaderService } from "ngx-sfc-common";
import { catchError, EMPTY, switchMap, Observable, of, finalize, tap } from "rxjs";
import { RoutKey } from "@core/enums";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildPath } from "@core/utils";
import { EnumService } from "@share/services";
import { PlayerService } from "../../../services/player/player.service";
import { IGetPlayerResponse } from "../../../services/player/models";
import { mapProfileModel } from "../mapper/edit.page.mapper";
import { IProfileModel } from "../mapper/models";

@Injectable({ providedIn: 'root' })
export class EditPageResolver implements Resolve<IResolverModel<IProfileModel>> {

    constructor(
        private playerService: PlayerService,
        private router: Router,
        private loaderService: LoaderService,
        private enumService: EnumService) { }

    resolve(route: ActivatedRouteSnapshot):
        Observable<IResolverModel<IProfileModel>> {
        const id: string | null = route.paramMap.get('id');

        return isNullOrEmptyString(id) ? EMPTY : this.playerService.get(+id!).pipe(
            tap(() => this.loaderService.show()),
            switchMap(async (response: IGetPlayerResponse) => {
                return {
                    success: response.Success,
                    result: response.Success
                        ? await mapProfileModel(response.Player, this.enumService)
                        : null
                };
            }),
            catchError((error: BaseErrorResponse) => {
                this.router.navigate([buildPath(RoutKey.Home)]);
                return of({ result: null, success: false, message: error.Message });
            }),
            finalize(() => this.loaderService.hide())
        );
    }
}