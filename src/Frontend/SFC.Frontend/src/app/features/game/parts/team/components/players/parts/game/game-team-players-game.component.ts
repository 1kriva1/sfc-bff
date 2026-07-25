import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, RequestGamePlayerSearchTableColumn, IGamePlayerSearchFilterModel, IGamePlayerSearchTableModel, GamePlayerSearchTableLocalization, GamePlayerSearchTableColumn, mapGamePlayerPredicateMapModel, mapGamePlayerFindRequest, mapGamePlayerSearchTableModel } from '@share/components';
import { EnumService, GamePlayerService, IGamePlayerFindFilterModel, IGamePlayerServiceModel } from '@share/services';
import { CommonConstants, empty, IPaginationModel, ISortingModel, LoadContainerLoadType, ReloadService, SortingDirection } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from 'ngx-sfc-components';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { NotificationService } from '@core/services';
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from '@core/models';
import { Observable, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { buildViewGamePlayerAction, buildViewPlayerAction } from '@share/utils';
import { GameTeamPlayersGameLocalization } from './game-team-players-game.localization';
import { GameTeamPlayersGameSelectService } from './game-team-players-game-select.service';
import { GameAction } from '@share/enums';
import { GameTeamPlayersGameConstants } from './game-team-players-game.constants';
import { IGameModel } from '@share/models';
import { buildAddPlayerToTeamAction } from './game-team-players-game.utils';
import { IGameTeamPlayersFilterFormModel } from '../../game-team-players-filter-form.model';
import { mapGamePlayerSearchFilterModel } from '../../game-team-players.mapper';

@Component({
    selector: 'sfc-game-team-players-game',
    templateUrl: './game-team-players-game.component.html',
    styleUrls: ['./game-team-players-game.component.scss']
})
export class GameTeamPlayersGameComponent
    extends BaseTableComponent<IGameTeamPlayersFilterFormModel, IGamePlayerFindFilterModel, IGamePlayerServiceModel, IGamePlayerSearchTableModel> {

    LoadContainerLoadType = LoadContainerLoadType;

    @Input()
    game!: IGameModel;

    @Input()
    filterForm!: FormGroup;

    @Output()
    add: EventEmitter<IGamePlayerSearchTableModel> = new EventEmitter<IGamePlayerSearchTableModel>();

    // component
    Localization = GameTeamPlayersGameLocalization;
    Constants = GameTeamPlayersGameConstants;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: CommonConstants.EMPTY_STRING,
            field: RequestGamePlayerSearchTableColumn.Select,
            type: TableColumnType.Selectable
        },
        {
            name: GamePlayerSearchTableLocalization.COLUMN.RATING,
            field: GamePlayerSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: GamePlayerSearchTableLocalization.COLUMN.NAME,
            field: GamePlayerSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            },
            width: 40
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: GamePlayerSearchTableColumn.Actions,
            type: TableColumnType.Action
        }
    ];

    /* End Table */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGamePlayerPredicateMapModel;

    protected override reloadEvents: string[] = [GameAction.GamePlayer];

    /* End Override */

    constructor(
        private gamePlayerService: GamePlayerService,
        private router: Router,
        private gameTeamPlayersGameSelectService: GameTeamPlayersGameSelectService,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
    }

    protected buildPredicateForm(): FormGroup {
        return this.filterForm;
    }

    protected buildPaginationRequest(model: IGameTeamPlayersFilterFormModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IGamePlayerFindFilterModel> {
        const filterModel: IGamePlayerSearchFilterModel = mapGamePlayerSearchFilterModel(model);
        return mapGamePlayerFindRequest(filterModel, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IGamePlayerFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IGamePlayerServiceModel>>> {
        return this.gamePlayerService.find(this.game.game.id, request).pipe(
            tap(() => this.gameTeamPlayersGameSelectService.clear())
        );
    }

    protected mapTableModel(item: IGamePlayerServiceModel): IGamePlayerSearchTableModel {
        return mapGamePlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    public onSelect(event: ITableSelectEvent): void {
        if (!event.args) return;

        if (event.selected) {
            this.gameTeamPlayersGameSelectService.select(event.args);
        } else {
            this.gameTeamPlayersGameSelectService.unselect(event.args);
        }
    }

    private buildActions(model: IGamePlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router),
            actions: IDropdownMenuItemModel[] = [
                buildAddPlayerToTeamAction(() => this.add.emit(model)),
                buildViewPlayerAction(model.gamePlayer.player!.id, this.router),
                buildViewGamePlayerAction(this.game.game.id, model.gamePlayer.id, actionParameters)
            ];

        return actions;
    }
}