import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, RequestGamePlayerSearchTableColumn, TeamPlayerSearchFilterLocalization, IGamePlayerSearchFilterModel, IGamePlayerSearchTableModel, GamePlayerSearchFilterPart, GamePlayerFilterPart, GamePlayerSearchTableLocalization, GamePlayerSearchTableColumn, mapGamePlayerPredicateMapModel, buildGamePlayerSearchFilterFormGroup, mapGamePlayerFindRequest, mapGamePlayerSearchTableModel } from '@share/components';
import { EnumService, GamePlayerService, IGamePlayerFindFilterModel, IGamePlayerServiceModel } from '@share/services';
import { CommonConstants, empty, IPaginationModel, ISortingModel, ModalService, ReloadService, SortingDirection } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from 'ngx-sfc-components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { NotificationService } from '@core/services';
import { GameLocalization } from 'src/app/features/game/localization';
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from '@core/models';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { buildViewGamePlayerAction, buildViewPlayerAction, mapBubbles } from '@share/utils';
import { PlayersFilterPart } from '@share/components/features/player/search/filters/enums/players-filter-part.enum';
import { PlayersFiltersLocalization } from '@share/components/features/player/search/filters';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameEditPlayersLocalization } from './game-edit-players.localization';
import { GameEditPageConstants } from '../../game-edit-page.constants';
import { IGameEditPageModel } from '../../models/game-edit-page.model';
import { GamePlayerIncludes } from '@share/enums';

@Component({
    selector: 'sfc-game-edit-players',
    templateUrl: './game-edit-players.component.html',
    styleUrls: ['./game-edit-players.component.scss']
})
export class GameEditPlayersComponent
    extends BaseTableComponent<IGamePlayerSearchFilterModel, IGamePlayerFindFilterModel, IGamePlayerServiceModel, IGamePlayerSearchTableModel> {

    faQuestionCircle = faQuestionCircle;

    CommonConstants = CommonConstants;

    // share
    TeamPlayerSearchFilterLocalization = TeamPlayerSearchFilterLocalization;
    PlayersFiltersLocalization = PlayersFiltersLocalization;
    GamePlayerSearchFilterPart = GamePlayerSearchFilterPart;
    GamePlayerFilterPart = GamePlayerFilterPart;
    PlayersFilterPart = PlayersFilterPart;

    // component
    Localization = GameEditPlayersLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
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
            }
        },
        {
            name: GamePlayerSearchTableLocalization.COLUMN.POSITION,
            field: RequestGamePlayerSearchTableColumn.Position
        },
        {
            name: GamePlayerSearchTableLocalization.COLUMN.STATUS,
            field: GamePlayerSearchTableColumn.Status
        },
        {
            name: GamePlayerSearchTableLocalization.COLUMN.TEAM,
            field: GamePlayerSearchTableColumn.Team
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: GamePlayerSearchTableColumn.Actions,
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

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.gamePlayerStatuses);

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGamePlayerPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private gamePlayerService: GamePlayerService,
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
        const formGroup: FormGroup = buildGamePlayerSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: IGamePlayerSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IGamePlayerFindFilterModel> {
        return mapGamePlayerFindRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IGamePlayerFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IGamePlayerServiceModel>>> {
        return this.gamePlayerService.find(this.model.game.game.id, request, [GamePlayerIncludes.WithPlayer, GamePlayerIncludes.WithGameTeamWithTeam]);
    }

    protected mapTableModel(item: IGamePlayerServiceModel): IGamePlayerSearchTableModel {
        return mapGamePlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: IGamePlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildViewPlayerAction(model.gamePlayer.id, this.router),
                buildViewGamePlayerAction(this.model.game.game.id, model.gamePlayer.id, actionParameters)
            ];

        return actions;
    }
}