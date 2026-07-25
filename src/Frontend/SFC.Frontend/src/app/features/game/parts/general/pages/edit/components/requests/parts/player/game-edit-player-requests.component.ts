import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, buildRequestGamePlayerSearchFilterFormGroup, IRequestGamePlayerSearchFilterModel, IRequestGamePlayerSearchTableModel, RequestGamePlayerSearchFilterPart, RequestGamePlayerSearchTableColumn, RequestGamePlayerSearchTableLocalization, mapFindRequestGamePlayerRequest, mapRequestGamePlayerPredicateMapModel, mapRequestGamePlayerSearchTableModel, TeamPlayerSearchFilterLocalization, RequestGamePlayerFilterPart } from '@share/components';
import { EnumService, IRequestGamePlayerFindFilterModel, IRequestGamePlayerServiceModel, RequestGamePlayerService } from '@share/services';
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
import { buildAcceptRequestGamePlayerAction, buildDeclineRequestGamePlayerAction, buildViewPlayerAction, buildViewRequestGamePlayerAction, isRequestGamePlayerActual, mapBubbles } from '@share/utils';
import { PlayersFilterPart } from '@share/components/features/player/search/filters/enums/players-filter-part.enum';
import { PlayersFiltersLocalization } from '@share/components/features/player/search/filters';
import { GameEditPlayerRequestsLocalization } from './game-edit-player-requests.localization';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { RequestAction } from '@share/enums';
import { IGameEditPageModel } from '../../../../models/game-edit-page.model';

@Component({
    selector: 'sfc-game-edit-player-requests',
    templateUrl: './game-edit-player-requests.component.html',
    styleUrls: ['./game-edit-player-requests.component.scss']
})
export class GameEditPlayerRequestsComponent
    extends BaseTableComponent<IRequestGamePlayerSearchFilterModel, IRequestGamePlayerFindFilterModel, IRequestGamePlayerServiceModel, IRequestGamePlayerSearchTableModel> {

    faQuestionCircle = faQuestionCircle;

    CommonConstants = CommonConstants;

    // share
    TeamPlayerSearchFilterLocalization = TeamPlayerSearchFilterLocalization;
    PlayersFiltersLocalization = PlayersFiltersLocalization;
    RequestGamePlayerSearchFilterPart = RequestGamePlayerSearchFilterPart;
    RequestGamePlayerFilterPart = RequestGamePlayerFilterPart;
    PlayersFilterPart = PlayersFilterPart;
    RequestAction = RequestAction;

    // component
    Localization = GameEditPlayerRequestsLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: RequestGamePlayerSearchTableLocalization.COLUMN.RATING,
            field: RequestGamePlayerSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: RequestGamePlayerSearchTableLocalization.COLUMN.NAME,
            field: RequestGamePlayerSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: RequestGamePlayerSearchTableLocalization.COLUMN.POSITION,
            field: RequestGamePlayerSearchTableColumn.Position
        },
        {
            name: RequestGamePlayerSearchTableLocalization.COLUMN.STATUS,
            field: RequestGamePlayerSearchTableColumn.Status
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: RequestGamePlayerSearchTableColumn.Actions,
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

    protected override mapPredicateModel: MapPredicateModelFunction = mapRequestGamePlayerPredicateMapModel;

    protected override reloadEvents: string[] = [RequestAction.GamePlayer];

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private requestGamePlayerService: RequestGamePlayerService,
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
        const formGroup: FormGroup = buildRequestGamePlayerSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: IRequestGamePlayerSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IRequestGamePlayerFindFilterModel> {
        return mapFindRequestGamePlayerRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IRequestGamePlayerFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IRequestGamePlayerServiceModel>>> {
        return this.requestGamePlayerService.find(this.model.game.game.id, request);
    }

    protected mapTableModel(item: IRequestGamePlayerServiceModel): IRequestGamePlayerSearchTableModel {
        return mapRequestGamePlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: IRequestGamePlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildViewPlayerAction(model.player.id, this.router),
                buildViewRequestGamePlayerAction(model.id, this.model.game.game.id, model.player.id, actionParameters)
            ];

        if (isRequestGamePlayerActual(model.status, this.enumService.enums)) {
            return [
                buildAcceptRequestGamePlayerAction(model, this.modalService, actionParameters),
                buildDeclineRequestGamePlayerAction(model, this.modalService, actionParameters),
                ...actions
            ];
        }

        return actions;
    }
}