import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService, ISortingModel, empty, ReloadService, IPaginationModel, CommonConstants } from 'ngx-sfc-common';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';
import { IForm } from '@core/types';
import { BaseListResponse, BasePaginationRequest } from '@core/models';
import { NotificationService } from '@core/services';
import { IFindTeamPlayerInvitesFilterModel, InviteTeamPlayerService } from '@share/services';
import { BasePlayersSearchComponent } from '@share/components';
import { EnumService } from '@share/services';
import { mapBubbles } from '@share/utils/inputs';
import { TeamCreatePlayersInviteTableConstants } from './parts/table/team-edit-players-invite-table.constants';
import { ITeamEditPlayersInviteTableModel } from './parts/table/team-edit-players-invite-table.model';
import { mapFindTeamPlayersRequest, mapTeamEditPlayersInviteTableModel } from './team-edit-players-invite.mapper';
import { RouteKey } from '@core/enums';
import { TeamEditPlayersInviteLocalization } from './team-edit-players-invite.localization';
import { buildViewPlayerAction } from '@share/utils/features/player/player-action.utils';
import { buildCancelTeamPlayerInviteAction, buildEditTeamPlayerInviteAction, buildViewTeamPlayerInviteAction } from 'src/app/features/team/utils/team-actions.utils';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { buildBackNavigationExtras, getRouteId } from '@core/utils';
import { isTeamPlayerInviteActual } from 'src/app/features/team/utils/team.utils';
import { ITeamEditPlayersInviteFilterModel } from './team-edit-players-invite-form.model';
import { TeamLocalization } from 'src/app/features/team/localization';
import { InviteAction, InviteRoute, PlayerRoute, TeamRoute } from '@share/enums';
import { ITeamPlayerInviteModel } from '@share/services/invite/team/player/service/models/common/team-player-invite.model';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';

@Component({
    templateUrl: './team-edit-players-invite.component.html',
    styleUrls: ['./team-edit-players-invite.component.scss']
})
export class TeamEditPlayersInviteComponent
    extends BasePlayersSearchComponent<
    ITeamEditPlayersInviteFilterModel,
    IFindTeamPlayerInvitesFilterModel,
    ITeamPlayerInviteModel,
    ITeamEditPlayersInviteTableModel> {

    // icons
    faPlus = faPlus;

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = TeamEditPlayersInviteLocalization;

    /* Fields */

    private teamId: number;

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.inviteStatuses);

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Override */

    override TableConstants = TeamCreatePlayersInviteTableConstants;

    override action: InviteAction = InviteAction.TeamPlayer;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private enumService: EnumService,
        private inviteTeamPlayerService: InviteTeamPlayerService,
        private router: Router,
        route: ActivatedRoute,
        modalService: ModalService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService
    ) {
        super(modalService, themeService, notificationService, reloadService);
        this.teamId = getRouteId(route.snapshot);
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
    }

    public navigateToCreatePage(): void {
        this.router.navigate(
            [`${InviteRoute.Invites}/${TeamRoute.Teams}/${this.teamId}/${PlayerRoute.Players}/${RouteKey.Create}`],
            this.backNavigationExtras
        );
    }

    buildFilterForm(): FormGroup {
        const controls: IForm<ITeamEditPlayersInviteFilterModel> = {
            name: [null],
            statuses: [[]]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: ITeamEditPlayersInviteFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayerInvitesFilterModel> {
        return mapFindTeamPlayersRequest(model, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindTeamPlayerInvitesFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamPlayerInviteModel>>> {
        return this.inviteTeamPlayerService.find(this.teamId, request);
    }

    map(item: ITeamPlayerInviteModel): ITeamEditPlayersInviteTableModel {
        return mapTeamEditPlayersInviteTableModel(item, this.enumService, teamPlayer => { return this.buildActions(teamPlayer) });
    }

    private buildActions(invite: ITeamEditPlayersInviteTableModel): IDropdownMenuItemModel[] {
        const actions: IDropdownMenuItemModel[] = [
            buildViewTeamPlayerInviteAction(invite.player.id, this.teamId, invite.id, this.router, this.backNavigationExtras),
            buildViewPlayerAction(invite.player.id, this.router)
        ];        

        if (isTeamPlayerInviteActual(invite.status.key, this.enumService.enums)) {
            return [
                buildEditTeamPlayerInviteAction(invite.player.id, this.teamId, invite.id, this.router, this.backNavigationExtras),
                buildCancelTeamPlayerInviteAction(invite, this.modalService),
                ...actions
            ];
        }

        return actions;
    }
}