import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonConstants, ILoadContainerModel, ILoadContainerResultModel, LoadContainerLoadType, LoadContainerType, ReloadService, where } from 'ngx-sfc-common';
import { EnumService, IGetAllTeamPlayerRequestsResponse, RequestTeamPlayerService } from '@share/services';
import { TeamEditPlayerRequestsProgressLocalization } from './team-edit-player-requests-progress.localization';
import { ITeamEditPlayerRequestsProgressModel } from './team-edit-player-requests-progress.model';
import { IEnumModel } from '@core/types';
import { calculatePercentageWithCount, getRouteId, switchReloadWithStart } from '@core/utils';
import { ActivatedRoute } from '@angular/router';
import { CoreLocalization } from '@core/localization';
import { ITeamPlayerRequestModel as ITeamPlayerRequestServiceModel } from '@share/services/request/team/player/models/common/team-player-request.model';
import { mapTeamPlayerRequestModel } from '@share/mappers/team-player-request.mapper';
import { ITeamPlayerRequestModel } from '@share/models/request/team-player-request.model';
import { RequestAction } from '@share/enums';
@Component({
    selector: 'sfc-team-edit-player-requests-progress',
    templateUrl: './team-edit-player-requests-progress.component.html',
    styleUrls: ['./team-edit-player-requests-progress.component.scss']
})
export class TeamEditPlayerRequestsProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;
    LoadContainerType = LoadContainerType;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = TeamEditPlayerRequestsProgressLocalization;

    /* Fields */

    public model: ITeamEditPlayerRequestsProgressModel;

    public loadModel!: ILoadContainerModel;

    public action: RequestAction = RequestAction.TeamPlayer;

    private teamId: number;

    /* End Fields */

    constructor(
        private enumService: EnumService,
        private reloadService: ReloadService,
        private requestTeamPlayerService: RequestTeamPlayerService,
        route: ActivatedRoute) {
        this.teamId = getRouteId(route.snapshot);
        this.model = this.buildProgressModel();
    }

    ngOnInit(): void {
        this.loadModel = this.buildLoadContainerModel();
    }

    public onLoadSuccess(result: ILoadContainerResultModel<ITeamPlayerRequestModel>): void {
        this.model = this.buildProgressModel(result.items);
    }

    private buildProgressModel(items: ITeamPlayerRequestModel[] = []): ITeamEditPlayerRequestsProgressModel {
        const statuses: IEnumModel<number>[] = this.enumService.enums.requestStatuses;

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

    private buildLoadObservable(teamId: number): Observable<ITeamPlayerRequestModel[]> {
        const items$: Observable<ITeamPlayerRequestModel[]> = this.requestTeamPlayerService.getAll(teamId).pipe(
            map((response: IGetAllTeamPlayerRequestsResponse) => response.Requests.map((request: ITeamPlayerRequestServiceModel) => mapTeamPlayerRequestModel(request, this.enumService)))
        );

        return switchReloadWithStart(items$, this.action, this.reloadService.reload$);
    }
}