import { ITeamPlayerStatisticActivityModel, ITeamPlayerStatisticModel } from "@share/models";
import { ITeamPlayerStatisticActivityServiceModel, ITeamPlayerStatisticValueServiceModel } from "@share/services";
import { IStatisticServiceModel } from "@share/services/common";

export function mapTeamPlayerStatisticModel(models: IStatisticServiceModel<ITeamPlayerStatisticValueServiceModel>[]): ITeamPlayerStatisticModel {
    return {
        statistic: models.map(model => {
            return {
                date: model.Date,
                value: {
                    statuses: model.Value.Statuses.map(item => ({ key: item.Key, total: item.Total })),
                    positions: model.Value.Positions.map(item => ({ key: item.Key, total: item.Total }))
                }
            };
        })
    }
}

export function mapTeamPlayerStatisticActivityModel(model: ITeamPlayerStatisticActivityServiceModel): ITeamPlayerStatisticActivityModel {
    return {
        games: model.Games,
        goals: model.Goals,
        assists: model.Assists,
        redCards: model.RedCards,
        yellowCards: model.YellowCards
    };
}