import { ChangeDetectorRef, Component } from '@angular/core';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { EnumService, ISchemeGameTeamFilterFindModel, ISchemeGameTeamServiceModel, SchemeGameTeamService } from '@share/services';
import { CommonConstants, empty, IPaginationModel, ISortingModel, ModalService, ReloadService, SortingDirection } from 'ngx-sfc-common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameTeamEditSchemesLocalization } from './game-team-edit-schemes.localization';
import { IGameTeamEditPageModel } from '../../models/game-team-edit-page.model';
import { GameTeamEditPageConstants } from '../../game-team-edit-page.constants';
import { ButtonType } from 'ngx-sfc-common';
import { Route } from '@share/enums';
import { RouteKey } from '@core/enums';
import { BaseTableComponent, buildSchemeGameTeamSearchFilterFormGroup, ISchemeGameTeamSearchFilterModel, ISchemeGameTeamSearchTableModel, mapSchemeGameTeamFindRequest, mapSchemeGameTeamPredicateMapModel, mapSchemeGameTeamSearchTableModel, SchemeGameTeamSearchTableColumn, SchemeGameTeamSearchTableLocalization } from '@share/components';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { NotificationService } from '@core/services';
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from '@core/models';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from 'ngx-sfc-components';
import { buildEditSchemeGameTeamAction, buildRemoveSchemeGameTeamAction, buildViewSchemeGameTeamAction } from '@share/utils';
import { CoreConstants } from '@core/constants';
import { TeamLocalization } from '@share/localization';

@Component({
    selector: 'sfc-game-team-edit-schemes',
    templateUrl: './game-team-edit-schemes.component.html',
    styleUrls: ['./game-team-edit-schemes.component.scss']
})
export class GameTeamEditSchemesComponent
    extends BaseTableComponent<ISchemeGameTeamSearchFilterModel, ISchemeGameTeamFilterFindModel, ISchemeGameTeamServiceModel, ISchemeGameTeamSearchTableModel> {

    // icons
    faPlus = faPlus;
    faQuestionCircle = faQuestionCircle;

    ButtonType = ButtonType;

    CommonConstants = CommonConstants;

    // component
    Localization = GameTeamEditSchemesLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: SchemeGameTeamSearchTableLocalization.COLUMN.RATING,
            field: SchemeGameTeamSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: SchemeGameTeamSearchTableLocalization.COLUMN.NAME,
            field: SchemeGameTeamSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: SchemeGameTeamSearchTableLocalization.COLUMN.COMMENT,
            field: SchemeGameTeamSearchTableColumn.Comment
        },
        {
            name: SchemeGameTeamSearchTableLocalization.COLUMN.PLAYERS,
            field: SchemeGameTeamSearchTableColumn.Players
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: SchemeGameTeamSearchTableColumn.Actions,
            type: TableColumnType.Action,
            width: 10
        }
    ];

    /* End Table */

    /* Fields */

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Properties */

    public get model(): IGameTeamEditPageModel {
        return getDataFromRouteRecursively<IGameTeamEditPageModel>(this.route, GameTeamEditPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapSchemeGameTeamPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private schemeGameTeamService: SchemeGameTeamService,
        private router: Router,
        enumService: EnumService,
        private modalService: ModalService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        private route: ActivatedRoute,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
    }

    protected buildPredicateForm(): FormGroup {
        const formGroup: FormGroup = buildSchemeGameTeamSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: ISchemeGameTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<ISchemeGameTeamFilterFindModel> {
        return mapSchemeGameTeamFindRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<ISchemeGameTeamFilterFindModel>): Observable<HttpResponse<BaseListResponse<ISchemeGameTeamServiceModel>>> {
        return this.schemeGameTeamService.find(this.model.game.game.id, this.model.gameTeam.gameTeam.id, request);
    }

    protected mapTableModel(item: ISchemeGameTeamServiceModel): ISchemeGameTeamSearchTableModel {
        return mapSchemeGameTeamSearchTableModel(item, this.enumService, (gameTeamScheme: ISchemeGameTeamSearchTableModel) => { return this.buildActions(gameTeamScheme) });
    }

    public navigateToCreatePage(): void {
        this.router.navigate(
            [`${Route.Schemes}/${Route.Games}/${this.model.game.game.id}/${Route.Teams}/${this.model.gameTeam.gameTeam.id}/${RouteKey.Create}`],
            this.backNavigationExtras
        );
    }

    private buildActions(scheme: ISchemeGameTeamSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildEditSchemeGameTeamAction(this.model.game.game.id, this.model.gameTeam.gameTeam.id, scheme.id, this.router, this.backNavigationExtras),
                buildRemoveSchemeGameTeamAction(this.modalService, scheme),
                buildViewSchemeGameTeamAction(this.model.game.game.id, this.model.gameTeam.gameTeam.id, scheme.id, actionParameters)
            ];

        return actions;
    }
}