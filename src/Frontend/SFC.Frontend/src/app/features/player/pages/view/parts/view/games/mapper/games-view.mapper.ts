import { empty, firstOrDefault, ISortingModel } from "ngx-sfc-common";
import { IGamesViewModel } from "../games-view.model";
import { IGetGamesRequest, IGetGamesItemModel } from "../../../../../../services/game/models/get";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IEnumModel } from "@core/types";
import { IGameRowModel } from "../parts/table/row/game-row.model";

export function mapGetGamesRequest(
    model: IGamesViewModel,
    page: number,
    size: number,
    sorting: ISortingModel | empty): IGetGamesRequest {
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

export function mapGameRowModel(model: IGetGamesItemModel, gameStatuses: IEnumModel<number>[]): IGameRowModel {
    return {
        name: model.Name,
        date: { date: model.Date.Date, end: model.Date.End, start: model.Date.Start },
        freePlay: model.FreePlay,
        location: { city: model.Location.City, field: { name: model.Location.Field.Name, photo: model.Location.Field.Photo, raiting: model.Location.Field.Raiting } },
        result: {
            scoreOne: { 
                team: { fullName: model.Result.ScoreOne.Team.FullName, shortName: model.Result.ScoreOne.Team.ShortName, emblem: model.Result.ScoreOne.Team.Emblem }, 
                value: model.Result.ScoreOne.Value 
            },
            scoreTwo: { 
                team: { fullName: model.Result.ScoreTwo.Team.FullName, shortName: model.Result.ScoreTwo.Team.ShortName, emblem: model.Result.ScoreOne.Team.Emblem }, 
                value: model.Result.ScoreTwo.Value 
            }
        },
        status: firstOrDefault(gameStatuses, status => status.key === model.Status)!
    };
}