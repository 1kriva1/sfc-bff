import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { IResolverModel } from "@core/models";
import { buildResolverModel, getRouteId } from "@core/utils";
import { EnumService } from "@share/services";
import { IInviteGameTeamEditPageModel } from "./models/invite-game-team-edit-page.model";

export const InviteGameTeamEditPageResolver: ResolveFn<IResolverModel<IInviteGameTeamEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IInviteGameTeamEditPageModel>> => {
        const id: number = getRouteId(snapshot),
            enumService: EnumService = inject(EnumService);

        return of(buildResolverModel({ Message: '', Errors: null, Success: true }, {}));
    };