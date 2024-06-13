import { faSun } from "@fortawesome/free-solid-svg-icons";
import { ENUM_SERVICE } from "@test/stubs";
import { CommonConstants } from "ngx-sfc-common";
import { IGetGamesItemModel, IGetGamesRequest } from "../../../../../../services/game/models/get";
import { IGamesViewModel } from "../games-view.model";
import { IGameRowModel } from "../parts/table/row/game-row.model";
import { mapGameRowModel, mapGetGamesRequest } from "./games-view.mapper";

describe('Features.Player.Page:View.Part.View:Games.Mapper', () => {
    describe('GetGames request', () => {
        fit('Should map pagination', () => {
            const model: IGamesViewModel = buildGamesViewModel();

            const result: IGetGamesRequest = mapGetGamesRequest(model, 1, 10, null);

            expect(result.Pagination).toEqual({ Page: 1, Size: 10 });
        });

        fit('Should map sorting', () => {
            const model: IGamesViewModel = buildGamesViewModel();

            expect(mapGetGamesRequest(model, 1, 10, null).Sorting).toEqual([]);
        });

        fit('Should map filters', () => {
            const model: IGamesViewModel = buildGamesViewModel();

            const result: IGetGamesRequest = mapGetGamesRequest(model, 1, 10, null);

            expect(result.Filter).toEqual({ Name: model.name, Statuses: model.statuses });
        });
    });

    describe('GameRow model', () => {
        fit('Should map item to model', () => {
            const model: IGetGamesItemModel = buildGetGamesItemModel();

            const result: IGameRowModel = mapGameRowModel(model, ENUM_SERVICE.enums?.gameStatuses!);

            expect(result).toEqual({
                name: 'Name 0',
                date: { date: new Date(), end: new Date(), start: new Date() },
                freePlay: true,
                location: { city: 'City', field: { name: 'Field', photo: null, raiting: 3 } },
                result: {
                    scoreOne: { team: { fullName: 'Team A', shortName: 'TMA', emblem: null }, value: 1 },
                    scoreTwo: { team: { fullName: 'Team A', shortName: 'TMA', emblem: null }, value: 2 }
                },
                status: { key: 0, value: 'New', icon: faSun }
            });
        });
    });

    function buildGamesViewModel(): IGamesViewModel {
        return {
            name: CommonConstants.EMPTY_STRING,
            statuses: []
        };
    }

    function buildGetGamesItemModel(): IGetGamesItemModel {
        return {
            Id: 0,
            Name: 'Name 0',
            Date: { Date: new Date(), End: new Date(), Start: new Date() },
            FreePlay: true,
            Location: { City: 'City', Field: { Name: 'Field', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { FullName: 'Team A', ShortName: 'TMA', Emblem: null }, Value: 1 },
                ScoreTwo: { Team: { FullName: 'Team A', ShortName: 'TMA', Emblem: null }, Value: 2 }
            },
            Status: 0
        };
    }
});