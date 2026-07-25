import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { BasePaginationRequest, BaseListResponse, IBuildActionParameters } from "@core/models";
import { NotificationService } from "@core/services";
import { buildActionParameters, buildBackNavigationExtras, getDataFromParentRoute, MapPredicateModelFunction } from "@core/utils";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import {
    BaseTableComponent, 
    buildSchemeTeamSearchFilterFormGroup, 
    ISchemeTeamSearchFilterModel, 
    ISchemeTeamSearchTableModel, 
    mapFindTeamSchemesRequest,
    mapSchemeTeamPredicateMapModel,
    mapSchemeTeamSearchTableModel,
    SchemeTeamSearchFilterLocalization, 
    SchemeTeamSearchFilterPart, 
    SchemeTeamSearchTableColumn, 
    SchemeTeamSearchTableLocalization, 
    TeamPlayerSearchTableColumn
} from "@share/components";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { ITeamModel } from "@share/models";
import { EnumService, IFindTeamSchemesFilterModel, ITeamSchemeServiceModel, SchemeTeamService } from "@share/services";
import { ITeamSchemeModel } from "@share/services/scheme/team/general/models/common/team-scheme.model";
import { buildViewSchemeTeamAction } from "@share/utils";
import { IPaginationModel, ISortingModel, empty, ReloadService, SortingDirection, CommonConstants } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from "ngx-sfc-components";
import { Observable } from "rxjs";
import { TeamViewPageConstants } from "../../team-view-page.constants";
import { TeamViewSchemesLocalization } from "./team-view-schemes.localization";
import { TeamLocalization } from "@share/localization";

@Component({
    templateUrl: './team-view-schemes.component.html',
    styleUrls: ['./team-view-schemes.component.scss']
})
export class TeamViewSchemesComponent
    extends BaseTableComponent<ISchemeTeamSearchFilterModel, IFindTeamSchemesFilterModel, ITeamSchemeServiceModel, ISchemeTeamSearchTableModel> {

    // share
    SchemeTeamSearchFilterLocalization = SchemeTeamSearchFilterLocalization;
    SchemeTeamSearchFilterPart = SchemeTeamSearchFilterPart;

    // component
    Localization = TeamViewSchemesLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: SchemeTeamSearchTableLocalization.COLUMN.RATING,
            field: SchemeTeamSearchTableColumn.Rating,
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
            name: SchemeTeamSearchTableLocalization.COLUMN.NAME,
            field: SchemeTeamSearchTableColumn.Information,
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
            name: SchemeTeamSearchTableLocalization.COLUMN.COMMENT,
            field: SchemeTeamSearchTableColumn.Comment
        },
        {
            name: SchemeTeamSearchTableLocalization.COLUMN.PLAYERS,
            field: SchemeTeamSearchTableColumn.Players
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

    protected override mapPredicateModel: MapPredicateModelFunction = mapSchemeTeamPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private schemeTeamService: SchemeTeamService,
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
        const formGroup: FormGroup = buildSchemeTeamSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: ISchemeTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamSchemesFilterModel> {
        return mapFindTeamSchemesRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindTeamSchemesFilterModel>)
        : Observable<HttpResponse<BaseListResponse<ITeamSchemeModel>>> {
        return this.schemeTeamService.find(this.model.id, request);
    }

    protected mapTableModel(item: ITeamSchemeServiceModel): ISchemeTeamSearchTableModel {
        return mapSchemeTeamSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: ISchemeTeamSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras);
        return [
            buildViewSchemeTeamAction(this.model.id, model.id, actionParameters)
        ];
    }
}