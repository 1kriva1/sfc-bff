import { convertFileToBase64StringAsync } from "@core/utils";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { ICreateTeamPlayerInvitesRequest, ICreateTeamRequest } from "@share/services";
import { mapAvailabilityModel } from "@share/utils/http";
import { TeamCreatePageFormModel } from "./team-create-page-form.model";

export async function mapCreateTeamRequestAsync(value: TeamCreatePageFormModel): Promise<ICreateTeamRequest> {
    return {
        Team: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    City: value.profile.general.city,
                    Description: value.profile.general.description,
                    Tags: value.profile.general.tags,
                    Logo: await convertFileToBase64StringAsync(value.main.logo),
                    Availability: value.profile.availability.value?.map(availability => mapAvailabilityModel(availability))
                },
                Financial: {
                    FreePlay: value.profile.financial.freePlay || false,
                    HasManiches: value.profile.financial.hasManiches || false,
                },
                Inventary: {
                    Shirts: value.profile.financial.shirts
                }
            }
        }
    }
}

export function mapCreateTeamPlayerInvitesRequest(value: ITeamPlayerInviteModel[]): ICreateTeamPlayerInvitesRequest {
    return {
        Invites: value.map(invite => ({
            Player: invite.player.id,
            Comment: invite.teamComment
        }))
    }
}