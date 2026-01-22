import { ITeamStatisticModel } from "@share/models";
import { ITeamStatisticValueServiceModel } from "@share/services";
import { IStatisticServiceModel } from "@share/services/common";

export function mapTeamStatisticModel(models: IStatisticServiceModel<ITeamStatisticValueServiceModel>[]): ITeamStatisticModel {
    return {
        statistic: models.map(model =>{
            return {
                date: model.Date,
                value: {
                    games: model.Value.Games,
                    assists: model.Value.Assists,
                    cleanSheets: model.Value.CleanSheets,
                    conceded: model.Value.Conceded,
                    draws: model.Value.Draws,
                    goals: model.Value.Goals,
                    loses: model.Value.Loses,
                    penalties: model.Value.Penalties,
                    redCards: model.Value.RedCards,
                    wins: model.Value.Wins,
                    yellowCards: model.Value.YellowCards
                }
            };
        })
    }
}