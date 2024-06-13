import { empty, firstOrDefault, ISortingModel } from "ngx-sfc-common";
import { IBadgesViewModel } from "../badges-view.model";
import { IGetBadgesRequest, IGetBadgesItemModel } from "../../../../../../services/badge/models/get";
import { IBadgeCardModel } from "../parts/table/card/badge-card.model";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IBadgeTypeEnumModel } from "@share/services/enum/models/enums.model";

export function mapGetBadgesRequest(
    model: IBadgesViewModel,
    page: number,
    size: number,
    sorting: ISortingModel | empty): IGetBadgesRequest {
    return {
        Pagination: { Page: page, Size: size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Name: model.name,
            Statuses: model.statuses
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            default:
                return [];
        }
    }
}

export function mapBadgeCardModel(model: IGetBadgesItemModel,
    badgeTypes: IBadgeTypeEnumModel[]): IBadgeCardModel {
    return {
        points: model.Points,
        progress: model.Progress,
        total: model.Total,
        type: firstOrDefault(badgeTypes, type => type.key === model.Type)!
    };
}