import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, IGameTeamPlayerSearchFilterModel, IGameTeamPlayerSearchTableModel, GameTeamPlayerSearchTableColumn, GameTeamPlayerSearchTableLocalization, mapGameTeamPlayerPredicateMapModel, mapGameTeamPlayerFindRequest, mapGameTeamPlayerSearchTableModel } from '@share/components';
import { EnumService, GameTeamPlayerService, IGameTeamPlayerFindFilterModel, IGameTeamPlayerServiceModel } from '@share/services';
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
import { GameAction } from '@share/enums';
import { GameTeamPlayersCurrentLocalization } from './game-team-players-current.localization';
import { GameTeamPlayersCurrentConstants } from './game-team-players-current.constants';
import { GameTeamEditPlayersCurrentSelectService } from './game-team-players-current-select.service';
import { IGameTeamEditPageModel } from '../../../../models/game-team-edit-page.model';
import { buildRemovePlayerFromTeamAction } from './game-team-players-current.utils';
import { IGameTeamPlayersFilterFormModel } from '../../../../../../components/players/game-team-players-filter-form.model';
import { mapGameTeamPlayerSearchFilterModel } from '../../../../../../components/players/game-team-players.mapper';

@Component({
    selector: 'sfc-game-team-players-current',
    templateUrl: './game-team-players-current.component.html',
    styleUrls: ['./game-team-players-current.component.scss']
})
export class GameTeamPlayersCurrentComponent
    extends BaseTableComponent<IGameTeamPlayersFilterFormModel, IGameTeamPlayerFindFilterModel, IGameTeamPlayerServiceModel, IGameTeamPlayerSearchTableModel> {

    LoadContainerLoadType = LoadContainerLoadType;

    @Input()
    model!: IGameTeamEditPageModel;

    @Input()
    filterForm!: FormGroup<any>;

    @Output()
    remove: EventEmitter<IGameTeamPlayerSearchTableModel> = new EventEmitter<IGameTeamPlayerSearchTableModel>();

    // component
    Localization = GameTeamPlayersCurrentLocalization;
    Constants = GameTeamPlayersCurrentConstants;

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
            }
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
            width: 40
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: GameTeamPlayerSearchTableColumn.Actions,
            type: TableColumnType.Action
        }
    ];

    /* End Table */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGameTeamPlayerPredicateMapModel;

    protected override reloadEvents: string[] = [GameAction.GameTeamPlayer];

    /* End Override */

    constructor(
        private gameTeamPlayerService: GameTeamPlayerService,
        private router: Router,
        private gameTeamEditPlayersCurrentSelectService: GameTeamEditPlayersCurrentSelectService,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
    }

    protected buildPredicateForm(): FormGroup<any> {
        return this.filterForm;
    }

    protected buildPaginationRequest(model: IGameTeamPlayersFilterFormModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IGameTeamPlayerFindFilterModel> {
        const filterModel: IGameTeamPlayerSearchFilterModel = mapGameTeamPlayerSearchFilterModel(model, this.gameTeamEditPlayersCurrentSelectService.value);
        return mapGameTeamPlayerFindRequest(filterModel, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IGameTeamPlayerFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IGameTeamPlayerServiceModel>>> {
        return this.gameTeamPlayerService.find(this.model.game.game.id, this.model.gameTeam.gameTeam.id, request).pipe(
            tap(() => this.gameTeamEditPlayersCurrentSelectService.clear())
        );
    }

    protected mapTableModel(item: IGameTeamPlayerServiceModel): IGameTeamPlayerSearchTableModel {
        return mapGameTeamPlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    public onSelect(event: ITableSelectEvent): void {
        if (!event.args) return;

        if (event.selected) {
            this.gameTeamEditPlayersCurrentSelectService.select(event.args);
        } else {
            this.gameTeamEditPlayersCurrentSelectService.unselect(event.args);
        }
    }

    private buildActions(model: IGameTeamPlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router),
            actions: IDropdownMenuItemModel[] = [
                buildRemovePlayerFromTeamAction(() => this.remove.emit(model)),
                buildViewPlayerAction(model.gameTeamPlayer.player!.id, this.router),
                buildViewGamePlayerAction(this.model.game.game.id, model.gameTeamPlayer.player!.id, actionParameters)
            ];

        return actions;
    }    
}