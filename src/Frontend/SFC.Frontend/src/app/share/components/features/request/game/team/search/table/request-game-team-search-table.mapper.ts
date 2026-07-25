import { EnumService, IRequestGameTeamServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { mapGameModel, mapTeamModel } from "@share/mappers";
import { IRequestGameTeamSearchTableModel } from "./request-game-team-search-table.model";

export function mapRequestGameTeamSearchTableModel(
    model: IRequestGameTeamServiceModel, enumService: EnumService,
    buildActions: ((model: IRequestGameTeamSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IRequestGameTeamSearchTableModel {
    const result: IRequestGameTeamSearchTableModel = {
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