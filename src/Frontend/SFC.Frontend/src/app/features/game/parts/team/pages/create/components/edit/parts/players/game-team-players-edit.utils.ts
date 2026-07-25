import { buildPath } from "@core/utils";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { IFormProgressParameters } from "@share/components";
import { GameTeamCreatePageRoute } from "../../../../game-team-create-page-route.enum";
import { GameTeamPlayersEditConstants } from "./game-team-players-edit.constants";
import { IGameTeamPlayersEditFormModel } from "./game-team-players-edit-form.model";
import { IForm } from "@core/types";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GameTeamCreatePageEditPart } from "../../game-team-create-page-edit-part.enum";

export function addGameTeamPlayersEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const controls: IForm<IGameTeamPlayersEditFormModel> = {
        ids: [null]
    };

    const playersEditFormGroup: FormGroup = formBuilder.group(controls);

    form.addControl(GameTeamCreatePageEditPart.Players, playersEditFormGroup);
}

export function getGameTeamPlayersProgressParameters(gameId: number): IFormProgressParameters {
    return {
        key: GameTeamPlayersEditConstants.ProgressKey,
        url: buildPath(`${Route.Games}/${gameId}/${Route.Teams}/${RouteKey.Create}/${GameTeamCreatePageRoute.Players}`)
    };
}