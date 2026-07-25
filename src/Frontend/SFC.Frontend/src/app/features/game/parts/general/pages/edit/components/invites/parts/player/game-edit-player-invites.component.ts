import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, buildInviteGamePlayerSearchFilterFormGroup, IInviteGamePlayerSearchFilterModel, IInviteGamePlayerSearchTableModel, InviteGamePlayerFilterPart, InviteGamePlayerSearchFilterPart, InviteGamePlayerSearchTableColumn, InviteGamePlayerSearchTableLocalization, mapFindInviteGamePlayerRequest, mapInviteGamePlayerPredicateMapModel, mapInviteGamePlayerSearchTableModel, TeamPlayerSearchFilterLocalization } from '@share/components';
import { EnumService, IFindInviteGamePlayerFilterModel, IInviteGamePlayerServiceModel, InviteGamePlayerService } from '@share/services';
import { ButtonType, CommonConstants, empty, IPaginationModel, ISortingModel, ModalService, ReloadService, SortingDirection } from 'ngx-sfc-common';
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
import { buildCancelInviteGamePlayerAction, buildEditInviteGamePlayerAction, buildViewInviteGamePlayerAction, buildViewPlayerAction, isInviteGamePlayerActual, mapBubbles } from '@share/utils';
import { PlayersFilterPart } from '@share/components/features/player/search/filters/enums/players-filter-part.enum';
import { PlayersFiltersLocalization } from '@share/components/features/player/search/filters';
import { GameEditPlayerInvitesLocalization } from './game-edit-player-invites.localization';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameRoute, InviteAction, InviteRoute, PlayerRoute } from '@share/enums';
import { RouteKey } from '@core/enums';
import { IGameEditPageModel } from '../../../../models/game-edit-page.model';

@Component({
    selector: 'sfc-game-edit-player-invites',
    templateUrl: './game-edit-player-invites.component.html',
    styleUrls: ['./game-edit-player-invites.component.scss']
})
export class GameEditPlayerInvitesComponent
    extends BaseTableComponent<IInviteGamePlayerSearchFilterModel, IFindInviteGamePlayerFilterModel, IInviteGamePlayerServiceModel, IInviteGamePlayerSearchTableModel> {

    faPlus = faPlus;
    faQuestionCircle = faQuestionCircle;

    CommonConstants = CommonConstants;

    ButtonType = ButtonType;

    // share
    TeamPlayerSearchFilterLocalization = TeamPlayerSearchFilterLocalization;
    PlayersFiltersLocalization = PlayersFiltersLocalization;
    InviteGamePlayerSearchFilterPart = InviteGamePlayerSearchFilterPart;
    InviteGamePlayerFilterPart = InviteGamePlayerFilterPart;
    PlayersFilterPart = PlayersFilterPart;
    InviteAction = InviteAction;

    // component
    Localization = GameEditPlayerInvitesLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: InviteGamePlayerSearchTableLocalization.COLUMN.RATING,
            field: InviteGamePlayerSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: InviteGamePlayerSearchTableLocalization.COLUMN.NAME,
            field: InviteGamePlayerSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: InviteGamePlayerSearchTableLocalization.COLUMN.POSITION,
            field: InviteGamePlayerSearchTableColumn.Position
        },
        {
            name: InviteGamePlayerSearchTableLocalization.COLUMN.STATUS,
            field: InviteGamePlayerSearchTableColumn.Status
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: InviteGamePlayerSearchTableColumn.Actions,
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

    public statuses: IBubbleModel[] = mapBubbles(this.enumService.enums.inviteStatuses);

    /* End Fields */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapInviteGamePlayerPredicateMapModel;

    protected override reloadEvents: string[] = [InviteAction.GamePlayer];

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private inviteGamePlayerService: InviteGamePlayerService,
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
            [`${InviteRoute.Invites}/${GameRoute.Games}/${this.model.game.game.id}/${PlayerRoute.Players}/${RouteKey.Create}`],
            this.backNavigationExtras
        );
    }

    protected buildPredicateForm(): FormGroup<any> {
        const formGroup: FormGroup = buildInviteGamePlayerSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: IInviteGamePlayerSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindInviteGamePlayerFilterModel> {
        return mapFindInviteGamePlayerRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindInviteGamePlayerFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IInviteGamePlayerServiceModel>>> {
        return this.inviteGamePlayerService.find(this.model.game.game.id, request);
    }

    protected mapTableModel(item: IInviteGamePlayerServiceModel): IInviteGamePlayerSearchTableModel {
        return mapInviteGamePlayerSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: IInviteGamePlayerSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildViewPlayerAction(model.player.id, this.router),
                buildViewInviteGamePlayerAction(model.id, this.model.game.game.id, model.player.id, actionParameters)
            ];

        if (isInviteGamePlayerActual(model.status, this.enumService.enums)) {
            return [
                buildEditInviteGamePlayerAction(model.id, this.model.game.game.id, model.player.id, actionParameters),
                buildCancelInviteGamePlayerAction(model, this.modalService, actionParameters),
                ...actions
            ];
        }

        return actions;
    }
}