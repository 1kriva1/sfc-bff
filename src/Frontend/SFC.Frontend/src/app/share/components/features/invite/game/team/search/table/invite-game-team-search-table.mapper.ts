import { EnumService, IInviteGameTeamServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { mapGameModel, mapTeamModel } from "@share/mappers";
import { IInviteGameTeamSearchTableModel } from "./invite-game-team-search-table.model";

export function mapInviteGameTeamSearchTableModel(
    model: IInviteGameTeamServiceModel, enumService: EnumService,
    buildActions: ((model: IInviteGameTeamSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IInviteGameTeamSearchTableModel {
    const result: IInviteGameTeamSearchTableModel = {
        id: model.Id,
        status: model.Status,
        gameComment: model.GameComment,
        teamComment: model.TeamComment,
        team: mapTeamModel(model.Team, enumService),
        game: mapGameModel(model.Game, enumService)
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}