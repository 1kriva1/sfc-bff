import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from "@core/models";
import { NotificationService } from "@core/services";
import {
    BaseSearchComponent,
    IGameSearchFilterModel,
    IGameSearchTableModel,
    GameSearchFilterPart,
    GameSearchTableLocalization,
    GameSearchTableColumn,
    buildGamePredicateMapModel,
    buildGameSearchFilterFormGroup,
    mapGameFindRequest,
    mapGameSearchTableModel,
    GameSearchFilterGeneralLocalization,
    GameSearchFilterGeneralPart
} from "@share/components";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService, GameService, IGameFindFilterModel, IGameServiceModel } from "@share/services";
import { CommonConstants, empty, IPaginationModel, ISortingModel, ReloadService, SortingDirection } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { GameSearchPageLocalization } from "./game-search-page.localization";
import { buildViewGameAction } from "@share/utils";
import { Router } from "@angular/router";
import { buildActionParameters, MapPredicateModelFunction } from "@core/utils";
import { faCartFlatbed, faMoneyBill, faPeopleGroup, faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { ITabModel, TableColumnType, ITableColumnExtendedModel, IDropdownMenuItemModel } from "ngx-sfc-components";
import { GameInclude } from "@share/enums";

@Component({
    templateUrl: './game-search-page.component.html',
    styleUrls: ['./game-search-page.component.scss']
})
export class GameSearchPageComponent
    extends BaseSearchComponent<
        IGameSearchFilterModel,
        IGameFindFilterModel,
        IGameServiceModel,
        IGameSearchTableModel> {

    // share
    GameSearchFilterPart = GameSearchFilterPart;
    GameSearchFilterGeneralLocalization = GameSearchFilterGeneralLocalization;

    // component
    Localization = GameSearchPageLocalization;

    /* Page */

    public tabs: ITabModel[] = [
        {
            label: GameSearchPageLocalization.TABS.GENERAL.LABEL,
            icon: faPeopleGroup,
            selected: true,
            data: GameSearchFilterPart.General
        },
        {
            label: GameSearchPageLocalization.TABS.FINANCIAL.LABEL,
            icon: faMoneyBill,
            data: GameSearchFilterPart.Financial
        },
        {
            label: GameSearchPageLocalization.TABS.INVENTARY.LABEL,
            icon: faCartFlatbed,
            data: GameSearchFilterPart.Inventary
        }
    ];

    public columns: ITableColumnExtendedModel[] = [
        {
            name: GameSearchTableLocalization.COLUMN.RESULT,
            field: GameSearchTableColumn.Result,
            width: 25
        },
        {
            name: GameSearchTableLocalization.COLUMN.NAME,
            field: GameSearchTableColumn.Name,
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
            name: GameSearchTableLocalization.COLUMN.DATE,
            field: GameSearchTableColumn.Date
        },
        {
            name: GameSearchTableLocalization.COLUMN.STATUS,
            field: GameSearchTableColumn.Status
        },
        {
            name: GameSearchTableLocalization.COLUMN.LOCATION,
            field: GameSearchTableColumn.Location
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: GameSearchTableColumn.Actions,
            type: TableColumnType.Action,
            width: 10
        }
    ];

    public generalFiltersParts: GameSearchFilterGeneralPart[] = [
        GameSearchFilterGeneralPart.Tag,
        GameSearchFilterGeneralPart.Status,
        GameSearchFilterGeneralPart.Date,
        GameSearchFilterGeneralPart.From,
        GameSearchFilterGeneralPart.To,
        GameSearchFilterGeneralPart.Location
    ];

    /* End Page */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = buildGamePredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
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
        const formGroup: FormGroup = buildGameSearchFilterFormGroup(this.formBuilder)
        return formGroup;
    }

    buildPaginationRequest(model: IGameSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IGameFindFilterModel> {
        return mapGameFindRequest(model, pagination, sorting);
    }

    sendPaginationRequest(request: BasePaginationRequest<IGameFindFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IGameServiceModel>>> {
        return this.gameService.find(request, [
            GameInclude.Profile, 
            GameInclude.GameTeamsWithTeamProfile,
            GameInclude.GameTeamsWithGameTeamPlayersWithGamePlayerWithPlayerProfile,
            GameInclude.GameTeamsWithGameTeamPlayersWithTeamPlayerWithPlayerProfile
        ], false);
    }

    mapTableModel(model: IGameServiceModel): IGameSearchTableModel {
        return mapGameSearchTableModel(model, this.enumService, (model: IGameSearchTableModel) => this.buildActions(model));
    }

    private buildActions(model: IGameSearchTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router);

        return [
            buildViewGameAction(model.game.id, actionParameters)
        ];
    }
}