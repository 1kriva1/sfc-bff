import { Component, Input, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { BaseTableContentComponent } from "../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { TeamPlayerSearchTableLocalization } from "../../team-player-search-table.localization";
import { ITeamPlayerSearchTableModel } from "../../team-player-search-table.model";
import { ITeamPlayerSearchTableRowModel } from "./team-player-search-table-row.model";
import { TeamPlayerSearchTableRowConstants } from "./team-player-search-table-row.constants";
import { TeamPlayerSearchTableColumn } from "../../team-player-search-table-column.enum";
import { TeamPlayerSearchTableConstants } from "../../team-player-search-table.constants";
import { Color, empty, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "@core/types";

@Component({
    selector: 'sfc-team-player-search-table-row',
    templateUrl: './team-player-search-table-row.component.html',
    styleUrls: ['./team-player-search-table-row.component.scss']
})
export class TeamPlayerSearchTableRowComponent
    extends BaseTableContentComponent<ITeamPlayerSearchTableModel, ITeamPlayerSearchTableRowModel>
    implements OnInit {

    // ngx-sfc-common
    Color = Color;

    // table
    Localization = TeamPlayerSearchTableLocalization;

    // component
    Constants = TeamPlayerSearchTableRowConstants;
    Column = TeamPlayerSearchTableColumn;

    @Input()
    radius: number = TeamPlayerSearchTableRowConstants.LOGO_RADIUS;

    /* Fields */

    public position: IEnumModel<number> | empty = null;

    public status: IEnumModel<number> | empty = null;

    /* End Fields */

    protected override get id(): number { return this.data.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.viewModel = {
            firstName: this.data.player.general.firstName,
            lastName: this.data.player.general.lastName,
            city: this.data.player.general.city,
            photo: this.data.player.general.photo,
            stats: this.data.player.stats,
            status: this.data.status,
            position: this.data.player.football.position,
            birthday: this.data.player.general.birthday,
            games: this.data.activity?.games || 0,
            goals: this.data.activity?.goals || 0,
            assists: this.data.activity?.assists || 0,
            redCards: this.data.activity?.redCards || 0,
            yellowCards: this.data.activity?.yellowCards || 0,
            actions: this.data.actions || []
        };

        this.status = getEnum(this.data.status, this.enumService.enums.teamPlayerStatuses);

        if (isDefined(this.data.player.football.position)) {
            this.position = getEnum(this.data.player.football.position!, this.enumService.enums.footballPositions);
        }

        this.statusClass = this.buildStatusClass(TeamPlayerSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}