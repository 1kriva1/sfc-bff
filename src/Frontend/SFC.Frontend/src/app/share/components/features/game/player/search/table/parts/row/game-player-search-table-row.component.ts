import { Component, Input, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { EnumService } from "@share/services";
import { Color, empty, hasItemBy, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "@core/types";
import { BaseTableContentComponent } from "@share/components/extends";
import { IGamePlayerSearchTableModel } from "../../game-player-search-table.model";
import { IGamePlayerSearchTableRowModel, IGamePlayerTeamSearchTableRowModel } from "./game-player-search-table-row.model";
import { GamePlayerSearchTableLocalization } from "../../game-player-search-table.localization";
import { GamePlayerSearchTableRowConstants } from "./game-player-search-table-row.constants";
import { GamePlayerSearchTableColumn } from "../../game-player-search-table-column.enum";
import { GamePlayerSearchTableConstants } from "../../game-player-search-table.constants";
import { IPlayerModel, ITeamPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { GamePlayerInfoConstants } from "../../../../info/game-player-info.constants";

@Component({
    selector: 'sfc-game-player-search-table-row',
    templateUrl: './game-player-search-table-row.component.html',
    styleUrls: ['./game-player-search-table-row.component.scss']
})
export class GamePlayerSearchTableRowComponent
    extends BaseTableContentComponent<IGamePlayerSearchTableModel, IGamePlayerSearchTableRowModel>
    implements OnInit {

    // ngx-sfc-common
    Color = Color;

    // table
    Localization = GamePlayerSearchTableLocalization;

    // component
    Constants = GamePlayerSearchTableRowConstants;
    Column = GamePlayerSearchTableColumn;

    @Input()
    radius: number = GamePlayerInfoConstants.LOGO.RADIUS;

    /* Fields */

    public position: IEnumModel<number> | empty = null;

    public status: IEnumModel<number> | empty = null;

    /* End Fields */

    protected override get id(): number { return this.data.gamePlayer.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.viewModel = {
            firstName: this.data.gamePlayer?.player!.general.firstName,
            lastName: this.data.gamePlayer?.player!.general.lastName,
            city: this.data.gamePlayer?.player!.general.city,
            photo: this.data.gamePlayer?.player!.general.photo,
            stats: this.data.gamePlayer?.player!.stats,
            status: this.data.gamePlayer.status,
            birthday: this.data.gamePlayer?.player!.general.birthday,
            actions: this.data.actions || []
        };

        if (!hasItemBy(this.columns, column => column.field == GamePlayerSearchTableColumn.Position)) {
            this.viewModel.position = this.data.gamePlayer.player!.football.position;
        }

        if (this.data.gamePlayer.gameTeam) {
            const teamPlayers: IPlayerModel[] = this.data.gamePlayer.gameTeam.gameTeam.team!.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player);

            const gamePlayerTeam: IGamePlayerTeamSearchTableRowModel = {
                name: this.data.gamePlayer.gameTeam.gameTeam.team!.profile.general.name,
                city: this.data.gamePlayer.gameTeam.gameTeam.team!.profile.general.city,
                logo: this.data.gamePlayer.gameTeam.gameTeam.team!.profile.general.logo,
                raiting: getPlayersRaiting(teamPlayers),
            };

            this.viewModel.team = gamePlayerTeam;
        }

        this.status = getEnum(this.data.gamePlayer.status, this.enumService.enums.gamePlayerStatuses);

        if (isDefined(this.data.gamePlayer.player!.football.position)) {
            this.position = getEnum(this.data.gamePlayer.player!.football.position!, this.enumService.enums.footballPositions);
        }

        this.statusClass = this.buildStatusClass(GamePlayerSearchTableConstants.STATUS_CLASS_PART, this.data.gamePlayer.status);
    }
}