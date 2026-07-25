import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { BaseTableContentComponent } from "@share/components/extends";
import { IInviteGameTeamSearchTableModel } from "../../invite-game-team-search-table.model";
import { IInviteGameTeamSearchTableRowModel } from "./invite-game-team-search-table-row.model";
import { InviteGameTeamSearchTableRowConstants } from "./invite-game-team-search-table-row.constants";
import { InviteGameTeamSearchTableColumn } from "../../invite-game-team-search-table-column.enum";
import { getPlayersRaiting } from "@share/utils";
import { IPlayerModel, ITeamPlayerModel } from "@share/models";
import { InviteGameTeamSearchTableConstants } from "../../invite-game-team-search-table.constants";

@Component({
    selector: 'sfc-invite-game-team-search-table-row',
    templateUrl: './invite-game-team-search-table-row.component.html',
    styleUrls: ['./invite-game-team-search-table-row.component.scss']
})
export class InviteGameTeamSearchTableRowComponent
    extends BaseTableContentComponent<IInviteGameTeamSearchTableModel, IInviteGameTeamSearchTableRowModel>
    implements OnInit {

    // component
    Constants = InviteGameTeamSearchTableRowConstants;
    Column = InviteGameTeamSearchTableColumn;

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
            status: getEnum(this.data.status, this.enumService.enums.inviteStatuses)!,
            players: teamPlayers.length,
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(InviteGameTeamSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}