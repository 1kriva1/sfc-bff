import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BasePaginationRequest, BaseListResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { IForm } from "@core/types";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { IPaginationModel, ISortingModel, empty, ReloadService, SortingDirection, CommonConstants, isDefined } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableSelectEvent, TableColumnType } from "ngx-sfc-components";
import { Observable } from "rxjs";
import { IAvatarInputTeamsModalBodyEventModel } from "./avatar-input-teams-modal-body-event.model";
import { AvatarInputPlayersModalBodyLocalization } from "./avatar-input-teams-modal-body.localization";
import { AvatarInputTeamsModalBodyTableConstants } from "./parts/table/avatar-input-teams-modal-body-table.constants";
import { BaseTableComponent } from "../../../../../../../extends/components/table/base-table.component";
import { ITeamSearchFilterModel, ITeamSearchTableModel, mapFindTeamsRequest, mapTeamPredicateMapModel, mapTeamSearchTableModel, TeamSearchTableColumn, TeamSearchTableLocalization } from "../../../../../../../../components/features/team";
import { IFindTeamsFilterModel, ITeamServiceModel, TeamService } from "../../../../../../../../services/team";
import { EnumService } from "../../../../../../../../services";
import { ThemeService } from "../../../../../../../../components/theme-toggler/services/theme/theme.service";
import { MapPredicateModelFunction } from "@core/utils";

@Component({
    selector: 'sfc-avatar-input-teams-modal-body',
    templateUrl: './avatar-input-teams-modal-body.component.html',
    styleUrls: ['./avatar-input-teams-modal-body.component.scss']
})
export class AvatarInputTeamsModalBodyComponent
    extends BaseTableComponent<ITeamSearchFilterModel, IFindTeamsFilterModel, ITeamServiceModel, ITeamSearchTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = AvatarInputPlayersModalBodyLocalization;
    Constants = AvatarInputTeamsModalBodyTableConstants;

    @Input()
    value: number | null = null;

    @Output()
    selectTeam: EventEmitter<IAvatarInputTeamsModalBodyEventModel> = new EventEmitter<IAvatarInputTeamsModalBodyEventModel>();

    /* Table */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamSearchTableColumn.Select,
            type: TableColumnType.Selectable,
            width: 10
        },
        {
            name: TeamSearchTableLocalization.COLUMN.RATING,
            field: TeamSearchTableColumn.Rating
        },
        {
            name: TeamSearchTableLocalization.COLUMN.NAME,
            field: TeamSearchTableColumn.Information,
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
            name: TeamSearchTableLocalization.COLUMN.STATUS,
            field: TeamSearchTableColumn.Status
        },
        {
            name: TeamSearchTableLocalization.COLUMN.PLAYERS_COUNT,
            field: TeamSearchTableColumn.Players
        }
    ];

    /* End Table */

    /* Override */

    protected override mapPredicateModel: MapPredicateModelFunction = mapTeamPredicateMapModel;

    /* End Override */

    constructor(
        private formBuilder: FormBuilder,
        private teamService: TeamService,
        enumService: EnumService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef
    ) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
    }

    protected buildPredicateForm(): FormGroup {
        const controls: IForm<ITeamSearchFilterModel> = {
            name: [null]
        };

        return this.formBuilder.group(controls);
    }

    protected buildPaginationRequest(model: ITeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamsFilterModel> {
        return mapFindTeamsRequest(model, pagination, sorting);
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindTeamsFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamServiceModel>>> {
        return this.teamService.find(request, false);
    }

    protected mapTableModel(item: ITeamServiceModel): ITeamSearchTableModel {
        return mapTeamSearchTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        if (event.selected && isDefined(this.value)) {
            this.value = null;
        }

        this.selectTeam.emit({ selected: event.selected, team: event.args });
    }
}