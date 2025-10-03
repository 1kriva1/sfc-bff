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
import { IFindTeamPlayerRequestsFilterModel, RequestTeamPlayerService } from '@share/services';
import { BasePlayersSearchComponent } from '@share/components';
import { EnumService } from '@share/services';
import { mapBubbles } from '@share/utils/inputs';
import { TeamEditPlayersRequestLocalization } from './team-edit-players-request.localization';
import { buildViewPlayerAction } from '@share/utils/features/player/player-action.utils';
import { buildAcceptTeamPlayerRequestAction, buildDeclineTeamPlayerRequestAction, buildViewTeamPlayerRequestAction } from 'src/app/features/team/utils/team-actions.utils';
import { buildBackNavigationExtras, getRouteId } from '@core/utils';
import { ITeamEditPlayersRequestTableModel } from './parts/table/team-edit-players-request-table.model';
import { ITeamPlayerRequestModel } from '@share/services/request/team/player/models/common/team-player-request.model';
import { TeamEditPlayersRequestTableConstants } from './parts/table/team-edit-players-request-table.constants';
import { mapFindTeamPlayerRequestsRequest, mapTeamPlayersRequestTableModel } from './team-edit-players-request.mapper';
import { isTeamPlayerInviteActual } from 'src/app/features/team/utils/team.utils';
import { ITeamEditPlayersRequestFilterModel } from './team-edit-players-request-form.model';
import { TeamLocalization } from 'src/app/features/team/localization';
import { RequestAction } from '@share/enums';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';

@Component({
    templateUrl: './team-edit-players-request.component.html',
    styleUrls: ['./team-edit-players-request.component.scss']
})
export class TeamEditPlayersRequestComponent
    extends BasePlayersSearchComponent<
    ITeamEditPlayersRequestFilterModel,
    IFindTeamPlayerRequestsFilterModel,
    ITeamPlayerRequestModel,
    ITeamEditPlayersRequestTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = TeamEditPlayersRequestLocalization;

    /* Fields */

    private teamId: number;

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.requestStatuses);

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Override */

    override TableConstants = TeamEditPlayersRequestTableConstants;

    override action: RequestAction = RequestAction.TeamPlayer;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private enumService: EnumService,
        private requestTeamPlayerService: RequestTeamPlayerService,
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

    buildFilterForm(): FormGroup {
        const controls: IForm<ITeamEditPlayersRequestFilterModel> = {
            name: [null],
            statuses: [[]]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: ITeamEditPlayersRequestFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayerRequestsFilterModel> {
        return mapFindTeamPlayerRequestsRequest(model, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindTeamPlayerRequestsFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamPlayerRequestModel>>> {
        return this.requestTeamPlayerService.find(this.teamId, request);
    }

    map(item: ITeamPlayerRequestModel): ITeamEditPlayersRequestTableModel {
        return mapTeamPlayersRequestTableModel(item, this.enumService, teamPlayerRequest => { return this.buildActions(teamPlayerRequest) });
    }

    private buildActions(teamPlayerRequest: ITeamEditPlayersRequestTableModel): IDropdownMenuItemModel[] {
        const actions: IDropdownMenuItemModel[] = [
            buildViewTeamPlayerRequestAction(teamPlayerRequest.player.id, this.teamId, teamPlayerRequest.id, this.router, this.backNavigationExtras),
            buildViewPlayerAction(teamPlayerRequest.player.id, this.router)
        ];        

        if (isTeamPlayerInviteActual(teamPlayerRequest.status.key, this.enumService.enums)) {
            return [
                buildAcceptTeamPlayerRequestAction(teamPlayerRequest, this.modalService),
                buildDeclineTeamPlayerRequestAction(teamPlayerRequest, this.modalService),
                ...actions
            ];
        }

        return actions;
    }
}