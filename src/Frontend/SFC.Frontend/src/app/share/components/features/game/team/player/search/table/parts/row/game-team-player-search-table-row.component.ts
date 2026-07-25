import { Component, Input, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { Color, empty, hasItemBy, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "@core/types";
import { BaseTableContentComponent } from "@share/components/extends";
import { IGameTeamPlayerSearchTableModel } from "../../game-team-player-search-table.model";
import { IGameTeamPlayerSearchTableRowModel, IGameTeamPlayerTeamSearchTableRowModel } from "./game-team-player-search-table-row.model";
import { GameTeamPlayerSearchTableLocalization } from "../../game-team-player-search-table.localization";
import { GameTeamPlayerSearchTableRowConstants } from "./game-team-player-search-table-row.constants";
import { GameTeamPlayerSearchTableColumn } from "../../game-team-player-search-table-column.enum";
import { IGameTeamPlayerModel, IPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { GameTeamPlayerInfoConstants } from "../../../../info/game-team-player-info.constants";

@Component({
    selector: 'sfc-game-team-player-search-table-row',
    templateUrl: './game-team-player-search-table-row.component.html',
    styleUrls: ['./game-team-player-search-table-row.component.scss']
})
export class GameTeamPlayerSearchTableRowComponent
    extends BaseTableContentComponent<IGameTeamPlayerSearchTableModel, IGameTeamPlayerSearchTableRowModel>
    implements OnInit {

    // ngx-sfc-common
    Color = Color;

    // table
    Localization = GameTeamPlayerSearchTableLocalization;

    // component
    Constants = GameTeamPlayerSearchTableRowConstants;
    Column = GameTeamPlayerSearchTableColumn;

    @Input()
    radius: number = GameTeamPlayerInfoConstants.LOGO.RADIUS;

    /* Fields */

    public position: IEnumModel<number> | empty = null;

    public status: IEnumModel<number> | empty = null;

    /* End Fields */

    protected override get id(): number { return this.data.gameTeamPlayer.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.viewModel = {
            firstName: this.data.gameTeamPlayer.player!.general.firstName,
            lastName: this.data.gameTeamPlayer.player!.general.lastName,
            city: this.data.gameTeamPlayer.player!.general.city,
            photo: this.data.gameTeamPlayer.player!.general.photo,
            stats: this.data.gameTeamPlayer.player!.stats,
            status: null,
            birthday: this.data.gameTeamPlayer.player!.general.birthday,
            actions: this.data.actions || []
        };

        if (!hasItemBy(this.columns, column => column.field == GameTeamPlayerSearchTableColumn.Position)) {
            this.viewModel.position = this.data.gameTeamPlayer.player!.football.position;
        }

        if (this.data.team) {
            const teamPlayers: IPlayerModel[] = this.data.team.gameTeam.gameTeamPlayers!.map((teamPlayer: IGameTeamPlayerModel) => teamPlayer.gameTeamPlayer.player!);

            const gamePlayerTeam: IGameTeamPlayerTeamSearchTableRowModel = {
                name: this.data.team.gameTeam.team!.profile.general.name,
                city: this.data.team.gameTeam.team!.profile.general.city,
                logo: this.data.team.gameTeam.team!.profile.general.logo,
                raiting: getPlayersRaiting(teamPlayers),
            };

            this.viewModel.team = gamePlayerTeam;
        }

        if (isDefined(this.data.gameTeamPlayer.player!.football.position)) {
            this.position = getEnum(this.data.gameTeamPlayer.player!.football.position!, this.enumService.enums.footballPositions);
        }
    }
}