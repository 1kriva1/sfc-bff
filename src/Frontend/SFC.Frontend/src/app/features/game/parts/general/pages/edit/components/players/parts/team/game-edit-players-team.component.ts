import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants, HttpConstants } from '@core/constants';
import { buildBackNavigationExtras, getDataFromRouteRecursively, mapLoadContainerLoaderResultModel, mapPaginationResponse, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, RequestGamePlayerSearchTableColumn, TeamPlayerSearchFilterLocalization, ITeamPlayerSearchTableModel, TeamPlayerSearchFilterPart, mapFindTeamPlayersRequest, mapTeamPlayerSearchTableModel, TeamPlayerSearchTableLocalization, TeamPlayerSearchTableColumn } from '@share/components';
import { EnumService, GameTeamService, IFindGameTeamsRequest, IFindTeamPlayersFilterModel, IGameTeamServiceModel, ITeamPlayerServiceModel, TeamPlayerService } from '@share/services';
import { CommonConstants, empty, ILoadContainerLoaderResultModel, ILoadContainerParameters, IPaginationModel, isDefined, ISortingModel, ReloadService, SortingDirection } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from 'ngx-sfc-components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { NotificationService } from '@core/services';
import { GameLocalization } from 'src/app/features/game/localization';
import { BaseListResponse, BasePaginationRequest } from '@core/models';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { buildViewPlayerAction, buildViewTeamPlayerAction, mapBubbles } from '@share/utils';
import { PlayersFilterPart } from '@share/components/features/player/search/filters/enums/players-filter-part.enum';
import { PlayersFiltersLocalization } from '@share/components/features/player/search/filters';
import { IAutoCompleteItemModel, IBubbleModel } from 'ngx-sfc-inputs';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameEditPlayersTeamLocalization } from './game-edit-players-team.localization';
import { GameTeamInclude } from '@share/enums';
import { IGameEditPlayersTeamSearchFilterModel } from './game-edit-players-team-search-filter.model';
import { buildGameEditPlayersTeamSearchFilterFormGroup, mapGameEditPlayersTeamPredicateMapModel } from './game-edit-players-team-search-filter.utils';
import { TeamPlayerFilterPart } from '@share/components/features/team/players/search/filters/enums/team-player-filter-part.enum';
import { IGameEditPageModel } from '../../../../models/game-edit-page.model';
import { GameEditPageConstants } from '../../../../game-edit-page.constants';
import { mapFindGameTeamsRequest, mapTeamAutoCompleteItemModel } from './game-edit-players-team.mapper';

@Component({
    selector: 'sfc-game-edit-players-team',
    templateUrl: './game-edit-players-team.component.html',
    styleUrls: ['./game-edit-players-team.component.scss']
})
export class GameEditPlayersTeamComponent
    extends BaseTableComponent<IGameEditPlayersTeamSearchFilterModel, IFindTeamPlayersFilterModel, ITeamPlayerServiceModel, ITeamPlayerSearchTableModel> {

    faQuestionCircle = faQuestionCircle;

    CommonConstants = CommonConstants;

    // share
    TeamPlayerSearchFilterLocalization = TeamPlayerSearchFilterLocalization;
    PlayersFiltersLocalization = PlayersFiltersLocalization;
    TeamPlayerSearchFilterPart = TeamPlayerSearchFilterPart;
    TeamPlayerFilterPart = TeamPlayerFilterPart;
    PlayersFilterPart = PlayersFilterPart;

    // component
    Localization = GameEditPlayersTeamLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.RATING,
            field: TeamPlayerSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.NAME,
            field: TeamPlayerSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: TeamPlayerSearchTableLocalization.COLUMN.POSITION,
            field: RequestGamePlayerSearchTableColumn.Position
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

    public get model(): IGameEditPageModel {
        return getDataFromRouteRecursively<IGameEditPageModel>(this.route, GameEditPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    private backNavigationExtras: NavigationExtras;

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.teamPlayerStatuses);

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGameEditPlayersTeamPredicateMapModel;

    /* End Override */

    public teamsLoader: any = (parameters: ILoadContainerParameters) => this.teamsLoaderFunc(parameters);

    constructor(
        private formBuilder: FormBuilder,
        private teamPlayerService: TeamPlayerService,
        private router: Router,
        private route: ActivatedRoute,
        private gameTeamService: GameTeamService,
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
        return buildGameEditPlayersTeamSearchFilterFormGroup(this.formBuilder);
    }

    protected buildPaginationRequest(model: IGameEditPlayersTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamPlayersFilterModel> {
        return mapFindTeamPlayersRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindTeamPlayersFilterModel>)
        : Observable<HttpResponse<BaseListResponse<ITeamPlayerServiceModel>>> {
        return isDefined(this.predicateForm.value.team?.key)
            ? this.teamPlayerService.find(this.predicateForm.value.team.key, request)
            : HttpConstants.EMPTY_LIST_RESPONSE$;
    }

    protected mapTableModel(item: ITeamPlayerServiceModel): ITeamPlayerSearchTableModel {
        return mapTeamPlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    public teamsLoaderFunc(parameters: ILoadContainerParameters)
        : Observable<ILoadContainerLoaderResultModel<IAutoCompleteItemModel>> {
        const request: IFindGameTeamsRequest = mapFindGameTeamsRequest(parameters);

        return this.gameTeamService.find(this.model.game.game.id, request, [GameTeamInclude.TeamProfile], false).pipe(
            mapPaginationResponse<IGameTeamServiceModel, IAutoCompleteItemModel>((item: IGameTeamServiceModel) => mapTeamAutoCompleteItemModel(item)),
            mapLoadContainerLoaderResultModel()
        );
    }

    private buildActions(model: ITeamPlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actions: IDropdownMenuItemModel[] = [
            buildViewPlayerAction(model.player.id, this.router),
            buildViewTeamPlayerAction(this.predicateForm.value.team.key, model.player.id, this.router, this.backNavigationExtras)
        ];

        return actions;
    }
}