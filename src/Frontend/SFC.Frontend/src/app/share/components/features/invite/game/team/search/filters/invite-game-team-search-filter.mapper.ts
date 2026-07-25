import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IInviteGameTeamFindFilterModel, IInviteGameTeamFindRequest, IInviteGameTeamInviteFindFilterModel } from "@share/services";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";
import { IInviteGameTeamFilterModel } from "./parts/invite-game-team-filter.model";
import { IInviteGameTeamSearchFilterModel } from "./invite-game-team-search-filter.model";
import { mapFindTeamsFilterModel } from "@share/components/features/team";
import { InviteGameTeamSearchTableColumn } from "../table/invite-game-team-search-table-column.enum";

export function mapFindInviteGameTeamRequest(
    model: IInviteGameTeamSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IInviteGameTeamFindRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Team: mapFindTeamsFilterModel(model.team),
            Invite: mapFindInviteGameTeamInviteFilterModel(model.invite)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case InviteGameTeamSearchTableColumn.Information:
                return [
                    {
                        Name: buildPropertyPath(nameof<IInviteGameTeamFindFilterModel>('Team'), PlayersTableSorting.FirstName),
                        Direction: sorting.direction
                    },
                    {
                        Name: buildPropertyPath(nameof<IInviteGameTeamFindFilterModel>('Team'), PlayersTableSorting.LastName),
                        Direction: sorting.direction
                    }
                ]
            case InviteGameTeamSearchTableColumn.Rating:
                return [
                    {
                        Name: buildPropertyPath(nameof<IInviteGameTeamFindFilterModel>('Team'), PlayersTableSorting.Raiting),
                        Direction: sorting.direction
                    }
                ];
            default:
                return [];
        }
    }
}

export function mapFindInviteGameTeamInviteFilterModel(model: IInviteGameTeamFilterModel): IInviteGameTeamInviteFindFilterModel {
    return {
        Statuses: model.general.statuses || [],
    };
}