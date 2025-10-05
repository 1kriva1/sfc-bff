import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { CheckmarkType } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableModel, TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { IAvatarInputTeamsModalBodyTableRowModel } from "./avatar-input-teams-modal-body-table-row.model";
import { AvatarInputTeamsModalBodyTableRowConstants } from "./avatar-input-teams-modal-body-table-row.constants";
import { AvatarInputTeamsModalBodyTableColumn } from "../../../../../team/general/parts/table/avatar-input-teams-modal-body-table-column.enum";
import { ITeamSearchTableModel } from "@share/components/features/team/general/search/table/team-search-table.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { ITeamInfoModel } from "@share/components/features/team/general/info/team-info.model";

@Component({
    selector: 'sfc-avatar-input-teams-modal-body-table-row',
    templateUrl: './avatar-input-teams-modal-body-table-row.component.html',
    styleUrls: ['./avatar-input-teams-modal-body-table-row.component.scss']
})
export class AvatarInputTeamsModalBodyTableRowComponent implements OnInit {

    // ngx-sfc-common
    CheckmarkType = CheckmarkType;

    // component
    Constants = AvatarInputTeamsModalBodyTableRowConstants;
    Column = AvatarInputTeamsModalBodyTableColumn;

    /* Inputs */

    @Input()
    value: number | null = null;

    @Input()
    model!: ITableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    /* End Inputs */

    /* Fields */

    public viewModel!: IAvatarInputTeamsModalBodyTableRowModel;

    public teamInfo!: ITeamInfoModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected get _status(): string {
        return `${AvatarInputTeamsModalBodyTableRowConstants.STATUS_CLASS_PART}-${this.team?.status}`;
    }

    /* End Class Bindings */

    /* Properties */

    public get selected(): boolean { return this.model.selected || this.team.id == this.value; }    

    private get team(): ITeamSearchTableModel { return this.model.data }

    /* End Properties */

    constructor(private selectedService: TableSelectService, private enumService: EnumService) { }

    ngOnInit(): void {
        const teamPlayers: IPlayerModel[] = this.team.players.map(teamplayer => teamplayer.player);

        this.teamInfo = {
            name: this.team.profile.general.name,
            city: this.team.profile.general.city,
            logo: this.team.profile.general.logo,
            raiting: getPlayersRaiting(teamPlayers)
        }

        this.viewModel = {
            status: getEnum(this.team.status, this.enumService.enums.teamStatuses)!,
            description: this.team.profile.general.description
        };
    }

    public onSelect(): void {
        this.selectedService.selectSingle({ index: this.model.sequence, selected: !this.selected, args: this.team });
    }
}