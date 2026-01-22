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
import { IFindTeamPlayersFilterModel, TeamPlayerService } from '@share/services';
import { BasePlayersSearchComponent } from '@share/components';
import { EnumService } from '@share/services';
import { mapBubbles } from '@share/utils/inputs';
import { TeamEditPlayersSquadTableConstants } from './parts/table/team-edit-players-squad-table.constants';
import { ITeamEditPlayersSquadTableModel } from './parts/table/team-edit-players-squad-table.model';
import { buildViewPlayerAction } from '@share/utils/features/player/player-action.utils';
import { buildRemoveTeamPlayerAction } from 'src/app/features/team/utils/team-actions.utils';
import { TeamLocalization } from 'src/app/features/team/localization/team.localization';
import { buildBackNavigationExtras, getRouteId } from '@core/utils';
import { ITeamPlayerModel } from '@share/services/team/player/general/models/common/team-player.model';
import { isTeamPlayerActive } from 'src/app/features/team/utils/team.utils';
import { TeamEditPlayersSquadLocalization } from './team-edit-players-squad.localization';
import { ITeamEditPlayersSquadFilterModel } from './team-edit-players-squad-form.model';
import { mapFindTeamPlayersRequest, mapTeamEditPlayersSquadTableModel } from './team-edit-players-squad.mapper';
import { TeamAction } from '@share/enums';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { buildViewTeamPlayerAction } from '@share/utils';

@Component({
    templateUrl: './team-edit-players-squad.component.html',
    styleUrls: ['./team-edit-players-squad.component.scss']
})
export class TeamEditPlayersSquadComponent
    extends BasePlayersSearchComponent<
    ITeamEditPlayersSquadFilterModel,
    IFindTeamPlayersFilterModel,
    ITeamPlayerModel,
    ITeamEditPlayersSquadTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = TeamEditPlayersSquadLocalization;

    /* Fields */

    private teamId: number;

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.teamPlayerStatuses);

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Override */

    override TableConstants = TeamEditPlayersSquadTableConstants;

    override action: TeamAction = TeamAction.Player;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private enumService: EnumService,
        private teamPlayerService: TeamPlayerService,
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
        const controls: IForm<ITeamEditPlayersSquadFilterModel> = {
            name: [null],
            statuses: [[]]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: ITeamEditPlayersSquadFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayersFilterModel> {
        return mapFindTeamPlayersRequest(model, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindTeamPlayersFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamPlayerModel>>> {
        return this.teamPlayerService.find(this.teamId, request);
    }

    map(item: ITeamPlayerModel): ITeamEditPlayersSquadTableModel {
        return mapTeamEditPlayersSquadTableModel(item, this.enumService, teamPlayer => { return this.buildActions(teamPlayer) });
    }

    private buildActions(teamPlayer: ITeamEditPlayersSquadTableModel): IDropdownMenuItemModel[] {
        const actions: IDropdownMenuItemModel[] = [
            buildViewTeamPlayerAction(this.teamId, teamPlayer.player.id, this.router, this.backNavigationExtras),
            buildViewPlayerAction(teamPlayer.player.id, this.router)
        ];

        if (isTeamPlayerActive(teamPlayer.status, this.enumService.enums)) {
            return [
                buildRemoveTeamPlayerAction(teamPlayer.player, this.modalService),
                ...actions
            ];
        }

        return actions;
    }
}