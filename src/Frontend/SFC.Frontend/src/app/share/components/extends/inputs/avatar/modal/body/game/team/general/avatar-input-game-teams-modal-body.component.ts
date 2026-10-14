import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BasePaginationRequest, BaseListResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { IPaginationModel, ISortingModel, empty, ReloadService, SortingDirection, CommonConstants } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from "ngx-sfc-components";
import { Observable } from "rxjs";
import { IAvatarInputGameTeamsModalBodyEventModel } from "./avatar-input-game-teams-modal-body-event.model";
import { AvatarInputGameTeamsModalBodyLocalization } from "./avatar-input-game-teams-modal-body.localization";
import { BaseTableComponent } from "../../../../../../../components/table/base-table.component";
import { EnumService, GameTeamService, IFindGameTeamsFilterModel, IFindGameTeamsRequest, IGameTeamServiceModel } from "../../../../../../../../../services";
import { ThemeService } from "../../../../../../../../theme-toggler/services/theme/theme.service";
import { MapPredicateModelFunction } from "@core/utils";
import {
    buildGameTeamSearchFilterFormGroup,
    GameTeamSearchFilterConstants,
    GameTeamSearchFilterPart,
    GameTeamSearchTableColumn,
    GameTeamSearchTableLocalization,
    IGameTeamSearchTableModel,
    mapFindGameTeamsRequest,
    mapGameTeamPredicateMapModel,
    mapGameTeamSearchTableModel
} from "../../../../../../../../features";
import { GameTeamInclude } from "@share/enums";
import { getGameTeamOutOfGameStatusEnum } from "@share/utils";
import { IEnumModel } from "@core/types";
import { IGameTeamSearchFilterModel } from "@share/components/features/game/team/general/search/filters/models/game-team-search-filter.model";

@Component({
    selector: 'sfc-avatar-input-game-teams-modal-body',
    templateUrl: './avatar-input-game-teams-modal-body.component.html',
    styleUrls: ['./avatar-input-game-teams-modal-body.component.scss']
})
export class AvatarInputGameTeamsModalBodyComponent
    extends BaseTableComponent<IGameTeamSearchFilterModel, IFindGameTeamsFilterModel, IGameTeamServiceModel, IGameTeamSearchTableModel>
    implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // share
    GameTeamSearchFilterPart = GameTeamSearchFilterPart;
    GameTeamSearchFilterConstants = GameTeamSearchFilterConstants;

    // component
    Localization = AvatarInputGameTeamsModalBodyLocalization;

    @Input()
    value: number | null = null;

    @Input()
    gameId!: number;

    @Output()
    selectGameTeam: EventEmitter<IAvatarInputGameTeamsModalBodyEventModel> = new EventEmitter<IAvatarInputGameTeamsModalBodyEventModel>();

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: CommonConstants.EMPTY_STRING,
            field: GameTeamSearchTableColumn.Select,
            type: TableColumnType.Selectable,
            width: 10
        },
        {
            name: GameTeamSearchTableLocalization.COLUMN.RATING,
            field: GameTeamSearchTableColumn.Rating
        },
        {
            name: GameTeamSearchTableLocalization.COLUMN.NAME,
            field: GameTeamSearchTableColumn.Information,
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
            name: GameTeamSearchTableLocalization.COLUMN.STATUS,
            field: GameTeamSearchTableColumn.Status
        },
        {
            name: GameTeamSearchTableLocalization.COLUMN.PLAYERS_COUNT,
            field: GameTeamSearchTableColumn.Players
        }
    ];

    /* End Table */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapGameTeamPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private gameTeamService: GameTeamService,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    protected buildPredicateForm(): FormGroup {
        return buildGameTeamSearchFilterFormGroup(this.formBuilder);
    }

    protected buildPaginationRequest(model: IGameTeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindGameTeamsFilterModel> {
        const request: IFindGameTeamsRequest = mapFindGameTeamsRequest(model, pagination, sorting),
            gameTeamOutOfGameEnum: IEnumModel<number> = getGameTeamOutOfGameStatusEnum(this.enumService.enums);
        request.Filter.GameTeam!.Statuses = [gameTeamOutOfGameEnum.key];
        return request;
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindGameTeamsFilterModel>)
        : Observable<HttpResponse<BaseListResponse<IGameTeamServiceModel>>> {
        return this.gameTeamService.find(this.gameId, request, [GameTeamInclude.TeamProfile, GameTeamInclude.TeamWithTeamPlayersWithPlayerProfile], false);
    }

    protected mapTableModel(item: IGameTeamServiceModel): IGameTeamSearchTableModel {
        return mapGameTeamSearchTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        this.selectGameTeam.emit({ selected: event.selected, gameTeam: event.args });
    }
}