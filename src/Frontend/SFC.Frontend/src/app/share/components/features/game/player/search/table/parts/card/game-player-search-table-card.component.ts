import { Component, Input, OnInit } from "@angular/core";
import { BaseTableContentComponent } from "@share/components/extends";
import { TableSelectService } from "ngx-sfc-components";
import { IGamePlayerSearchTableModel } from "../../game-player-search-table.model";
import { IGamePlayerSearchTableCardModel, IGamePlayerTeamSearchTableCardModel } from "./game-player-search-table-card.model";
import { GamePlayerSearchTableCardConstants } from "./game-player-search-table-card.constants";
import { GamePlayerSearchTableColumn } from "../../game-player-search-table-column.enum";
import { GamePlayerSearchTableConstants } from "../../game-player-search-table.constants";
import { IPlayerModel, ITeamPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { GamePlayerInfoConstants } from "../../../../info/game-player-info.constants";
import { hasItemBy } from "ngx-sfc-common";
@Component({
    selector: 'sfc-game-player-search-table-card',
    templateUrl: './game-player-search-table-card.component.html',
    styleUrls: ['./game-player-search-table-card.component.scss']
})
export class GamePlayerSearchTableCardComponent
    extends BaseTableContentComponent<IGamePlayerSearchTableModel, IGamePlayerSearchTableCardModel>
    implements OnInit {

    // component
    Constants = GamePlayerSearchTableCardConstants;
    Column = GamePlayerSearchTableColumn;

    @Input()
    radius: number = GamePlayerInfoConstants.LOGO.RADIUS;

    constructor(selectedService: TableSelectService) {
        super(selectedService);
    }

    protected override get id(): number { return this.data.gamePlayer.id; }

    override ngOnInit(): void {
        super.ngOnInit();

        this.viewModel = {
            firstName: this.data.gamePlayer?.player!.general.firstName,
            lastName: this.data.gamePlayer?.player!.general.lastName,
            city: this.data.gamePlayer?.player!.general.city,
            photo: this.data.gamePlayer?.player!.general.photo,
            stats: this.data.gamePlayer?.player!.stats,
            position: this.data.gamePlayer?.player!.football.position,
            birthday: this.data.gamePlayer?.player!.general.birthday,
            actions: this.data.actions || []
        };

        if (hasItemBy(this.columns, column => column.field == GamePlayerSearchTableColumn.Status)) {
            this.viewModel.status = this.data.gamePlayer.status;
        }

        if (this.data.gamePlayer.gameTeam) {
            const teamPlayers: IPlayerModel[] = this.data.gamePlayer.gameTeam.gameTeam.team!.players.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player);

            const gamePlayerTeam: IGamePlayerTeamSearchTableCardModel = {
                name: this.data.gamePlayer.gameTeam.gameTeam.team!.profile.general.name,
                city: this.data.gamePlayer.gameTeam.gameTeam.team!.profile.general.city,
                logo: this.data.gamePlayer.gameTeam.gameTeam.team!.profile.general.logo,
                raiting: getPlayersRaiting(teamPlayers),
            };

            this.viewModel.team = gamePlayerTeam;
        }

        this.statusClass = this.buildStatusClass(GamePlayerSearchTableConstants.STATUS_CLASS_PART, this.data.gamePlayer.status);
    }
}