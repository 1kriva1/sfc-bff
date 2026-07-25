import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { IGameTeamSearchTableModel } from "../../game-team-search-table.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { GameTeamSearchTableRowConstants } from "./game-team-search-table-row.constants";
import { IGameTeamSearchTableRowModel } from "./game-team-search-table-row.model";
import { ITeamPlayerModel } from "@share/models";
import { GameTeamSearchTableConstants } from "../../game-team-search-table.constants";
import { GameTeamSearchTableColumn } from "../../game-team-search-table-column.enum";
import { BaseTableContentComponent } from "@share/components/extends";

@Component({
    selector: 'sfc-game-team-search-table-row',
    templateUrl: './game-team-search-table-row.component.html',
    styleUrls: ['./game-team-search-table-row.component.scss']
})
export class GameTeamSearchTableRowComponent
    extends BaseTableContentComponent<IGameTeamSearchTableModel, IGameTeamSearchTableRowModel>
    implements OnInit {

    // component
    Constants = GameTeamSearchTableRowConstants;
    Column = GameTeamSearchTableColumn;

    protected override get id(): number { return this.data.gameTeam.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const teamPlayers: IPlayerModel[] = this.data.gameTeam.team!.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player);

        this.viewModel = {
            name: this.data.gameTeam.team!.profile.general.name,
            city: this.data.gameTeam.team!.profile.general.city,
            logo: this.data.gameTeam.team!.profile.general.logo,
            raiting: getPlayersRaiting(teamPlayers),
            status: getEnum(this.data.gameTeam.status, this.enumService.enums.gameTeamStatuses)!,
            players: teamPlayers.length,
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(GameTeamSearchTableConstants.STATUS_CLASS_PART, this.data.gameTeam.status);
    }
}