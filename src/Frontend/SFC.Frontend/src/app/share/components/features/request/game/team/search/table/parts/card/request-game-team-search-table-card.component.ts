import { Component, OnInit } from "@angular/core";
import { BaseTableContentComponent } from "@share/components/extends";
import { TableSelectService } from "ngx-sfc-components";
import { IRequestGameTeamSearchTableCardModel } from "./request-game-team-search-table-card.model";
import { IRequestGameTeamSearchTableModel } from "../../request-game-team-search-table.model";
import { RequestGameTeamSearchTableCardConstants } from "./request-game-team-search-table-card.constants";
import { RequestGameTeamSearchTableColumn } from "../../request-game-team-search-table-column.enum";
import { EnumService } from "@share/services";
import { IPlayerModel, ITeamPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { getEnum } from "@core/utils";
import { RequestGameTeamSearchTableConstants } from "../../request-game-team-search-table.constants";
@Component({
    selector: 'sfc-request-game-team-search-table-card',
    templateUrl: './request-game-team-search-table-card.component.html',
    styleUrls: ['./request-game-team-search-table-card.component.scss']
})
export class RequestGameTeamSearchTableCardComponent
    extends BaseTableContentComponent<IRequestGameTeamSearchTableModel, IRequestGameTeamSearchTableCardModel>
    implements OnInit {

    // component
    Constants = RequestGameTeamSearchTableCardConstants;
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
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(RequestGameTeamSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}