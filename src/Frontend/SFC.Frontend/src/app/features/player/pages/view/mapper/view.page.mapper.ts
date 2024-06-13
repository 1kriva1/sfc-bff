import { IEnumModel } from "@core/types";
import { getWeekDays } from "@core/utils";
import { EnumService } from "@share/services";
import { convertFromServerStats } from "@share/utils";
import { convertTimestampToDate, isDefined, firstOrDefault, any } from "ngx-sfc-common";
import { IGetPlayerModel, IProfileModel } from "../../../services/player/models/get";
import { IPlayerModel } from "./models";

export async function mapPlayerModel(value: IGetPlayerModel, enumService: EnumService): Promise<IPlayerModel> {
    const profile: IProfileModel = value.Profile,
        footballPosition = isDefined(profile.Football.Position)
            ? firstOrDefault(enumService.enums.footballPositions,
                p => p.key == profile.Football.Position)
            : null,
        additionalPosition = isDefined(profile.Football.AdditionalPosition)
            ? firstOrDefault(enumService.enums.footballPositions,
                p => p.key == profile.Football.AdditionalPosition)
            : null,
        workingFoot = isDefined(profile.Football.WorkingFoot)
            ? firstOrDefault(enumService.enums.workingFoots,
                p => p.key == profile.Football.WorkingFoot)
            : null,
        gameStyle = isDefined(profile.Football.GameStyle)
            ? firstOrDefault(enumService.enums.gameStyles,
                p => p.key == profile.Football.GameStyle)
            : null,
        weekDays = any(profile.General.Availability.Days)
            ? getWeekDays(profile.General.Availability.Days) as IEnumModel<number>[]
            : null;

    return {
        general: {
            firstName: profile.General.FirstName,
            lastName: profile.General.LastName,
            photo: profile.General.Photo ? profile.General.Photo : null,
            city: profile.General.City,
            birthday: profile.General.Birthday ? new Date(profile.General.Birthday) : null,
            biography: profile.General.Biography,
            tags: profile.General.Tags,
            availability: {
                days: weekDays,
                from: profile.General.Availability.From ? convertTimestampToDate(profile.General.Availability.From) : null,
                to: profile.General.Availability.To ? convertTimestampToDate(profile.General.Availability.To) : null
            },
            freePlay: profile.General.FreePlay
        },
        football: {
            height: profile.Football.Height,
            weight: profile.Football.Weight,
            position: footballPosition,
            additionalPosition: additionalPosition,
            workingFoot: workingFoot,
            number: profile.Football.Number,
            gameStyle: gameStyle,
            skill: profile.Football.Skill,
            weakFoot: profile.Football.WeakFoot,
            physicalCondition: profile.Football.PhysicalCondition
        },
        stats: {
            value: convertFromServerStats(value.Stats.Values, enumService.enums.statTypes)
        }
    }
}