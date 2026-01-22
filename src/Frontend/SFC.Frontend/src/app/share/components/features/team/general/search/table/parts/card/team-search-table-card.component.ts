import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { ITeamSearchTableModel } from "../../team-search-table.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { ITeamPlayerModel } from "@share/models";
import { TeamSearchTableCardConstants } from "./team-search-table-card.constants";
import { ITeamSearchTableCardModel } from "./team-search-table-card.model";
import { BaseTableContentComponent } from "@share/components";
import { TeamSearchTableColumn } from "../../team-search-table-column.enum";
import { TeamSearchTableConstants } from "../../team-search-table.constants";

@Component({
    selector: 'sfc-team-search-table-card',
    templateUrl: './team-search-table-card.component.html',
    styleUrls: ['./team-search-table-card.component.scss']
})
export class TeamSearchTableCardComponent
    extends BaseTableContentComponent<ITeamSearchTableModel, ITeamSearchTableCardModel>
    implements OnInit {

    // component
    Constants = TeamSearchTableCardConstants;
    Column = TeamSearchTableColumn;

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
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(TeamSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}