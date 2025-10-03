import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Position, getAge } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { getPhoto } from "@share/utils/features/player";
import { TeamEditPlayerInviteRowConstants } from "./team-edit-player-invite-row.constants";
import { ITeamEditPlayersInviteTableModel } from "../team-edit-players-invite-table.model";
import { ITeamEditPlayerInviteRowModel } from "./team-edit-player-invite-row.model";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { TeamEditPlayersInviteTableColumn } from "../team-edit-players-invite-table-column.enum";

@Component({
    selector: 'sfc-team-edit-player-invite-row',
    templateUrl: './team-edit-player-invite-row.component.html',
    styleUrls: ['./team-edit-player-invite-row.component.scss']
})
export class TeamEditPlayerInviteRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;

    // component
    Constants = TeamEditPlayerInviteRowConstants;
    Column = TeamEditPlayersInviteTableColumn;

    /* Inputs */

    @Input()
    model!: ITeamEditPlayersInviteTableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    /* End Inputs */

    /* Fields */

    public viewModel!: ITeamEditPlayerInviteRowModel;

    public avatarModel!: IPlayerInfoModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected get _status(): string {
        return `${TeamEditPlayerInviteRowConstants.STATUS_CLASS_PART}-${this.model.status.key}`;
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