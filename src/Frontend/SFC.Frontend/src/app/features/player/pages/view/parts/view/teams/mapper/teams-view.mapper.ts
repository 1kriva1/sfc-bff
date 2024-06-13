import { empty, firstOrDefault, ISortingModel } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IGetTeamsItemModel } from "../../../../../../services/team/models/get/result/get-teams-item.model";
import { IGetTeamsRequest } from "../../../../../../services/team/models/get/get-teams.request";
import { ITeamsViewModel } from "../teams-view.model";
import { ITeamRowModel } from "../parts/table/row/team-row.model";
import { IEnumModel } from "@core/types";

export function mapGetTeamsRequest(
    model: ITeamsViewModel,
    page: number,
    size: number,
    sorting: ISortingModel | empty): IGetTeamsRequest {
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

export function mapTeamRowModel(model: IGetTeamsItemModel, teamStatuses:IEnumModel<number>[]): ITeamRowModel {
    return {
        city: model.City,
        coach: model.Coach ? {
            id: model.Coach.Id,
            firstName: model.Coach.FirstName,
            lastName: model.Coach.LastName,
            photo: model.Coach.Photo
        } : null,
        createdDate: model.CreatedDate,
        logo: model.Logo,
        name: { full: model.FullName, short: model.ShortName },
        raiting: model.Raiting,
        schema: model.Schema,
        status: firstOrDefault(teamStatuses, status=>status.key === model.Status)!
    };
}