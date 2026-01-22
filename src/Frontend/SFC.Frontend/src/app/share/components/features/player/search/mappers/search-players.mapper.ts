import {
    convertTimestampToDate, ISortingModel, empty, IPaginationModel
} from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { mapPaginationModel } from "@core/mappers";
import { IPlayersFilterModel } from '../filters';
import { IPlayersTableModel, PlayersTableColumn, PlayersTableSorting } from "../table";
import { EnumService, IFindPlayersFilterModel, IFindPlayersRequest, IPlayerItemModel } from "../../../../../services";
import { convertFromServerStats, mapLimitSearchModel } from "../../../../../utils";
import { toEnglishLocaleTimeString } from "@core/utils";

export function mapFindPlayersRequest(
    model: IPlayersFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindPlayersRequest {
    return {
        Pagination: mapPaginationModel(pagination),
        Sorting: _mapSorting(sorting),
        Filter: mapFindPlayersFilterModel(model)
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case PlayersTableColumn.PhysicalCondition:
                return [{ Name: PlayersTableSorting.PhysicalCondition, Direction: sorting.direction }];
            case PlayersTableColumn.Name:
                return [
                    { Name: PlayersTableSorting.FirstName, Direction: sorting.direction },
                    { Name: PlayersTableSorting.LastName, Direction: sorting.direction }
                ];
            case PlayersTableColumn.Size:
                return [
                    { Name: PlayersTableSorting.Height, Direction: sorting.direction },
                    { Name: PlayersTableSorting.Weight, Direction: sorting.direction }
                ];
            case PlayersTableColumn.Photo:
                return [{ Name: PlayersTableSorting.Raiting, Direction: sorting.direction }];
            default:
                return [];
        }
    }
}

export function mapFindPlayersFilterModel(model: IPlayersFilterModel, excludePlayerIds: number[] = []): IFindPlayersFilterModel {
    return {
        ExcludeIds: excludePlayerIds,
        Profile: {
            General: ({
                Availability: {
                    Days: model.general?.availability.days,
                    From: toEnglishLocaleTimeString(model.general?.availability.from),
                    To: toEnglishLocaleTimeString(model.general?.availability.to)
                },
                City: model.general?.city,
                Name: model.name,
                FreePlay: model.general?.freePlay,
                Tags: model.general?.tags,
                HasPhoto: model.general?.hasPhoto,
                Years: mapLimitSearchModel(model.general?.years)
            }),
            Football: {
                GameStyles: model.football?.gameStyles,
                Height: mapLimitSearchModel(model.football?.height),
                Weight: mapLimitSearchModel(model.football?.weight),
                PhysicalCondition: model.football?.physicalCondition,
                Skill: model.football?.skill,
                Positions: model.football?.positions,
                WorkingFoot: model.football?.workingFoot
            }
        },
        Stats: {
            Total: mapLimitSearchModel(model.stats?.total),
            Mental: {
                From: model.stats?.mental?.from,
                To: model.stats?.mental?.to,
                Skill: 1
            },
            Physical: {
                From: model.stats?.physical?.from,
                To: model.stats?.physical?.to,
                Skill: 0
            },
            Skill: {
                From: model.stats?.skill?.from,
                To: model.stats?.skill?.to,
                Skill: 2
            },
            Raiting: model.stats?.raiting
        }
    };
}

export function mapPlayerTableModel(
    model: IPlayerItemModel,
    enumService: EnumService,
    buildActions: ((model: IPlayersTableModel) => IDropdownMenuItemModel[]) | empty = null): IPlayersTableModel {
    const result: IPlayersTableModel = {
        id: model.Id,
        general: {
            firstName: model.Profile.General.FirstName,
            lastName: model.Profile.General.LastName,
            photo: model.Profile.General.Photo,
            city: model.Profile.General.City,
            birthday: model.Profile.General.Birthday ? new Date(model.Profile.General.Birthday) : null,
            tags: model.Profile.General.Tags,
            availability: {
                days: model.Profile.General.Availability.Days,
                from: model.Profile.General.Availability.From ? convertTimestampToDate(model.Profile.General.Availability.From) : null,
                to: model.Profile.General.Availability.To ? convertTimestampToDate(model.Profile.General.Availability.To) : null
            },
            freePlay: model.Profile.General.FreePlay
        },
        football: {
            height: model.Profile.Football.Height,
            weight: model.Profile.Football.Weight,
            position: model.Profile.Football.Position,
            workingFoot: model.Profile.Football.WorkingFoot,
            gameStyle: model.Profile.Football.GameStyle,
            skill: model.Profile.Football.Skill,
            physicalCondition: model.Profile.Football.PhysicalCondition,
        },
        stats: convertFromServerStats(model.Stats.Values, enumService.enums.statTypes)
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}