import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { Route } from "@share/enums";
import { IFormProgressParameters } from "@share/components";
import { GameCreatePageEditPart } from "../../game-create-page-edit-part.enum";

export class GameTeamsEditConstants {
    static Progress: IFormProgressParameters = {
        key: 'teams',
        url: buildPath(`${Route.Games}/${RouteKey.Create}/${GameCreatePageEditPart.Teams}`)
    };
}