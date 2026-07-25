import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, MapPredicateModelFunction } from '@core/utils';
import { RequestGamePlayerSearchTableColumn, IGamePlayerSearchTableModel, GamePlayerSearchTableLocalization, GamePlayerSearchTableColumn, mapGamePlayerPredicateMapModel, BaseObservableTableComponent } from '@share/components';
import { EnumService } from '@share/services';
import { CommonConstants, ILoadContainerParameters, isNullOrEmptyString, LoadContainerLoadType, ReloadService, SortingDirection, where } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from 'ngx-sfc-components';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { IBuildActionParameters } from '@core/models';
import { Observable } from 'rxjs';
import { buildViewGamePlayerAction, buildViewPlayerAction } from '@share/utils';
import { GameTeamPlayersCurrentEditLocalization } from './game-team-players-current-edit.localization';
import { GameTeamPlayersCurrentEditSelectService } from './services/game-team-players-current-edit-select.service';
import { GameTeamPlayersCurrentEditConstants } from './game-team-players-current-edit.constants';
import { GameTeamPlayersCurrentEditStoreService } from './services/game-team-players-current-edit-store.service';
import { GameAction } from '@share/enums';
import { IGameModel } from '@share/models';
import { buildRemovePlayerFromTeamAction } from './game-team-players-current-edit.utils';
import { IGameTeamPlayersFilterFormModel } from '../../../../../../../../components/players/game-team-players-filter-form.model';

@Component({
    selector: 'sfc-game-team-players-current-edit',
    templateUrl: './game-team-players-current-edit.component.html',
    styleUrls: ['./game-team-players-current-edit.component.scss']
})
export class GameTeamPlayersCurrentEditComponent
    extends BaseObservableTableComponent<IGameTeamPlayersFilterFormModel, IGamePlayerSearchTableModel, IGamePlayerSearchTableModel> {

    LoadContainerLoadType = LoadContainerLoadType;

    @Input()
    game!: IGameModel;

    @Input()
    filterForm!: FormGroup;

    @Output()
    remove: EventEmitter<IGamePlayerSearchTableModel> = new EventEmitter<IGamePlayerSearchTableModel>();

    // component
    Localization = GameTeamPlayersCurrentEditLocalization;
    Constants = GameTeamPlayersCurrentEditConstants;

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

    data$: Observable<IGamePlayerSearchTableModel[]> = this.gameTeamPlayersCurrentEditStoreService.value$;

    /* End Table */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGamePlayerPredicateMapModel;

    protected override reloadEvents: string[] = [GameAction.GamePlayer];

    /* End Override */

    constructor(
        private router: Router,
        public gameTeamPlayersGameEditSelectService: GameTeamPlayersCurrentEditSelectService,
        public gameTeamPlayersCurrentEditStoreService: GameTeamPlayersCurrentEditStoreService,
        enumService: EnumService,
        themeService: ThemeService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, changeDetector);
    }

    protected buildPredicateForm(): FormGroup<any> {
        return this.filterForm;
    }

    protected mapTableModel(item: IGamePlayerSearchTableModel): IGamePlayerSearchTableModel {

        item.actions = this.buildActions(item);
        return item;
    }

    public onSelect(event: ITableSelectEvent): void {
        if (!event.args) return;

        if (event.selected) {
            this.gameTeamPlayersGameEditSelectService.select(event.args);
        } else {
            this.gameTeamPlayersGameEditSelectService.unselect(event.args);
        }
    }

    public filterFunc(data: IGamePlayerSearchTableModel[], parameters: ILoadContainerParameters): IGamePlayerSearchTableModel[] {
        const name = parameters.params.value.name?.toLowerCase(),
            result = where(data,
                item => isNullOrEmptyString(name) ||
                    item.gamePlayer.player!.general.firstName.toLowerCase().includes(name) ||
                    item.gamePlayer.player!.general.lastName.toLowerCase().includes(name)) || [];

        return result
    }

    private buildActions(model: IGamePlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router),
            actions: IDropdownMenuItemModel[] = [
                buildRemovePlayerFromTeamAction(() => this.remove.emit(model)),
                buildViewPlayerAction(model.gamePlayer.id, this.router),
                buildViewGamePlayerAction(this.game.game.id, model.gamePlayer.id, actionParameters)
            ];

        return actions;
    }
}