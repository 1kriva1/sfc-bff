import { ITeamGameStatisticModel } from "@share/models";
import { ITeamGameStatisticValueServiceModel } from "@share/services";
import { IStatisticServiceModel } from "@share/services/common";

export function mapTeamGameStatisticModel(models: IStatisticServiceModel<ITeamGameStatisticValueServiceModel>[]): ITeamGameStatisticModel {
    return {
        statistic: models.map(model => {
            return {
                date: model.Date,
                value: {
                    statuses: model.Value.Statuses.map(item => ({ key: item.Key, total: item.Total }))
                }
            };
        })
    }
}