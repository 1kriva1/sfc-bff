import { EnumService, IFindTeamSchemesRequest, ITeamSchemeServiceModel } from "@share/services";
import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { TeamEditSchemesTableColumn } from "./parts/table/team-edit-schemes-table-column.enum";
import { mapTeamSchemeModel } from "@share/mappers";
import { ITeamEditSchemesTableModel } from "./parts/table/team-edit-schemes-table.model";
import { ITeamEditSchemesFilterModel } from "./team-edit-schemes-form.model";

export function mapFindTeamSchemesRequest(
    model: ITeamEditSchemesFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamSchemesRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Profile: {
                General: {
                    Name: model.name,
                    Comment: null
                }
            },
            Formation: {
                Formation: null,
                Players: {
                    Stats: {
                        Total: null
                    }
                }
            }
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case TeamEditSchemesTableColumn.Name:
                return [
                    { Name: 'Name', Direction: sorting.direction }
                ];
            default:
                return [];
        }
    }
}

export function mapTeamEditSchemesTableModel(
    model: ITeamSchemeServiceModel,
    enumService: EnumService,
    buildActions: ((model: ITeamEditSchemesTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamEditSchemesTableModel {

    const result: ITeamEditSchemesTableModel = mapTeamSchemeModel(model, enumService);

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}