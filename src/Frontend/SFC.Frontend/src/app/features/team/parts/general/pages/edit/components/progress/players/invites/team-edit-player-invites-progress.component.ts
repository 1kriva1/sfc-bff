import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonConstants, ILoadContainerModel, ILoadContainerResultModel, LoadContainerLoadType, LoadContainerType, ReloadService, where } from 'ngx-sfc-common';
import { EnumService } from '@share/services';
import { TeamEditPlayerInvitesProgressLocalization } from './team-edit-player-invites-progress.localization';
import { ITeamEditPlayerInvitesProgressModel } from './team-edit-player-invites-progress.model';
import { IEnumModel } from '@core/types';
import { calculatePercentageWithCount, getRouteId, switchReloadWithStart } from '@core/utils';
import { ActivatedRoute } from '@angular/router';
import { CoreLocalization } from '@core/localization';
import { mapTeamPlayerInviteModel } from '@share/mappers/invite/team-player-invite.mapper';
import { ITeamPlayerInviteModel } from '@share/models/invite/team-player-invite.model';
import { IGetAllTeamPlayerInvitesResponse, InviteTeamPlayerService, ITeamPlayerInviteServiceModel } from '@share/services/invite/team/player';
import { InviteAction } from '@share/enums';
@Component({
    selector: 'sfc-team-edit-player-invites-progress',
    templateUrl: './team-edit-player-invites-progress.component.html',
    styleUrls: ['./team-edit-player-invites-progress.component.scss']
})
export class TeamEditPlayerInvitesProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;
    LoadContainerType = LoadContainerType;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = TeamEditPlayerInvitesProgressLocalization;

    /* Fields */

    public model: ITeamEditPlayerInvitesProgressModel;

    public loadModel!: ILoadContainerModel;

    public action: InviteAction = InviteAction.TeamPlayer;

    private teamId: number;

    /* End Fields */

    constructor(
        private enumService: EnumService,
        private reloadService: ReloadService,
        private inviteTeamPlayerService: InviteTeamPlayerService,
        route: ActivatedRoute) {
        this.teamId = getRouteId(route.snapshot);
        this.model = this.buildProgressModel();
    }

    ngOnInit(): void {
        this.loadModel = this.buildLoadContainerModel();
    }

    public onLoadSuccess(result: ILoadContainerResultModel<ITeamPlayerInviteModel>): void {
        this.model = this.buildProgressModel(result.items);
    }

    private buildProgressModel(items: ITeamPlayerInviteModel[] = []): ITeamEditPlayerInvitesProgressModel {
        const statuses: IEnumModel<number>[] = this.enumService.enums.inviteStatuses;

        return {
            total: items.length,
            statuses: statuses.map((status: IEnumModel<number>) => {
                const count: number = where(items, item => item.status.key === status.key)?.length || 0;
                return {
                    key: status.key,
                    label: status.value,
                    count: count,
                    progress: calculatePercentageWithCount(items, count)
                } 
            })
        }
    }

    private buildLoadContainerModel(): ILoadContainerModel {
        const loadContainerModel: ILoadContainerModel = {
            data$: this.buildLoadObservable(this.teamId),
            loadType: LoadContainerLoadType.Common
        };

        return loadContainerModel;
    }

    private buildLoadObservable(teamId: number): Observable<ITeamPlayerInviteModel[]> {
        const items$: Observable<ITeamPlayerInviteModel[]> = this.inviteTeamPlayerService.getAll(teamId).pipe(
            map((response: IGetAllTeamPlayerInvitesResponse) => response.Invites.map((invite: ITeamPlayerInviteServiceModel) => mapTeamPlayerInviteModel(invite, this.enumService)))
        );

        return switchReloadWithStart(items$, this.action, this.reloadService.reload$);
    }
}