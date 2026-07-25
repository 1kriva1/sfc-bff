import { Component, OnInit } from "@angular/core";
import { BaseTableContentComponent } from "@share/components/extends";
import { TableSelectService } from "ngx-sfc-components";
import { IInviteGamePlayerSearchTableModel } from "../../invite-game-player-search-table.model";
import { IInviteGamePlayerSearchTableCardModel } from "./invite-game-player-search-table-card.model";
import { InviteGamePlayerSearchTableCardConstants } from "./invite-game-player-search-table-card.constants";
import { InviteGamePlayerSearchTableColumn } from "../../invite-game-player-search-table-column.enum";
import { InviteGamePlayerSearchTableConstants } from "../../invite-game-player-search-table.constants";
@Component({
    selector: 'sfc-invite-game-player-search-table-card',
    templateUrl: './invite-game-player-search-table-card.component.html',
    styleUrls: ['./invite-game-player-search-table-card.component.scss']
})
export class InviteGamePlayerSearchTableCardComponent
    extends BaseTableContentComponent<IInviteGamePlayerSearchTableModel, IInviteGamePlayerSearchTableCardModel>
    implements OnInit {

    // component
    Constants = InviteGamePlayerSearchTableCardConstants;
    Column = InviteGamePlayerSearchTableColumn;

    protected override get id(): number { return this.data.id; }

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

        this.statusClass = this.buildStatusClass(InviteGamePlayerSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}