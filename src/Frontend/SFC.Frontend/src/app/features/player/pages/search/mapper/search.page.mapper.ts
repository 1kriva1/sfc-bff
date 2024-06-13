import {
    convertTimestampToDate, ISortingModel, empty
} from "ngx-sfc-common";
import { Locale } from "@core/enums";
import { EnumService } from "@share/services";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { convertFromServerStats } from "@share/utils";
import { ISearchPageModel } from "../models/search.page.model";
import { IPlayerItemModel, IFindPlayersRequest } from "../../../services/player/models/find";
import { IPlayersTableModel } from "../parts/table/players-table.model";
import { PlayersTableColumn } from "../parts/table/enums/players-table-column.enum";
import { PlayersTableSorting } from "../parts/table/enums/players-table-sorting.enum";

export function mapGetPlayersRequest(
    model: ISearchPageModel,
    page: number,
    size: number,
    sorting: ISortingModel | empty): IFindPlayersRequest {
    return {
        Pagination: { Page: page, Size: size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Profile: {
                General: ({
                    Availability: {
                        Days: model.general?.availability.days,
                        From: model.general?.availability.from?.toLocaleTimeString(Locale.English, { hour12: false })!,
                        To: model.general?.availability.to?.toLocaleTimeString(Locale.English, { hour12: false })!,
                    },
                    City: model.general?.city,
                    Name: model.name,
                    FreePlay: model.general?.freePlay,
                    Tags: model.general?.tags,
                    HasPhoto: model.general?.hasPhoto,
                    Years: { From: model.general?.years.from, To: model.general?.years.to }
                }),
                Football: {
                    GameStyles: model.football?.gameStyles,
                    Height: { From: model.football?.height.from, To: model.football?.height.to },
                    Weight: { From: model.football?.weight.from, To: model.football?.weight.to },
                    PhysicalCondition: model.football?.physicalCondition,
                    Skill: model.football?.skill,
                    Positions: model.football?.positions,
                    WorkingFoot: model.football?.workingFoot?.key!
                }
            },
            Stats: {
                Total: { From: model.stats?.total.from, To: model.stats?.total.to },
                Mental: {
                    From: model.stats?.mental.from,
                    To: model.stats?.mental.to,
                    Skill: 1
                },
                Physical: {
                    From: model.stats?.physical.from,
                    To: model.stats?.physical.to,
                    Skill: 0
                },
                Skill: {
                    From: model.stats?.skill.from,
                    To: model.stats?.skill.to,
                    Skill: 2
                },
                Raiting: model.stats?.raiting
            }
        }
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

export function mapSearchPageTableModel(
    model: IPlayerItemModel,
    enumService: EnumService): IPlayersTableModel {
    return {
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
    }
}