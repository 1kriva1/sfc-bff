import { CoreConstants } from "@core/constants";
import { IFindGameTeamsRequest, IGameTeamServiceModel } from "@share/services";
import { ILoadContainerParameters } from "ngx-sfc-common";
import { IAutoCompleteItemModel } from "ngx-sfc-inputs";

export function mapFindGameTeamsRequest(parameters: ILoadContainerParameters): IFindGameTeamsRequest {
    return {
        Filter: {
            Team: {
                Profile: {
                    General: {
                        Name: parameters.params.value
                    }
                }
            }
        },
        Pagination: {
            Page: parameters.page,
            Size: parameters.size
        },
        Sorting: []
    };
}

export function mapTeamAutoCompleteItemModel(model: IGameTeamServiceModel): IAutoCompleteItemModel {
    return {
        key: model.Team!.Id,
        value: model.Team!.Profile.General.Name,
        image: model.Team!.Profile.General.Logo || CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
    };
}