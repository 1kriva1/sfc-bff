import { IGameTeamPlayersFilterFormModel } from "./game-team-players-filter-form.model";
import { IGamePlayerSearchFilterModel, IGameTeamPlayerSearchFilterModel, IGameTeamPlayerSearchTableModel, ITeamPlayerSearchFilterModel } from "@share/components";

export function mapGamePlayerSearchFilterModel(model: IGameTeamPlayersFilterFormModel): IGamePlayerSearchFilterModel {
    const result: IGamePlayerSearchFilterModel = {
        player: { name: model.name }
    };

    return result;
}

export function mapGameTeamPlayerSearchFilterModel(model: IGameTeamPlayersFilterFormModel, players: IGameTeamPlayerSearchTableModel[]): IGameTeamPlayerSearchFilterModel {
    const result: IGameTeamPlayerSearchFilterModel = {
        player: {
            name: model.name
        },
        gameTeamPlayer: {
            excludeIds: players.map(item => item.gameTeamPlayer.id)
        }
    };

    return result;
}

export function mapTeamPlayerSearchFilterModel(model: IGameTeamPlayersFilterFormModel): ITeamPlayerSearchFilterModel {
    const result: ITeamPlayerSearchFilterModel = {
        player: {
            name: model.name
        }
    };

    return result;
}