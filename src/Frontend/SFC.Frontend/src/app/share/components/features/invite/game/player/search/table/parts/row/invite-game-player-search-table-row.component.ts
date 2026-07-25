import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { Color, empty, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "@core/types";
import { BaseTableContentComponent } from "@share/components/extends";
import { IInviteGamePlayerSearchTableModel } from "../../invite-game-player-search-table.model";
import { IInviteGamePlayerSearchTableRowModel } from "./invite-game-player-search-table-row.model";
import { InviteGamePlayerSearchTableLocalization } from "../../invite-game-player-search-table.localization";
import { InviteGamePlayerSearchTableRowConstants } from "./invite-game-player-search-table-row.constants";
import { InviteGamePlayerSearchTableColumn } from "../../invite-game-player-search-table-column.enum";
import { InviteGamePlayerSearchTableConstants } from "../../invite-game-player-search-table.constants";

@Component({
    selector: 'sfc-invite-game-player-search-table-row',
    templateUrl: './invite-game-player-search-table-row.component.html',
    styleUrls: ['./invite-game-player-search-table-row.component.scss']
})
export class InviteGamePlayerSearchTableRowComponent
    extends BaseTableContentComponent<IInviteGamePlayerSearchTableModel, IInviteGamePlayerSearchTableRowModel>
    implements OnInit {

    // ngx-sfc-common
    Color = Color;

    // table
    Localization = InviteGamePlayerSearchTableLocalization;

    // component
    Constants = InviteGamePlayerSearchTableRowConstants;
    Column = InviteGamePlayerSearchTableColumn;

    /* Fields */

    public position: IEnumModel<number> | empty = null;

    public status: IEnumModel<number> | empty = null;

    /* End Fields */

    protected override get id(): number { return this.data.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
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
            birthday: this.data.player.general.birthday,
            actions: this.data.actions || []
        };

        this.status = getEnum(this.data.status, this.enumService.enums.inviteStatuses);

        if (isDefined(this.data.player.football.position)) {
            this.position = getEnum(this.data.player.football.position!, this.enumService.enums.footballPositions);
        }

        this.statusClass = this.buildStatusClass(InviteGamePlayerSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}