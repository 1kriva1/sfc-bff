import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { BasePaginationRequest, BaseListResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { buildBackNavigationExtras, MapPredicateModelFunction } from "@core/utils";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import {
    BaseTableComponent, ITeamPlayerSearchFilterModel, ITeamPlayerSearchTableModel, mapFindTeamPlayersRequest,
    mapTeamPlayerPredicateMapModel,
    mapTeamPlayerSearchTableModel,
    TeamPlayerSearchTableColumn, TeamPlayerSearchTableLocalization
} from "@share/components";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService, IFindTeamPlayersFilterModel, ITeamPlayerServiceModel, TeamPlayerService } from "@share/services";
import { buildViewPlayerAction, buildViewTeamPlayerAction } from "@share/utils";
import { IPaginationModel, ISortingModel, empty, ReloadService, SortingDirection, CommonConstants, LoadContainerLoadType } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from "ngx-sfc-components";
import { Observable, tap } from "rxjs";
import { GameTeamPlayersTeamLocalization } from "./game-team-players-team.localization";
import { IGameTeamEditPageModel } from "../../../../models/game-team-edit-page.model";
import { GameAction } from "@share/enums";
import { GameTeamPlayersTeamConstants } from "./game-team-players-team.constants";
import { GameTeamPlayersTeamSelectService } from "./game-team-players-team-select.service";
import { TeamLocalization } from "@share/localization";
import { buildAddPlayerToTeamAction } from "./game-team-players-team.utils";
import { IGameTeamPlayersFilterFormModel } from "../../../../../../components/players/game-team-players-filter-form.model";
import { mapTeamPlayerSearchFilterModel } from "../../../../../../components/players/game-team-players.mapper";

@Component({
    selector: 'sfc-game-team-players-team',
    templateUrl: './game-team-players-team.component.html',
    styleUrls: ['./game-team-players-team.component.scss']
})
export class GameTeamPlayersTeamComponent
    extends BaseTableComponent<IGameTeamPlayersFilterFormModel, IFindTeamPlayersFilterModel, ITeamPlayerServiceModel, ITeamPlayerSearchTableModel> {

    LoadContainerLoadType = LoadContainerLoadType;

    // component
    Localization = GameTeamPlayersTeamLocalization;
    Constants = GameTeamPlayersTeamConstants;

    @Input()
    model!: IGameTeamEditPageModel;

    @Input()
    filterForm!: FormGroup<any>;

    @Output()
    add: EventEmitter<ITeamPlayerSearchTableModel> = new EventEmitter<ITeamPlayerSearchTableModel>();

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Select,
            type: TableColumnType.Selectable
        },
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.RATING,
            field: TeamPlayerSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            }
        },
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.NAME,
            field: TeamPlayerSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 40
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Actions,
            type: TableColumnType.Action
        }
    ];

    /* End Table */

    /* Fields */

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapTeamPlayerPredicateMapModel;

    protected override reloadEvents: string[] = [GameAction.GameTeamPlayer];

    /* End Override */

    constructor(
        private teamPlayerService: TeamPlayerService,
        private router: Router,
        private gameTeamPlayersTeamSelectService: GameTeamPlayersTeamSelectService,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
    }

    protected buildPredicateForm(): FormGroup<any> {
        return this.filterForm;
    }

    protected buildPaginationRequest(model: IGameTeamPlayersFilterFormModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayersFilterModel> {
        const filterModel: ITeamPlayerSearchFilterModel = mapTeamPlayerSearchFilterModel(model);
        return mapFindTeamPlayersRequest(filterModel, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindTeamPlayersFilterModel>)
        : Observable<HttpResponse<BaseListResponse<ITeamPlayerServiceModel>>> {
        return this.teamPlayerService.find(this.model.gameTeam.gameTeam.team!.id, request).pipe(
            tap(() => this.gameTeamPlayersTeamSelectService.clear())
        );
    }

    protected mapTableModel(item: ITeamPlayerServiceModel): ITeamPlayerSearchTableModel {
        return mapTeamPlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    public onSelect(event: ITableSelectEvent): void {
        if (!event.args) return;

        if (event.selected) {
            this.gameTeamPlayersTeamSelectService.select(event.args);
        } else {
            this.gameTeamPlayersTeamSelectService.unselect(event.args);
        }
    }

    private buildActions(model: ITeamPlayerSearchTableModel): IDropdownMenuItemModel[] {
        return [
            buildAddPlayerToTeamAction(() => this.add.emit(model)),
            buildViewPlayerAction(model.player.id, this.router),
            buildViewTeamPlayerAction(this.model.gameTeam.gameTeam.id, model.player.id, this.router, this.backNavigationExtras)
        ];
    }
}