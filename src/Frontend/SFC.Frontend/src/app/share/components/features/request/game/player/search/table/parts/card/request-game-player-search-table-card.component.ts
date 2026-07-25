import { Component, OnInit } from "@angular/core";
import { BaseTableContentComponent } from "@share/components/extends";
import { TableSelectService } from "ngx-sfc-components";
import { IRequestGamePlayerSearchTableModel } from "../../request-game-player-search-table.model";
import { IRequestGamePlayerSearchTableCardModel } from "./request-game-player-search-table-card.model";
import { RequestGamePlayerSearchTableCardConstants } from "./request-game-player-search-table-card.constants";
import { RequestGamePlayerSearchTableColumn } from "../../request-game-player-search-table-column.enum";
import { RequestGamePlayerSearchTableConstants } from "../../request-game-player-search-table.constants";
@Component({
    selector: 'sfc-request-game-player-search-table-card',
    templateUrl: './request-game-player-search-table-card.component.html',
    styleUrls: ['./request-game-player-search-table-card.component.scss']
})
export class RequestGamePlayerSearchTableCardComponent
    extends BaseTableContentComponent<IRequestGamePlayerSearchTableModel, IRequestGamePlayerSearchTableCardModel>
    implements OnInit {

    // component
    Constants = RequestGamePlayerSearchTableCardConstants;
    Column = RequestGamePlayerSearchTableColumn;

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

        this.statusClass = this.buildStatusClass(RequestGamePlayerSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}