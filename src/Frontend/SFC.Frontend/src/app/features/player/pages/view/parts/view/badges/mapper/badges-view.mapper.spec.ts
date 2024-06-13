import { ENUM_SERVICE } from "@test/stubs";
import { CommonConstants } from "ngx-sfc-common";
import { IGetBadgesItemModel, IGetBadgesRequest } from "../../../../../../services/badge/models/get";
import { IBadgesViewModel } from "../badges-view.model";
import { IBadgeCardModel } from "../parts/table/card/badge-card.model";
import { mapBadgeCardModel, mapGetBadgesRequest } from "./badges-view.mapper";

describe('Features.Player.Page:View.Part.View:Badges.Mapper', () => {
    describe('GetBadges request', () => {
        fit('Should map pagination', () => {
            const model: IBadgesViewModel = buildBadgesViewModel();

            const result: IGetBadgesRequest = mapGetBadgesRequest(model, 1, 10, null);

            expect(result.Pagination).toEqual({ Page: 1, Size: 10 });
        });

        fit('Should map sorting', () => {
            const model: IBadgesViewModel = buildBadgesViewModel();

            expect(mapGetBadgesRequest(model, 1, 10, null).Sorting).toEqual([]);
        });

        fit('Should map filters', () => {
            const model: IBadgesViewModel = buildBadgesViewModel();

            const result: IGetBadgesRequest = mapGetBadgesRequest(model, 1, 10, null);

            expect(result.Filter).toEqual({ Name: model.name, Statuses: model.statuses });
        });
    });

    describe('BadgeCard model', () => {
        fit('Should map item to model', () => {
            const model: IGetBadgesItemModel = buildGetBadgesItemModel();

            const result: IBadgeCardModel = mapBadgeCardModel(model, ENUM_SERVICE.enums?.badgeTypes!);

            expect(result).toEqual({
                points: model.Points,
                progress: model.Progress,
                total: model.Total,
                type: ENUM_SERVICE.enums?.badgeTypes[0]!
            });
        });
    });

    function buildBadgesViewModel(): IBadgesViewModel {
        return {
            name: CommonConstants.EMPTY_STRING,
            statuses: []
        };
    }

    function buildGetBadgesItemModel(): IGetBadgesItemModel {
        return {
            Points: 22,
            Progress: 50,
            Total: 100,
            Type: 0
        };
    }
});