import { mapTeamSchemeModel } from "@share/mappers";
import { EnumService, ITeamSchemeServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISchemeTeamSearchTableModel } from "./scheme-team-search-table.model";

export function mapSchemeTeamSearchTableModel(
    model: ITeamSchemeServiceModel,
    enumService: EnumService,
    buildActions: ((model: ISchemeTeamSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): ISchemeTeamSearchTableModel {

    const result: ISchemeTeamSearchTableModel = mapTeamSchemeModel(model, enumService);
    
    result.actions = buildActions ? buildActions(result) : [];

    return result;
}