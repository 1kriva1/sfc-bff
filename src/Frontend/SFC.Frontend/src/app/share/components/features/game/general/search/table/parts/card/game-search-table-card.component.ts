import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@share/utils';
import { EnumService } from "@share/services";
import { IGameSearchTableModel } from "../../game-search-table.model";
import { GameSearchTableCardConstants } from "./game-search-table-card.constants";
import { IGameSearchTableCardModel } from "./game-search-table-card.model";
import { BaseTableContentComponent } from "../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { GameSearchTableColumn } from "../../game-search-table-column.enum";
import { GameSearchTableConstants } from "../../game-search-table.constants";
import { IGameTeamModel, IGameTeamPlayerModel, IPlayerModel } from "@share/models";
import { getPlayersRaiting } from "@share/utils";
import { Direction, empty, where } from "ngx-sfc-common";
import { IGameInfoTeamInfoModel } from "../../../../info";
import { Enum } from "@share/enums";

@Component({
    selector: 'sfc-game-search-table-card',
    templateUrl: './game-search-table-card.component.html',
    styleUrls: ['./game-search-table-card.component.scss']
})
export class GameSearchTableCardComponent
    extends BaseTableContentComponent<IGameSearchTableModel, IGameSearchTableCardModel>
    implements OnInit {

    Direction = Direction;

    // component
    Constants = GameSearchTableCardConstants;
    Column = GameSearchTableColumn;

    protected override get id(): number { return this.data.game.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const gameTeams: IGameTeamModel[] | empty = where(this.data.gameTeams!, gameTeam => gameTeam.gameTeam.status == Enum.GameTeamStatus.InGame);

        this.viewModel = {
            name: this.data.game.profile.general.name,
            tags: this.data.game.profile.general.tags,
            date: this.data.game.profile.general.availability.date,
            from: this.data.game.profile.general.availability.from,
            to: this.data.game.profile.general.availability.to,
            location: `${this.data.game.profile.general.location}`,
            status: getEnum(this.data.game.status, this.enumService.enums.gameStatuses)!,
            teams: gameTeams?.map(gameTeam => this.buildGameInfoTeamInfoModel(gameTeam)),
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(GameSearchTableConstants.STATUS_CLASS_PART, this.data.game.status);
    }

    private buildGameInfoTeamInfoModel(model: IGameTeamModel): IGameInfoTeamInfoModel {
        const teamPlayers: IPlayerModel[] = model.gameTeam.gameTeamPlayers!
            .map((gameTeamPlayer: IGameTeamPlayerModel) => gameTeamPlayer.gameTeamPlayer.player!);

        return {
            id: model.gameTeam.id,
            index: model.gameTeam.index,
            name: model.gameTeam.team?.profile.general.name,
            city: model.gameTeam.team?.profile.general.city,
            logo: model.gameTeam.team?.profile.general.logo,
            raiting: getPlayersRaiting(teamPlayers)
        }
    }
}