import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@share/utils';
import { EnumService } from "@share/services";
import { IGameSearchTableModel } from "../../game-search-table.model";
import { GameSearchTableRowConstants } from "./game-search-table-row.constants";
import { IGameSearchTableRowModel } from "./game-search-table-row.model";
import { BaseTableContentComponent } from "../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { GameSearchTableColumn } from "../../game-search-table-column.enum";
import { GameSearchTableConstants } from "../../game-search-table.constants";
import { empty, where } from "ngx-sfc-common";
import { getPlayersRaiting } from "@share/utils";
import { IGameTeamModel, IGameTeamPlayerModel, IPlayerModel } from "@share/models";
import { IGameInfoTeamInfoModel } from "../../../../info/game-info.model";
import { Enum } from "@share/enums";

@Component({
    selector: 'sfc-game-search-table-row',
    templateUrl: './game-search-table-row.component.html',
    styleUrls: ['./game-search-table-row.component.scss']
})
export class GameSearchTableRowComponent
    extends BaseTableContentComponent<IGameSearchTableModel, IGameSearchTableRowModel>
    implements OnInit {

    // component
    Constants = GameSearchTableRowConstants;
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