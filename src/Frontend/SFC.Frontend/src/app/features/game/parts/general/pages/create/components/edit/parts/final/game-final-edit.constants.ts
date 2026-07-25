import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { Route } from "@share/enums";
import { IFormProgressParameters } from "@share/components";
import { GameCreatePageEditPart } from "../../game-create-page-edit-part.enum";

export class GameFinalEditConstants {
    static Progress: IFormProgressParameters = {
        key: 'final',
        url: buildPath(`${Route.Games}/${RouteKey.Create}/${GameCreatePageEditPart.Final}`)
    };
}