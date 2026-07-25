import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { BaseTableContentComponent } from "@share/components/extends";
import { IRequestGameTeamSearchTableModel } from "../../request-game-team-search-table.model";
import { IRequestGameTeamSearchTableRowModel } from "./request-game-team-search-table-row.model";
import { RequestGameTeamSearchTableRowConstants } from "./request-game-team-search-table-row.constants";
import { RequestGameTeamSearchTableColumn } from "../../request-game-team-search-table-column.enum";
import { getPlayersRaiting } from "@share/utils";
import { IPlayerModel, ITeamPlayerModel } from "@share/models";
import { RequestGameTeamSearchTableConstants } from "../../request-game-team-search-table.constants";

@Component({
    selector: 'sfc-request-game-team-search-table-row',
    templateUrl: './request-game-team-search-table-row.component.html',
    styleUrls: ['./request-game-team-search-table-row.component.scss']
})
export class RequestGameTeamSearchTableRowComponent
    extends BaseTableContentComponent<IRequestGameTeamSearchTableModel, IRequestGameTeamSearchTableRowModel>
    implements OnInit {

    // component
    Constants = RequestGameTeamSearchTableRowConstants;
    Column = RequestGameTeamSearchTableColumn;

    protected override get id(): number { return this.data.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const teamPlayers: IPlayerModel[] = this.data.team.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player);

        this.viewModel = {
            name: this.data.team.profile.general.name,
            city: this.data.team.profile.general.city,
            logo: this.data.team.profile.general.logo,
            raiting: getPlayersRaiting(teamPlayers),
            status: getEnum(this.data.status, this.enumService.enums.requestStatuses)!,
            players: teamPlayers.length,
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(RequestGameTeamSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}