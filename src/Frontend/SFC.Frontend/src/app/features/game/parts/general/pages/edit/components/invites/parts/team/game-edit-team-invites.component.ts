import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreConstants } from '@core/constants';
import { buildActionParameters, buildBackNavigationExtras, getDataFromRouteRecursively, MapPredicateModelFunction } from '@core/utils';
import { BaseTableComponent, buildInviteGameTeamSearchFilterFormGroup, IInviteGameTeamSearchFilterModel, IInviteGameTeamSearchTableModel, InviteGameTeamFilterPart, InviteGameTeamSearchFilterPart, InviteGameTeamSearchTableColumn, InviteGameTeamSearchTableLocalization, mapFindInviteGameTeamRequest, mapInviteGameTeamPredicateMapModel, mapInviteGameTeamSearchTableModel } from '@share/components';
import { EnumService, IInviteGameTeamFindFilterModel, IInviteGameTeamServiceModel, InviteGameTeamService } from '@share/services';
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
import { buildCancelInviteGameTeamAction, buildEditInviteGameTeamAction, buildViewInviteGameTeamAction, buildViewTeamAction, isInviteGameTeamActual, mapBubbles } from '@share/utils';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameRoute, InviteAction, InviteRoute, TeamRoute } from '@share/enums';
import { RouteKey } from '@core/enums';
import { GameEditTeamInvitesLocalization } from './game-edit-team-invites.localization';
import { IGameEditPageModel } from '../../../../models/game-edit-page.model';

@Component({
    selector: 'sfc-game-edit-team-invites',
    templateUrl: './game-edit-team-invites.component.html',
    styleUrls: ['./game-edit-team-invites.component.scss']
})
export class GameEditTeamInvitesComponent
    extends BaseTableComponent<IInviteGameTeamSearchFilterModel, IInviteGameTeamFindFilterModel, IInviteGameTeamServiceModel, IInviteGameTeamSearchTableModel> {

    faPlus = faPlus;
    faQuestionCircle = faQuestionCircle;

    CommonConstants = CommonConstants;

    ButtonType = ButtonType;

    // share
    InviteGameTeamSearchFilterPart = InviteGameTeamSearchFilterPart;
    InviteGameTeamFilterPart = InviteGameTeamFilterPart;
    InviteAction = InviteAction;

    // component
    Localization = GameEditTeamInvitesLocalization;

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: InviteGameTeamSearchTableLocalization.COLUMN.RATING,
            field: InviteGameTeamSearchTableColumn.Rating,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: InviteGameTeamSearchTableLocalization.COLUMN.NAME,
            field: InviteGameTeamSearchTableColumn.Information,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: CoreConstants.DEFAULT_SORTING_ICONS
            }
        },
        {
            name: InviteGameTeamSearchTableLocalization.COLUMN.STATUS,
            field: InviteGameTeamSearchTableColumn.Status
        },
        {
            name: InviteGameTeamSearchTableLocalization.COLUMN.PLAYERS_COUNT,
            field: InviteGameTeamSearchTableColumn.Players
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: InviteGameTeamSearchTableColumn.Actions,
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

    protected override mapPredicateModel: MapPredicateModelFunction = mapInviteGameTeamPredicateMapModel;

    protected override reloadEvents: string[] = [InviteAction.GameTeam];

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private inviteGameTeamService: InviteGameTeamService,
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
            [`${InviteRoute.Invites}/${GameRoute.Games}/${this.model.game.game.id}/${TeamRoute.Teams}/${RouteKey.Create}`],
            this.backNavigationExtras
        );
    }

    protected buildPredicateForm(): FormGroup<any> {
        const formGroup: FormGroup = buildInviteGameTeamSearchFilterFormGroup(this.formBuilder);
        return formGroup;
    }

    protected buildPaginationRequest(model: IInviteGameTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IInviteGameTeamFindFilterModel> {
        return mapFindInviteGameTeamRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IInviteGameTeamFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IInviteGameTeamServiceModel>>> {
        return this.inviteGameTeamService.find(this.model.game.game.id, request);
    }

    protected mapTableModel(item: IInviteGameTeamServiceModel): IInviteGameTeamSearchTableModel {
        return mapInviteGameTeamSearchTableModel(item, this.enumService, (model) => this.buildActions(model));
    }

    private buildActions(model: IInviteGameTeamSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildViewTeamAction(model.team.id, this.router),
                buildViewInviteGameTeamAction(model.id, this.model.game.game.id, model.team.id, actionParameters)
            ];

        if (isInviteGameTeamActual(model.status, this.enumService.enums)) {
            return [
                buildEditInviteGameTeamAction(model.id, this.model.game.game.id, model.team.id, actionParameters),
                buildCancelInviteGameTeamAction(model, this.modalService, actionParameters),
                ...actions
            ];
        }

        return actions;
    }
}