import { FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof, empty } from "ngx-sfc-common";
import { buildPath, getFormGroup } from "@core/utils";
import { IGameTeamInventaryProfileEditFormModel } from "./game-team-inventary-profile-edit-form.model";
import { GameTeamProfileEditPart } from "../../enums/game-team-profile-edit-part.enum";
import { IGameTeamEditFormModel } from "../../../../game-team-edit-form.model";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { GameTeamProfileEditRoute } from "../../enums/game-team-profile-edit-route.enum";
import { ITeamProfileModel } from "@share/models";
import { GameTeamEditRoute } from "../../../../enums/game-team-edit-route.enum";
import { IFormProgressParameters } from "@share/components";
import { GameTeamInventaryProfileEditConstants } from "./game-team-inventary-profile-edit.constants";

export function addGameTeamInventaryProfileEditControl(formBuilder: FormBuilder, form: FormGroup, model: ITeamProfileModel | empty = null): void {
    const formModel: IGameTeamInventaryProfileEditFormModel = mapGameTeamInventaryProfileEditFormModel(model);

    const controls: IForm<IGameTeamInventaryProfileEditFormModel> = {
        shirts: [formModel.shirts],
        balls: [formModel.balls],
    };

    const inventaryProfileFormGroup: FormGroup = formBuilder.group(controls),
        profileFormGroup: FormGroup = getFormGroup(nameof<IGameTeamEditFormModel>('profile'), form.controls)!;

    profileFormGroup.addControl(GameTeamProfileEditPart.Inventary, inventaryProfileFormGroup);
}

export function getGameTeamInventaryProfileProgressParameters(gameId: number): IFormProgressParameters {
    return {
        key: GameTeamInventaryProfileEditConstants.ProgressKey,
        url: buildPath(`${Route.Games}/${gameId}/${Route.Teams}/${RouteKey.Create}/${GameTeamEditRoute.Profile}/${GameTeamProfileEditRoute.Inventary}`)
    };
}

function mapGameTeamInventaryProfileEditFormModel(model: ITeamProfileModel | empty = null): IGameTeamInventaryProfileEditFormModel {
    return {
        shirts: model?.inventary.shirts,
        balls: null
    };
}