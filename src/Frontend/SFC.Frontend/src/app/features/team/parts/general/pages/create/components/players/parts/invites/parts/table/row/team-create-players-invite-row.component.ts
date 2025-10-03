import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Position, getAge } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { getPhoto } from "@share/utils/features/player";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { TeamCreatePlayersInviteRowConstants } from "./team-create-players-invite-row.constants";
import { TeamCreatePlayersInviteTableColumn } from "../team-create-players-invite-table-column.enum";
import { ITeamCreatePlayersInviteRowModel } from "./team-create-players-invite-row.model";
import { ITeamCreatePlayerInviteTableModel } from "../team-create-players-invite-table.model";

@Component({
    selector: 'sfc-team-create-players-invite-row',
    templateUrl: './team-create-players-invite-row.component.html',
    styleUrls: ['./team-create-players-invite-row.component.scss']
})
export class TeamCreatePlayersInviteRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;

    // component
    Constants = TeamCreatePlayersInviteRowConstants;
    Column = TeamCreatePlayersInviteTableColumn;

    /* Inputs */

    @Input()
    model!: ITeamCreatePlayerInviteTableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    /* End Inputs */

    /* Fields */

    public viewModel!: ITeamCreatePlayersInviteRowModel;

    public avatarModel!: IPlayerInfoModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected get _status(): string {
        return `${TeamCreatePlayersInviteRowConstants.STATUS_CLASS_PART}-${this.model.status.key}`;
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