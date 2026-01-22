import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseListResponse, BasePaginationRequest } from "@core/models";
import { NotificationService } from "@core/services";
import {
    BaseSearchComponent,
    buildTeamSearchFilterFormGroup,
    ITeamSearchFilterModel, ITeamSearchTableModel,
    mapFindTeamsRequest, mapTeamPredicateMapModel,
    mapTeamSearchTableModel, TeamSearchFilterPart,
    TeamSearchFilterLocalization,
    TeamSearchTableColumn,
    TeamSearchTableLocalization
} from "@share/components";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService, IFindTeamsFilterModel, ITeamServiceModel, TeamService } from "@share/services";
import { CommonConstants, empty, IPaginationModel, ISortingModel, ReloadService, SortingDirection } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { TeamSearchPageLocalization } from "./team-search-page.localization";
import { buildRequestTeamPlayerAction, buildViewTeamAction } from "@share/utils";
import { Router } from "@angular/router";
import { MapPredicateModelFunction } from "@core/utils";
import { faCartFlatbed, faMoneyBill, faPeopleGroup, faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { ITabModel, TableColumnType, ITableColumnExtendedModel, IDropdownMenuItemModel } from "ngx-sfc-components";

@Component({
    templateUrl: './team-search-page.component.html',
    styleUrls: ['./team-search-page.component.scss']
})
export class TeamSearchPageComponent
    extends BaseSearchComponent<
    ITeamSearchFilterModel,
    IFindTeamsFilterModel,
    ITeamServiceModel,
    ITeamSearchTableModel> {

    // share
    TeamSearchFilterLocalization = TeamSearchFilterLocalization;
    TeamSearchFilterPart = TeamSearchFilterPart;

    // component
    Localization = TeamSearchPageLocalization;

    /* Page */

    public tabs: ITabModel[] = [
        {
            label: TeamSearchPageLocalization.TABS.GENERAL.LABEL,
            icon: faPeopleGroup,
            selected: true,
            data: TeamSearchFilterPart.General
        },
        {
            label: TeamSearchPageLocalization.TABS.FINANCIAL.LABEL,
            icon: faMoneyBill,
            data: TeamSearchFilterPart.Financial
        },
        {
            label: TeamSearchPageLocalization.TABS.INVENTARY.LABEL,
            icon: faCartFlatbed,
            data: TeamSearchFilterPart.Inventary
        }
    ];

    public columns: ITableColumnExtendedModel[] = [
        {
            name: TeamSearchTableLocalization.COLUMN.RATING,
            field: TeamSearchTableColumn.Rating
        },
        {
            name: TeamSearchTableLocalization.COLUMN.NAME,
            field: TeamSearchTableColumn.Information,
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
            name: TeamSearchTableLocalization.COLUMN.STATUS,
            field: TeamSearchTableColumn.Status
        },
        {
            name: TeamSearchTableLocalization.COLUMN.PLAYERS_COUNT,
            field: TeamSearchTableColumn.Players
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamSearchTableColumn.Actions,
            type: TableColumnType.Action,
            width: 10
        }
    ];

    /* End Page */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapTeamPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private teamService: TeamService,
        private router: Router,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
    }

    buildPredicateForm(): FormGroup {
        const formGroup: FormGroup = buildTeamSearchFilterFormGroup(this.formBuilder)
        return formGroup;
    }

    buildPaginationRequest(model: ITeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamsFilterModel> {
        return mapFindTeamsRequest(model, pagination, sorting);
    }

    sendPaginationRequest(request: BasePaginationRequest<IFindTeamsFilterModel>)
        : Observable<HttpResponse<BaseListResponse<ITeamServiceModel>>> {
        return this.teamService.find(request, false);
    }

    mapTableModel(team: ITeamServiceModel): ITeamSearchTableModel {
        return mapTeamSearchTableModel(team, this.enumService, (team: ITeamSearchTableModel) => this.buildActions(team));
    }

    private buildActions(team: ITeamSearchTableModel): IDropdownMenuItemModel[] {
        return [
            buildRequestTeamPlayerAction(team, this.router),
            buildViewTeamAction(team.id, this.router)
        ];
    }
}