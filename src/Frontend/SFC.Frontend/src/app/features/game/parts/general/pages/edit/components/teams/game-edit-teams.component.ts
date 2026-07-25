import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, GamePlayerSearchTableColumn, IGameTeamSearchFilterModel, IGameTeamSearchTableModel, GameTeamSearchTableLocalization, GameTeamSearchTableColumn, mapGameTeamPredicateMapModel, buildGameTeamSearchFilterFormGroup, mapFindGameTeamsRequest, mapGameTeamSearchTableModel, GameTeamSearchFilterPart, GameTeamFilterPart } from '@share/components';
import { EnumService, GameTeamService, IFindGameTeamsFilterModel, IGameTeamServiceModel } from '@share/services';
import { ButtonType, CommonConstants, empty, IPaginationModel, ISortingModel, ModalService, ReloadService, SortingDirection } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from 'ngx-sfc-components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { NotificationService } from '@core/services';
import { GameLocalization } from 'src/app/features/game/localization';
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from '@core/models';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { buildEditGameTeamAction, buildViewGameTeamAction, buildViewTeamAction, mapBubbles } from '@share/utils';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameEditPageConstants } from '../../game-edit-page.constants';
import { GameEditTeamsLocalization } from './game-edit-teams.localization';
import { GameRoute, TeamRoute } from '@share/enums';
import { RouteKey } from '@core/enums';
import { IGameEditPageModel } from '../../models/game-edit-page.model';

@Component({
    selector: 'sfc-game-edit-teams',
    templateUrl: './game-edit-teams.component.html',
    styleUrls: ['./game-edit-teams.component.scss']
})
export class GameEditTeamsComponent
    extends BaseTableComponent<IGameTeamSearchFilterModel, IFindGameTeamsFilterModel, IGameTeamServiceModel, IGameTeamSearchTableModel> {

    faQuestionCircle = faQuestionCircle;
    faPlus = faPlus;

    CommonConstants = CommonConstants;

    ButtonType = ButtonType;

    // share
    GameTeamSearchFilterPart = GameTeamSearchFilterPart;
    GameTeamFilterPart = GameTeamFilterPart;

    // component
    Localization = GameEditTeamsLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: GameTeamSearchTableLocalization.COLUMN.RATING,
            field: GameTeamSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: GameTeamSearchTableLocalization.COLUMN.NAME,
            field: GameTeamSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: GameTeamSearchTableLocalization.COLUMN.STATUS,
            field: GameTeamSearchTableColumn.Status
        },
        {
            name: GameTeamSearchTableLocalization.COLUMN.PLAYERS_COUNT,
            field: GameTeamSearchTableColumn.Players
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

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.gameTeamStatuses);

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGameTeamPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private gameTeamService: GameTeamService,
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

    public navigateToCreatePage(): void {
        this.router.navigate(
            [`${GameRoute.Games}/${this.model.game.game.id}/${TeamRoute.Teams}/${RouteKey.Create}`],
            this.backNavigationExtras
        );
    }

    protected buildPredicateForm(): FormGroup {
        const formGroup: FormGroup = buildGameTeamSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: IGameTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindGameTeamsFilterModel> {
        return mapFindGameTeamsRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindGameTeamsFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IGameTeamServiceModel>>> {
        return this.gameTeamService.find(this.model.game.game.id, request, false);
    }

    protected mapTableModel(item: IGameTeamServiceModel): IGameTeamSearchTableModel {
        return mapGameTeamSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: IGameTeamSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildEditGameTeamAction(this.model.game.game.id, model.gameTeam.id, actionParameters),
                buildViewTeamAction(model.gameTeam.id, this.router),
                buildViewGameTeamAction(this.model.game.game.id, model.gameTeam.id, actionParameters)
            ];

        return actions;
    }
}