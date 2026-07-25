import { convertDateToTimestamp, isDefined } from "ngx-sfc-common";
import { ICreateGameRequest } from "@share/services/game";
import { ICreateGameTeamInvitesModel, ICreateGameTeamInvitesRequest } from "@share/services";
import { IGameTeamsEditFormModel } from "./components/edit/parts/teams/game-teams-edit-form.model";
import { IGameCreatePageFormModel } from "./game-create-page-form.model";

export async function mapCreateGameRequestAsync(value: IGameCreatePageFormModel): Promise<ICreateGameRequest> {
    return {
        Game: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    Description: value.profile.general.description,
                    Tags: value.profile.general.tags,
                    Date: value.profile.general.date,
                    From: convertDateToTimestamp(value.profile.general.from),
                    To: convertDateToTimestamp(value.profile.general.to),
                    Stadium: null
                },
                Financial: {
                    FreeGame: value.profile.financial.freeGame,
                    PayAmount: value.profile.financial.payAmount
                },
                Inventary: {
                    ShirtsRequired: value.profile.inventary.shirtsRequired,
                    ShirtsCount: value.profile.inventary.shirtsCount
                }
            }
        }
    }
}

export function mapCreateGameTeamInvitesRequest(value: IGameTeamsEditFormModel): ICreateGameTeamInvitesRequest {
    const invites: ICreateGameTeamInvitesModel[] = [];

    if (isDefined(value.teamAId)) {
        invites.push({ Team: value.teamAId! });
    }

    if (isDefined(value.teamBId)) {
        invites.push({ Team: value.teamBId! });
    }

    return {
        Invites: invites
    }
}