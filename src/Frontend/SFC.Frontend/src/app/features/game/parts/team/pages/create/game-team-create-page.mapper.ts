import { ICreateGameTeamRequest, ICreatesGameTeamPlayerRequest, ICreateTeamRequest, IDeletesGameTeamPlayerRequest } from "@share/services";
import { IGameTeamCreatePageFormModel } from "./models/game-team-create-page-form.model";
import { convertFileToBase64StringAsync } from "@core/utils";

export async function mapCreateTeamRequestAsync(value: IGameTeamCreatePageFormModel): Promise<ICreateTeamRequest> {
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

export function mapCreateGameTeamRequest(teamId: number): ICreateGameTeamRequest {
    return {
        GameTeam: {
            Team: teamId
        }
    }
}

export function mapCreatesGameTeamPlayerRequest(playerIds: number[]): ICreatesGameTeamPlayerRequest {
    return {
        GameTeamPlayers: playerIds.map(id => ({ Player: id }))
    };
}