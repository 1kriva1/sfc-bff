import { ENUM_SERVICE } from "@test/stubs";
import { CommonConstants } from "ngx-sfc-common";
import { IGetTeamsItemModel, IGetTeamsRequest } from "../../../../../../services/team/models/get";
import { ITeamRowModel } from "../parts/table/row/team-row.model";
import { ITeamsViewModel } from "../teams-view.model";
import { mapGetTeamsRequest, mapTeamRowModel } from "./teams-view.mapper";

describe('Features.Player.Page:View.Part.View:Teams.Mapper', () => {
    describe('GetTeams request', () => {
        fit('Should map pagination', () => {
            const model: ITeamsViewModel = buildTeamsViewModel();

            const result: IGetTeamsRequest = mapGetTeamsRequest(model, 1, 10, null);

            expect(result.Pagination).toEqual({ Page: 1, Size: 10 });
        });

        fit('Should map sorting', () => {
            const model: ITeamsViewModel = buildTeamsViewModel();

            expect(mapGetTeamsRequest(model, 1, 10, null).Sorting).toEqual([]);
        });

        fit('Should map filters', () => {
            const model: ITeamsViewModel = buildTeamsViewModel();

            const result: IGetTeamsRequest = mapGetTeamsRequest(model, 1, 10, null);

            expect(result.Filter).toEqual({ Name: model.name, Statuses: model.statuses });
        });
    });

    describe('TeamRow model', () => {
        fit('Should map item to model', () => {
            const model: IGetTeamsItemModel = buildGetTeamsItemModel();

            const result: ITeamRowModel = mapTeamRowModel(model, ENUM_SERVICE.enums?.teamStatuses!);

            expect(result).toEqual({
                city: 'City',
                coach: null,
                createdDate: new Date(2024, 7, 8),
                logo: null,
                raiting: 3,
                schema: '4-4-2',
                name:{short: 'NAM', full: 'Name'},
                status:ENUM_SERVICE.enums?.teamStatuses[0]!
            });
        });
    });

    function buildTeamsViewModel(): ITeamsViewModel {
        return {
            name: CommonConstants.EMPTY_STRING,
            statuses: []
        };
    }

    function buildGetTeamsItemModel(): IGetTeamsItemModel {
        return {
            Id: 0,
            City: 'City',
            Coach: null,
            CreatedDate: new Date(2024, 7, 8),
            FullName: 'Name',
            Logo: null,
            Raiting: 3,
            Schema: '4-4-2',
            ShortName: 'NAM',
            Status: 0
        };
    }
});