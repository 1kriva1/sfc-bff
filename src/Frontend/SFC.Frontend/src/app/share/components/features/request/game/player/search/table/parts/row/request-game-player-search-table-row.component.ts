import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { Color, empty, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "@core/types";
import { BaseTableContentComponent } from "@share/components/extends";
import { IRequestGamePlayerSearchTableModel } from "../../request-game-player-search-table.model";
import { IRequestGamePlayerSearchTableRowModel } from "./request-game-player-search-table-row.model";
import { RequestGamePlayerSearchTableLocalization } from "../../request-game-player-search-table.localization";
import { RequestGamePlayerSearchTableRowConstants } from "./request-game-player-search-table-row.constants";
import { RequestGamePlayerSearchTableColumn } from "../../request-game-player-search-table-column.enum";
import { RequestGamePlayerSearchTableConstants } from "../../request-game-player-search-table.constants";

@Component({
    selector: 'sfc-request-game-player-search-table-row',
    templateUrl: './request-game-player-search-table-row.component.html',
    styleUrls: ['./request-game-player-search-table-row.component.scss']
})
export class RequestGamePlayerSearchTableRowComponent
    extends BaseTableContentComponent<IRequestGamePlayerSearchTableModel, IRequestGamePlayerSearchTableRowModel>
    implements OnInit {

    // ngx-sfc-common
    Color = Color;

    // table
    Localization = RequestGamePlayerSearchTableLocalization;

    // component
    Constants = RequestGamePlayerSearchTableRowConstants;
    Column = RequestGamePlayerSearchTableColumn;

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

        this.status = getEnum(this.data.status, this.enumService.enums.requestStatuses);

        if (isDefined(this.data.player.football.position)) {
            this.position = getEnum(this.data.player.football.position!, this.enumService.enums.footballPositions);
        }

        this.statusClass = this.buildStatusClass(RequestGamePlayerSearchTableConstants.STATUS_CLASS_PART, this.data.status);
    }
}