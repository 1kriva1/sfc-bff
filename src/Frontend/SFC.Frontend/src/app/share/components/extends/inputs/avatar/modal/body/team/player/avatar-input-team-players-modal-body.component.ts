import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService, ISortingModel, empty, ReloadService, IPaginationModel, CommonConstants, isDefined } from 'ngx-sfc-common';
import { ITableColumnExtendedModel, ITableSelectEvent } from 'ngx-sfc-components';
import { IForm } from '@core/types';
import { BaseListResponse, BasePaginationRequest } from '@core/models';
import { NotificationService } from '@core/services';
import { TeamPlayerService } from '@share/services';
import { EnumService } from '@share/services';
import { AvatarInputTeamPlayersModalBodyLocalization } from './avatar-input-team-players-modal-body.localization';
import { AvatarInputTeamPlayersModalBodyTableConstants } from './parts/table/avatar-input-team-players-modal-body-table.constants';
import { IAvatarInputTeamPlayersModalBodyEventModel } from './avatar-input-team-players-modal-body-event.model';
import { SearchComponent } from '@share/components/features/base/search/search.component';
import { IFindTeamPlayersFilterModel } from '@share/services/team/player/general/models/find/filters/find-team-players-filter.model';
import { mapIFindTeamPlayersRequest } from '@share/components/features/team/players/search/filters/team-player-search-filter.mapper';
import { ITeamPlayersFilterModel } from '@share/components/features/team/players/search/filters/models/team-player-search-filter.model';
import { ITeamPlayerSearchTableModel } from '@share/components/features/team/players/search/table/team-player-search-table.model';
import { ITeamPlayerModel } from '@share/services/team/player/general/models/common/team-player.model';
import { mapTeamPlayerSearchTableModel } from '@share/components/features/team/players/search/table/team-player-search-table.mapper';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { mapBubbles } from '@share/utils/inputs';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';

@Component({
    selector: 'sfc-avatar-input-team-players-modal-body',
    templateUrl: './avatar-input-team-players-modal-body.component.html',
    styleUrls: ['./avatar-input-team-players-modal-body.component.scss'],
    providers: [ModalService]
})
export class AvatarInputTeamPlayersModalBodyComponent
    extends SearchComponent<
    ITeamPlayersFilterModel,
    IFindTeamPlayersFilterModel,
    ITeamPlayerModel,
    ITeamPlayerSearchTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = AvatarInputTeamPlayersModalBodyLocalization;
    Constants = AvatarInputTeamPlayersModalBodyTableConstants;

    @Input()
    value: number | null = null;

    @Input()
    teamId!: number;

    @Input()
    excludePlayerIds: number[] = [];

    @Input()
    selectOnClick: boolean = false;

    @Output()
    selectPlayer: EventEmitter<IAvatarInputTeamPlayersModalBodyEventModel> = new EventEmitter<IAvatarInputTeamPlayersModalBodyEventModel>();

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.teamPlayerStatuses);

    // TODO: issue with localization and non property value in separate constants file
    public TableColumns: ITableColumnExtendedModel[] = AvatarInputTeamPlayersModalBodyTableConstants.COLUMNS;

    constructor(
        private formBuilder: FormBuilder,        
        private teamPlayerService: TeamPlayerService,
        private enumService: EnumService,
        modalService: ModalService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
    ) {
        super(modalService, themeService, notificationService, reloadService);
    }

    buildFilterForm(): FormGroup {
        const controls: IForm<ITeamPlayersFilterModel> = {
            name: [null],
            statuses: [[]]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: ITeamPlayersFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayersFilterModel> {
        return mapIFindTeamPlayersRequest(model, this.excludePlayerIds, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindTeamPlayersFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamPlayerModel>>> {
        return this.teamPlayerService.find(this.teamId, request);
    }

    map(item: ITeamPlayerModel): ITeamPlayerSearchTableModel {
        return mapTeamPlayerSearchTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        if (event.selected && isDefined(this.value)) {
            this.value = null;
        }

        this.selectPlayer.emit({ selected: event.selected, player: event.args });
    }
}