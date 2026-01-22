import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { BasePaginationRequest, BaseListResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { buildBackNavigationExtras, getDataFromParentRoute, MapPredicateModelFunction } from "@core/utils";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { 
    BaseTableComponent, buildTeamPlayerSearchFilterFormGroup, mapFindTeamPlayersRequest, 
    mapTeamPlayerPredicateMapModel, TeamPlayerSearchFilterPart, TeamPlayerSearchFilterLocalization, 
    TeamPlayerSearchTableColumn, TeamPlayerSearchTableLocalization 
} from "@share/components";
import { PlayersFilterPart } from "@share/components/features/player/search/filters/enums/players-filter-part.enum";
import { PlayersFiltersLocalization } from "@share/components/features/player/search/filters/localization/players-filter.localization";
import { ITeamPlayerSearchFilterModel } from "@share/components/features/team/players/search/filters/models/team-player-search-filter.model";
import { mapTeamPlayerSearchTableModel } from "@share/components/features/team/players/search/table/team-player-search-table.mapper";
import { ITeamPlayerSearchTableModel } from "@share/components/features/team/players/search/table/team-player-search-table.model";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { ITeamModel } from "@share/models";
import { EnumService, IFindTeamPlayersFilterModel, ITeamPlayerServiceModel, TeamPlayerService } from "@share/services";
import { buildViewPlayerAction, buildViewTeamPlayerAction } from "@share/utils";
import { IPaginationModel, ISortingModel, empty, ReloadService, SortingDirection, CommonConstants } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from "ngx-sfc-components";
import { Observable } from "rxjs";
import { TeamLocalization } from "src/app/features/team/localization";
import { TeamViewPageConstants } from "../../team-view-page.constants";
import { TeamViewPlayersLocalization } from "./team-view-players.localization";

@Component({
    templateUrl: './team-view-players.component.html',
    styleUrls: ['./team-view-players.component.scss']
})
export class TeamViewPlayersComponent
    extends BaseTableComponent<ITeamPlayerSearchFilterModel, IFindTeamPlayersFilterModel, ITeamPlayerServiceModel, ITeamPlayerSearchTableModel> {

    // share
    TeamPlayerSearchFilterLocalization = TeamPlayerSearchFilterLocalization;
    PlayersFiltersLocalization = PlayersFiltersLocalization;
    TeamPlayerSearchFilterPart = TeamPlayerSearchFilterPart;
    PlayersFilterPart = PlayersFilterPart;

    // component
    Localization = TeamViewPlayersLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
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
            }
        },
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.POSITION,
            field: TeamPlayerSearchTableColumn.Position
        },
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.STATUS,
            field: TeamPlayerSearchTableColumn.Status
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Actions,
            type: TableColumnType.Action,
            width: 10
        }
    ];

    /* End Table */

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromParentRoute<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapTeamPlayerPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private teamPlayerService: TeamPlayerService,
        private router: Router,
        private route: ActivatedRoute,
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
        const formGroup: FormGroup = buildTeamPlayerSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: ITeamPlayerSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayersFilterModel> {
        return mapFindTeamPlayersRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindTeamPlayersFilterModel>)
        : Observable<HttpResponse<BaseListResponse<ITeamPlayerServiceModel>>> {
        return this.teamPlayerService.find(this.model.id, request);
    }

    protected mapTableModel(item: ITeamPlayerServiceModel): ITeamPlayerSearchTableModel {
        return mapTeamPlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: ITeamPlayerSearchTableModel): IDropdownMenuItemModel[] {
        return [
            buildViewTeamPlayerAction(this.model.id, model.player.id, this.router, this.backNavigationExtras),
            buildViewPlayerAction(model.player.id, this.router)
        ];
    }
}