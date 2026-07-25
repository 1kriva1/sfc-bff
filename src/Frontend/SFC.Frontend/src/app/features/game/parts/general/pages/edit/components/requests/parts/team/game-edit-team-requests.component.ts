import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, buildRequestGameTeamSearchFilterFormGroup, IRequestGameTeamSearchFilterModel, IRequestGameTeamSearchTableModel, RequestGameTeamSearchFilterPart, RequestGameTeamSearchTableColumn, RequestGameTeamSearchTableLocalization, mapFindRequestGameTeamRequest, mapRequestGameTeamPredicateMapModel, mapRequestGameTeamSearchTableModel, RequestGameTeamFilterPart } from '@share/components';
import { EnumService, IRequestGameTeamFindFilterModel, IRequestGameTeamServiceModel, RequestGameTeamService } from '@share/services';
import { CommonConstants, empty, IPaginationModel, ISortingModel, ModalService, ReloadService, SortingDirection } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from 'ngx-sfc-components';
import { GameEditPageConstants } from '../../../../game-edit-page.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { NotificationService } from '@core/services';
import { GameLocalization } from 'src/app/features/game/localization';
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from '@core/models';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { buildAcceptRequestGameTeamAction, buildDeclineRequestGameTeamAction, buildViewRequestGameTeamAction, buildViewTeamAction, isRequestGameTeamActual, mapBubbles } from '@share/utils';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { RequestAction } from '@share/enums';
import { GameEditTeamRequestsLocalization } from './game-edit-team-requests.localization';
import { IGameEditPageModel } from '../../../../models/game-edit-page.model';

@Component({
    selector: 'sfc-game-edit-team-requests',
    templateUrl: './game-edit-team-requests.component.html',
    styleUrls: ['./game-edit-team-requests.component.scss']
})
export class GameEditTeamRequestsComponent
    extends BaseTableComponent<IRequestGameTeamSearchFilterModel, IRequestGameTeamFindFilterModel, IRequestGameTeamServiceModel, IRequestGameTeamSearchTableModel> {

    faQuestionCircle = faQuestionCircle;

    CommonConstants = CommonConstants;

    // share
    RequestGameTeamSearchFilterPart = RequestGameTeamSearchFilterPart;
    RequestGameTeamFilterPart = RequestGameTeamFilterPart;
    RequestAction = RequestAction;

    // component
    Localization = GameEditTeamRequestsLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: RequestGameTeamSearchTableLocalization.COLUMN.RATING,
            field: RequestGameTeamSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: RequestGameTeamSearchTableLocalization.COLUMN.NAME,
            field: RequestGameTeamSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: RequestGameTeamSearchTableLocalization.COLUMN.STATUS,
            field: RequestGameTeamSearchTableColumn.Status
        },
        {
            name: RequestGameTeamSearchTableLocalization.COLUMN.PLAYERS_COUNT,
            field: RequestGameTeamSearchTableColumn.Players
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: RequestGameTeamSearchTableColumn.Actions,
            type: TableColumnType.Action,
            width: 10
        }
    ];

    /* End Table */

    /* Properties */

    public get model(): IGameEditPageModel {
        return getDataFromRouteRecursively<IGameEditPageModel>(this.route, GameEditPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    private backNavigationExtras: NavigationExtras;

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.requestStatuses);

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapRequestGameTeamPredicateMapModel;

    protected override reloadEvents: string[] = [RequestAction.GameTeam];

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private requestGameTeamService: RequestGameTeamService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: ModalService,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, GameLocalization.NAVIGATION_BACK_LABEL);
    }

    protected buildPredicateForm(): FormGroup<any> {
        const formGroup: FormGroup = buildRequestGameTeamSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: IRequestGameTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IRequestGameTeamFindFilterModel> {
        return mapFindRequestGameTeamRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IRequestGameTeamFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IRequestGameTeamServiceModel>>> {
        return this.requestGameTeamService.find(this.model.game.game.id, request);
    }

    protected mapTableModel(item: IRequestGameTeamServiceModel): IRequestGameTeamSearchTableModel {
        return mapRequestGameTeamSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: IRequestGameTeamSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildViewTeamAction(model.team.id, this.router),
                buildViewRequestGameTeamAction(model.id, this.model.game.game.id, model.team.id, actionParameters)
            ];

        if (isRequestGameTeamActual(model.status, this.enumService.enums)) {
            return [
                buildAcceptRequestGameTeamAction(model, this.modalService, actionParameters),
                buildDeclineRequestGameTeamAction(model, this.modalService, actionParameters),
                ...actions
            ];
        }

        return actions;
    }
}