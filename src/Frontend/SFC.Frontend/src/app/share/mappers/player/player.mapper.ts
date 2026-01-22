import { IPlayerModel } from "@share/models/player/player.model";
import { IPlayerModel as IPlayerHttpModel } from "@share/services/player/general/models/common/player.model";
import { EnumService } from "@share/services";
import { convertFromServerStats } from "@share/utils/stats";
import { convertTimestampToDate } from "ngx-sfc-common";

export function mapPlayerModel(model: IPlayerHttpModel, enumService: EnumService): IPlayerModel {
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
    };
}