import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Position, getAge } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { getPhoto } from "@share/utils/features/player";
import { TeamEditPlayerSquadRowConstants } from "./team-edit-player-squad-row.constants";
import { ITeamEditPlayersSquadTableModel } from "../team-edit-players-squad-table.model";
import { ITeamEditPlayerSquadRowModel } from "./team-edit-player-squad-row.model";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { TeamEditPlayersSquadTableColumn } from "../team-edit-players-squad-table-column.enum";

@Component({
    selector: 'sfc-team-edit-player-squad-row',
    templateUrl: './team-edit-player-squad-row.component.html',
    styleUrls: ['./team-edit-player-squad-row.component.scss']
})
export class TeamEditPlayerSquadRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;

    // component
    Constants = TeamEditPlayerSquadRowConstants;
    Column = TeamEditPlayersSquadTableColumn;

    /* Inputs */

    @Input()
    model!: ITeamEditPlayersSquadTableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    /* End Inputs */

    /* Fields */

    public viewModel!: ITeamEditPlayerSquadRowModel;

    public avatarModel!: IPlayerInfoModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected get _status(): string {
        return `${TeamEditPlayerSquadRowConstants.STATUS_CLASS_PART}-${this.model.status}`;
    }

    /* End Class Bindings */

    constructor(private enumService: EnumService) { }

    ngOnInit(): void {
        const raiting = getRaiting(this.model.player.stats);

        this.viewModel = {
            position: getEnum(this.model.player.football.position, this.enumService.enums.footballPositions),
            status: getEnum(this.model.status, this.enumService.enums.teamPlayerStatuses)!
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