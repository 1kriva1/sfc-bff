import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { BaseTableContentComponent, ITeamPlayerSearchTableModel, TeamPlayerSearchTableColumn } from "@share/components";
import { ITeamPlayerSearchTableCardModel } from "./team-player-search-table-card.model";
import { TeamPlayerSearchTableCardConstants } from "./team-player-search-table-card.constants";
import { TeamPlayerSearchTableConstants } from "../../team-player-search-table.constants";

@Component({
    selector: 'sfc-team-player-search-table-card',
    templateUrl: './team-player-search-table-card.component.html',
    styleUrls: ['./team-player-search-table-card.component.scss']
})
export class TeamPlayerSearchTableCardComponent
    extends BaseTableContentComponent<ITeamPlayerSearchTableModel, ITeamPlayerSearchTableCardModel>
    implements OnInit {

    // component
    Constants = TeamPlayerSearchTableCardConstants;
    Column = TeamPlayerSearchTableColumn;

    constructor(selectedService: TableSelectService) {
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
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(TeamPlayerSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}