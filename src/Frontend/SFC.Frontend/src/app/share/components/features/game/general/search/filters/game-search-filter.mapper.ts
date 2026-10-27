import { mapPaginationModel } from "@core/mappers";
import { convertDateTimeToDateOnly, empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { toEnglishLocaleTimeString } from "@core/utils";
import { IGameFindFilterModel, IGameFindGeneralProfileFilterModel, IGameFindRequest } from "@share/services";
import { IGameSearchFilterModel } from "./game-search-filter.model";
import { mapLimitSearchModel } from "@share/utils";
import { GameSearchTableColumn } from "../table/game-search-table-column.enum";

export function mapGameFindRequest(
    model: IGameSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IGameFindRequest {
    return {
        Pagination: mapPaginationModel(pagination),
        Sorting: _mapSorting(sorting),
        Filter: mapGameFindFilterModel(model)
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case GameSearchTableColumn.Name:
                return [{ Name: nameof<IGameFindGeneralProfileFilterModel>('Name'), Direction: sorting.direction }]
            default:
                return [];
        }
    }
}

export function mapGameFindFilterModel(model?: IGameSearchFilterModel): IGameFindFilterModel {
    return {
        Profile: {
            General: {
                Name: model?.general?.name,
                Location: model?.general?.location,
                Availability: model?.general?.availability ? {
                    Date: model.general?.availability.date ? convertDateTimeToDateOnly(model.general?.availability.date) : null,
                    From: model.general?.availability.from ? toEnglishLocaleTimeString(model.general?.availability.from) : null!,
                    To: model.general?.availability.to ? toEnglishLocaleTimeString(model.general?.availability.to) : null!
                } : null,
                Tags: model?.general?.tags,
            },
            Financial: {
                FreeGame: model?.financial?.freeGame,
                PayAmount: mapLimitSearchModel(model?.financial?.payAmount)
            },
            Inventary: {
                ShirtsRequired: model?.inventary?.shirtsRequired,
                ShirtsCount: mapLimitSearchModel(model?.inventary?.shirtsCount)
            }
        },
        Statuses: model?.general?.statuses
    };
}