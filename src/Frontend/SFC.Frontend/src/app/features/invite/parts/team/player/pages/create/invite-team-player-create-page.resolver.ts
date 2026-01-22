import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Navigation, ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY, Observable, of, map, forkJoin } from "rxjs";
import { isDefined } from "ngx-sfc-common";
import { IResolverModel } from "@core/models";
import {
    buildErrorResolverModelMultiple, buildLocalResolverModel, buildResolverModelMultiple,
    getRouteId, getValueFromNavigationExtras
} from "@core/utils";
import { EnumService, TeamService } from "@share/services";
import { ResolverType } from "@core/types/resolver.type";
import { mapTeamModel } from "@share/mappers/team/general/team.mapper";
import { InviteTeamPlayerConstants } from "@share/constants/features/invite";
import { TeamConstants } from "@share/constants";
import { PageState } from "@core/enums";
import { IInviteTeamPlayerResolveModel } from "@share/models";

export const InviteTeamPlayerCreatePageResolver: ResolveFn<IResolverModel<IInviteTeamPlayerResolveModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IInviteTeamPlayerResolveModel>> => {
        const navigation: Navigation | null = inject(Router).getCurrentNavigation(),
            state: PageState =
                getValueFromNavigationExtras(InviteTeamPlayerConstants.CREATE_PAGE_STATE_NAVIGATION_STATE_KEY, navigation);

        if (state == PageState.Local) {
            const result: IInviteTeamPlayerResolveModel =
                getValueFromNavigationExtras(InviteTeamPlayerConstants.CREATE_PAGE_MODEL_NAVIGATION_STATE_KEY, navigation),
                model: IResolverModel<IInviteTeamPlayerResolveModel> = buildLocalResolverModel(true, result);
            return of(model);
        }

        const teamId: number | null = getRouteId(snapshot, TeamConstants.ID_ROUTE_PATH),
            playerId: number | null = null,
            enumService: EnumService = inject(EnumService),
            teamService: TeamService = inject(TeamService);

        return forkJoin({
            team: isDefined(teamId) ? teamService.get(teamId) : of({ Success: true }),
            player: isDefined(playerId) ? EMPTY : of({ Success: true })
        }).pipe(
            map((responses: any) => buildResolverModelMultiple(responses, {
                team: mapTeamModel(responses.team.Team, enumService),
                player: null
            })),
            catchError((responses: ResolverType) => of(buildErrorResolverModelMultiple<IInviteTeamPlayerResolveModel>(responses)))
        );
    };