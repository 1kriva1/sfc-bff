import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Position, getAge } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { getPhoto } from "@share/utils/features/player";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { TeamEditPlayerRequestRowConstants } from "./team-edit-player-request-row.constants";
import { ITeamEditPlayersRequestTableModel } from "../team-edit-players-request-table.model";
import { TeamEditPlayersRequestTableColumn } from "../team-edit-players-request-table-column.enum";
import { ITeamEditPlayerRequestRowModel } from "./team-edit-player-request-row.model";

@Component({
    selector: 'sfc-team-edit-player-request-row',
    templateUrl: './team-edit-player-request-row.component.html',
    styleUrls: ['./team-edit-player-request-row.component.scss']
})
export class TeamEditPlayerRequestRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;

    // component
    Constants = TeamEditPlayerRequestRowConstants;
    Column = TeamEditPlayersRequestTableColumn;

    /* Inputs */

    @Input()
    model!: ITeamEditPlayersRequestTableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    /* End Inputs */

    /* Fields */

    public viewModel!: ITeamEditPlayerRequestRowModel;

    public avatarModel!: IPlayerInfoModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    private get _status(): string {
        return `${TeamEditPlayerRequestRowConstants.STATUS_CLASS_PART}-${this.model.status.key}`;
    }

    /* End Class Bindings */

    constructor(private enumService: EnumService) { }

    ngOnInit(): void {
        const raiting = getRaiting(this.model.player.stats);

        this.viewModel = {
            position: getEnum(this.model.player.football.position, this.enumService.enums.footballPositions),
            status: this.model.status
        };

        this.avatarModel = {
            age: getAge(this.model.player.general.birthday),
            city: this.model.player.general.city,
            raiting: raiting,
            firstName: this.model.player.general.firstName,
            lastName: this.model.player.general.lastName,
            photo: getPhoto(this.model.player.general.photo)
        };
    }
}