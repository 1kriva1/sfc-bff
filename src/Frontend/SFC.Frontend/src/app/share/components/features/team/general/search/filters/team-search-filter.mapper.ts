import { mapPaginationModel } from "@core/mappers";
import { IFindTeamsRequest } from "@share/services/team/general/general/models/find/find-teams.request";
import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ITeamSearchFilterModel } from "./team-search-filter.model";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { toEnglishLocaleTimeString } from "@core/utils";
import { IFindTeamsFilterModel, IFindTeamsGeneralProfileFilterModel } from "@share/services";
import { TeamSearchTableColumn } from "../table/team-search-table-column.enum";

export function mapFindTeamsRequest(
    model: ITeamSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamsRequest {
    return {
        Pagination: mapPaginationModel(pagination),
        Sorting: _mapSorting(sorting),
        Filter: mapFindTeamsFilterModel(model)
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case TeamSearchTableColumn.Information:
                return [{ Name: nameof<IFindTeamsGeneralProfileFilterModel>('Name'), Direction: sorting.direction }]
            default:
                return [];
        }
    }
}

export function mapFindTeamsFilterModel(model: ITeamSearchFilterModel): IFindTeamsFilterModel {
    return {
        Profile: {
            General: {
                Name: model.name,
                Availability: {
                    Days: model.general?.availability.days,
                    From: toEnglishLocaleTimeString(model.general?.availability.from),
                    To: toEnglishLocaleTimeString(model.general?.availability.to)
                },
                City: model.general?.city,
                Tags: model.general?.tags,
                HasLogo: model.general?.hasLogo,
                LocationId: model.general?.locationId
            },
            Financial: {
                FreePlay: model.financial?.freePlay
            },
            Inventary: {
                Shirts: model.inventary?.shirts
            }
        },
        Statuses: model.general?.statuses
    };
}