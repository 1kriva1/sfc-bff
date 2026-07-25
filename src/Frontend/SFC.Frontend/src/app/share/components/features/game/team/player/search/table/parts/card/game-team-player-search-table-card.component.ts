import { Component, Input, OnInit } from "@angular/core";
import { BaseTableContentComponent } from "@share/components/extends";
import { TableSelectService } from "ngx-sfc-components";
import { IGameTeamPlayerSearchTableModel } from "../../game-team-player-search-table.model";
import { IGameTeamPlayerSearchTableCardModel, IGameTeamPlayerTeamSearchTableCardModel } from "./game-team-player-search-table-card.model";
import { GameTeamPlayerSearchTableCardConstants } from "./game-team-player-search-table-card.constants";
import { GameTeamPlayerSearchTableColumn } from "../../game-team-player-search-table-column.enum";
import { IGameTeamPlayerModel, IPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { GameTeamPlayerInfoConstants } from "../../../../info/game-team-player-info.constants";
import { hasItemBy } from "ngx-sfc-common";
@Component({
    selector: 'sfc-game-team-player-search-table-card',
    templateUrl: './game-team-player-search-table-card.component.html',
    styleUrls: ['./game-team-player-search-table-card.component.scss']
})
export class GameTeamPlayerSearchTableCardComponent
    extends BaseTableContentComponent<IGameTeamPlayerSearchTableModel, IGameTeamPlayerSearchTableCardModel>
    implements OnInit {

    // component
    Constants = GameTeamPlayerSearchTableCardConstants;
    Column = GameTeamPlayerSearchTableColumn;

    @Input()
    radius: number = GameTeamPlayerInfoConstants.LOGO.RADIUS;

    protected override get id(): number { return this.data.gameTeamPlayer.id; }

    constructor(selectedService: TableSelectService) {
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
            position: this.data.gameTeamPlayer.player!.football.position,
            birthday: this.data.gameTeamPlayer.player!.general.birthday,
            actions: this.data.actions || []
        };

        if (hasItemBy(this.columns, column => column.field == GameTeamPlayerSearchTableColumn.Status)) {
            this.viewModel.status = null;
        }

        if (this.data.team) {
            const teamPlayers: IPlayerModel[] = this.data.team.gameTeam.gameTeamPlayers!.map((teamPlayer: IGameTeamPlayerModel) => teamPlayer.gameTeamPlayer.player!);

            const gamePlayerTeam: IGameTeamPlayerTeamSearchTableCardModel = {
                name: this.data.team.gameTeam.team!.profile.general.name,
                city: this.data.team.gameTeam.team!.profile.general.city,
                logo: this.data.team.gameTeam.team!.profile.general.logo,
                raiting: getPlayersRaiting(teamPlayers),
            };

            this.viewModel.team = gamePlayerTeam;
        }
    }
}