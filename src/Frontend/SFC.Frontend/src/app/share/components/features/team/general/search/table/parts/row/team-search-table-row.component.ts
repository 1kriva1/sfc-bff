import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { ITeamSearchTableModel } from "../../team-search-table.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { TeamSearchTableRowConstants } from "./team-search-table-row.constants";
import { ITeamSearchTableRowModel } from "./team-search-table-row.model";
import { ITeamPlayerModel } from "@share/models";
import { BaseTableContentComponent } from "../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { TeamSearchTableColumn } from "../../team-search-table-column.enum";
import { TeamSearchTableConstants } from "../../team-search-table.constants";

@Component({
    selector: 'sfc-team-search-table-row',
    templateUrl: './team-search-table-row.component.html',
    styleUrls: ['./team-search-table-row.component.scss']
})
export class TeamSearchTableRowComponent
    extends BaseTableContentComponent<ITeamSearchTableModel, ITeamSearchTableRowModel>
    implements OnInit {

    // component
    Constants = TeamSearchTableRowConstants;
    Column = TeamSearchTableColumn;

    protected override get id(): number { return this.data.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const teamPlayers: IPlayerModel[] = this.data.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player);

        this.viewModel = {
            name: this.data.profile.general.name,
            city: this.data.profile.general.city,
            logo: this.data.profile.general.logo,
            raiting: getPlayersRaiting(teamPlayers),
            status: getEnum(this.data.status, this.enumService.enums.teamStatuses)!,
            players: teamPlayers.length,
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(TeamSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}