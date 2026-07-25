import { EnumService, IGameTeamServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IGameTeamSearchTableModel } from "./game-team-search-table.model";
import { mapGameTeamModel } from "@share/mappers/game/team/game-team.mapper";

export function mapGameTeamSearchTableModel(
    model: IGameTeamServiceModel, enumService: EnumService,
    buildActions: ((model: IGameTeamSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IGameTeamSearchTableModel {

    const result: IGameTeamSearchTableModel = mapGameTeamModel(model, enumService);

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}