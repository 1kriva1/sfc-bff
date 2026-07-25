import { convertFileToBase64StringAsync } from "@core/utils";
import { IUpdateTeamRequest } from "@share/services";
import { IGameTeamEditPageFormModel } from "./models/game-team-edit-page-form.model";

export async function mapUpdateTeamRequestAsync(value: IGameTeamEditPageFormModel): Promise<IUpdateTeamRequest> {
    return {
        Team: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    City: 'Game city',
                    Description: value.profile.general.description,
                    Tags: value.profile.general.tags,
                    Logo: await convertFileToBase64StringAsync(value.profile.general.logo),
                    Availability: []
                },
                Financial: {
                    FreePlay: true,
                    HasManiches: false
                },
                Inventary: {
                    Shirts: value.profile.inventary.shirts
                }
            }
        }
    }
}