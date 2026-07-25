import { Component, OnInit } from "@angular/core";
import { BaseTableContentComponent } from "@share/components/extends";
import { TableSelectService } from "ngx-sfc-components";
import { IInviteGameTeamSearchTableCardModel } from "./invite-game-team-search-table-card.model";
import { IInviteGameTeamSearchTableModel } from "../../invite-game-team-search-table.model";
import { InviteGameTeamSearchTableCardConstants } from "./invite-game-team-search-table-card.constants";
import { InviteGameTeamSearchTableColumn } from "../../invite-game-team-search-table-column.enum";
import { EnumService } from "@share/services";
import { IPlayerModel, ITeamPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { getEnum } from "@core/utils";
import { InviteGameTeamSearchTableConstants } from "../../invite-game-team-search-table.constants";
@Component({
    selector: 'sfc-invite-game-team-search-table-card',
    templateUrl: './invite-game-team-search-table-card.component.html',
    styleUrls: ['./invite-game-team-search-table-card.component.scss']
})
export class InviteGameTeamSearchTableCardComponent
    extends BaseTableContentComponent<IInviteGameTeamSearchTableModel, IInviteGameTeamSearchTableCardModel>
    implements OnInit {

    // component
    Constants = InviteGameTeamSearchTableCardConstants;
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
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(InviteGameTeamSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}