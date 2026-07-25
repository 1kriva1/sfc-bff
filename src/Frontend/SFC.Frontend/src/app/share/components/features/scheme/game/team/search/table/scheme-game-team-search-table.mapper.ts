import { mapSchemeGameTeamModel } from "@share/mappers";
import { EnumService, ISchemeGameTeamServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISchemeGameTeamSearchTableModel } from "./scheme-game-team-search-table.model";

export function mapSchemeGameTeamSearchTableModel(
    model: ISchemeGameTeamServiceModel,
    enumService: EnumService,
    buildActions: ((model: ISchemeGameTeamSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): ISchemeGameTeamSearchTableModel {

    const result: ISchemeGameTeamSearchTableModel = mapSchemeGameTeamModel(model, enumService);
    
    result.actions = buildActions ? buildActions(result) : [];

    return result;
}