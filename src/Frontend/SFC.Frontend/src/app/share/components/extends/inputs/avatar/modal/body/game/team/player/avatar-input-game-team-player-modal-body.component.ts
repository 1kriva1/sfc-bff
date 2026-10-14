import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService, ISortingModel, empty, ReloadService, IPaginationModel, CommonConstants, SortingDirection, removeItem } from 'ngx-sfc-common';
import { ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from 'ngx-sfc-components';
import { BaseListResponse, BasePaginationRequest } from '@core/models';
import { NotificationService } from '@core/services';
import { GameTeamPlayerService, IGameTeamPlayerFindFilterModel, IGameTeamPlayerServiceModel } from '@share/services';
import { EnumService } from '@share/services';
import { AvatarInputGameTeamPlayerModalBodyLocalization } from './avatar-input-game-team-player-modal-body.localization';
import { IAvatarInputGameTeamPlayerModalBodyEventModel } from './avatar-input-game-team-player-modal-body-event.model';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { IGameTeamPlayerSearchTableModel } from '@share/components/features/game/team/player/search/table/game-team-player-search-table.model';
import { mapGameTeamPlayerSearchTableModel } from '@share/components/features/game/team/player/search/table/game-team-player-search-table.mapper';
import { mapGameTeamPlayerFindRequest } from '@share/components/features/game/team/player/search/filters/game-team-player-search-filter.mapper';
import { IGameTeamPlayerSearchFilterModel } from '@share/components/features/game/team/player/search/filters/game-team-player-search-filter.model';
import { buildGameTeamPlayerSearchFilterFormGroup, mapGameTeamPlayerPredicateMapModel } from '@share/components/features/game/team/player/search/filters/game-team-player-search-filter.utils';
import { GameTeamPlayerInclude } from '@share/enums';
import { GameTeamPlayerSearchTableColumn } from '@share/components/features/game/team/player/search/table/game-team-player-search-table-column.enum';
import { GameTeamPlayerSearchTableLocalization } from '@share/components/features/game/team/player/search/table/game-team-player-search-table.localization';
import { BaseTableComponent, GameTeamPlayerSearchFilterPart } from '@share/components';
import { MapPredicateModelFunction } from '@core/utils';
import { CoreConstants } from '@core/constants';
import { AvatarInputGameTeamPlayerModalBodyConstants } from './avatar-input-game-team-player-modal-body.constants';

@Component({
    selector: 'sfc-avatar-input-game-team-player-modal-body',
    templateUrl: './avatar-input-game-team-player-modal-body.component.html',
    styleUrls: ['./avatar-input-game-team-player-modal-body.component.scss'],
    providers: [ModalService]
})
export class AvatarInputGameTeamPlayerModalBodyComponent
    extends BaseTableComponent<IGameTeamPlayerSearchFilterModel, IGameTeamPlayerFindFilterModel, IGameTeamPlayerServiceModel, IGameTeamPlayerSearchTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    GameTeamPlayerSearchFilterPart = GameTeamPlayerSearchFilterPart;

    // component
    Localization = AvatarInputGameTeamPlayerModalBodyLocalization;
    Constants = AvatarInputGameTeamPlayerModalBodyConstants;

    @Input()
    value: number | null = null;

    @Input()
    gameId!: number;

    @Input()
    teamId!: number;

    @Input()
    excludePlayerIds: number[] = [];

    @Input()
    selectOnClick: boolean = false;

    @Output()
    selectPlayer: EventEmitter<IAvatarInputGameTeamPlayerModalBodyEventModel> = new EventEmitter<IAvatarInputGameTeamPlayerModalBodyEventModel>();

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: CommonConstants.EMPTY_STRING,
            field: GameTeamPlayerSearchTableColumn.Select,
            type: TableColumnType.Selectable
        },
        {
            name: GameTeamPlayerSearchTableLocalization.COLUMN.RATING,
            field: GameTeamPlayerSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            },
            width: 20
        },
        {
            name: GameTeamPlayerSearchTableLocalization.COLUMN.NAME,
            field: GameTeamPlayerSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            },
            width: 35
        },
        {
            name: GameTeamPlayerSearchTableLocalization.COLUMN.POSITION,
            field: GameTeamPlayerSearchTableColumn.Position
        }
    ];

    /* End Table */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGameTeamPlayerPredicateMapModel;

    /* End Override */

    constructor(
        private gameTeamPlayerService: GameTeamPlayerService,
        private formBuilder: FormBuilder,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
    }

    buildPredicateForm(): FormGroup {
        return buildGameTeamPlayerSearchFilterFormGroup(this.formBuilder);
    }

    buildPaginationRequest(model: IGameTeamPlayerSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IGameTeamPlayerFindFilterModel> {
        model.gameTeamPlayer.excludeIds =this.excludePlayerIds.filter(n => n !== this.value);
        return mapGameTeamPlayerFindRequest(model, pagination, sorting);
    }

    sendPaginationRequest(request: BasePaginationRequest<IGameTeamPlayerFindFilterModel>): Observable<HttpResponse<BaseListResponse<IGameTeamPlayerServiceModel>>> {
        return this.gameTeamPlayerService.find(this.gameId, this.teamId, request, [
            GameTeamPlayerInclude.GamePlayerWithPlayerProfile,
            GameTeamPlayerInclude.TeamPlayerWithPlayerProfile
        ]);
    }

    mapTableModel(item: IGameTeamPlayerServiceModel): IGameTeamPlayerSearchTableModel {
        return mapGameTeamPlayerSearchTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        this.selectPlayer.emit({ selected: event.selected, gameTeamPlayer: event.args });
    }
}