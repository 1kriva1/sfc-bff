import { IGameTeamPlayersFilterFormModel } from "./game-team-players-filter-form.model";
import { IGamePlayerSearchFilterModel, IGameTeamPlayerSearchFilterModel, ITeamPlayerSearchFilterModel } from "@share/components";

export function mapGamePlayerSearchFilterModel(model: IGameTeamPlayersFilterFormModel, excludePlayerIds?: number[]): IGamePlayerSearchFilterModel {
    const result: IGamePlayerSearchFilterModel = {
        player: {
            name: model.name,
            excludeIds: excludePlayerIds
        }
    };

    return result;
}

export function mapGameTeamPlayerSearchFilterModel(model: IGameTeamPlayersFilterFormModel, excludeGameTeamPlayerIds: number[]): IGameTeamPlayerSearchFilterModel {
    const result: IGameTeamPlayerSearchFilterModel = {
        player: {
            name: model.name
        },
        gameTeamPlayer: {
            excludeIds: excludeGameTeamPlayerIds
        }
    };

    return result;
}

export function mapTeamPlayerSearchFilterModel(model: IGameTeamPlayersFilterFormModel, excludePlayerIds?: number[]): ITeamPlayerSearchFilterModel {
    const result: ITeamPlayerSearchFilterModel = {
        player: {
            name: model.name,
            excludeIds: excludePlayerIds,
        }
    };

    return result;
}