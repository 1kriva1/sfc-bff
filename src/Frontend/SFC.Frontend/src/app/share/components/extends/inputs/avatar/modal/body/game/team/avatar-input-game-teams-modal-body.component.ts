import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BasePaginationRequest, BaseListResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { IPaginationModel, ISortingModel, empty, ReloadService, SortingDirection, CommonConstants, isDefined } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from "ngx-sfc-components";
import { Observable } from "rxjs";
import { IAvatarInputGameTeamsModalBodyEventModel } from "./avatar-input-game-teams-modal-body-event.model";
import { AvatarInputGameTeamsModalBodyLocalization } from "./avatar-input-game-teams-modal-body.localization";
import { BaseTableComponent } from "../../../../../../components/table/base-table.component";
import { EnumService, GameTeamService, IFindGameTeamsFilterModel, IGameTeamServiceModel } from "../../../../../../../../services";
import { ThemeService } from "../../../../../../../theme-toggler/services/theme/theme.service";
import { MapPredicateModelFunction } from "@core/utils";
import { 
    buildGameTeamSearchFilterFormGroup, 
    GameTeamFilterPart, 
    GameTeamSearchFilterPart, 
    GameTeamSearchTableColumn, 
    GameTeamSearchTableLocalization, 
    IGameTeamSearchFilterModel, 
    IGameTeamSearchTableModel, 
    mapFindGameTeamsRequest, 
    mapGameTeamPredicateMapModel, 
    mapGameTeamSearchTableModel 
} from "../../../../../../../features";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "../../../../../../../../utils";
import { GameTeamIncludes } from "@share/enums";

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
    GameTeamFilterPart = GameTeamFilterPart;

    // component
    Localization = AvatarInputGameTeamsModalBodyLocalization;

    @Input()
    value: number | null = null;

    @Input()
    gameId!: number;

    @Output()
    selectTeam: EventEmitter<IAvatarInputGameTeamsModalBodyEventModel> = new EventEmitter<IAvatarInputGameTeamsModalBodyEventModel>();

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

    public statuses: IBubbleModel[] = [];

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
        this.statuses = mapBubbles(this.enumService.enums.gameTeamStatuses);
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
        return this.gameTeamService.find(this.gameId, request, [GameTeamIncludes.WithTeamWithPlayersWithPlayer, GameTeamIncludes.WithGameTeamPlayersWithTeamWithPlayersWithPlayer], false);
    }

    protected mapTableModel(item: IGameTeamServiceModel): IGameTeamSearchTableModel {
        return mapGameTeamSearchTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        if (event.selected && isDefined(this.value)) {
            this.value = null;
        }

        this.selectTeam.emit({ selected: event.selected, gameTeam: event.args });
    }
}