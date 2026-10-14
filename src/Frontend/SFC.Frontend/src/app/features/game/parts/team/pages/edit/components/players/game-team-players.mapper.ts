import { ICreateGameTeamPlayerRequest, ICreatesGameTeamPlayerRequest, IDeletesGameTeamPlayerRequest } from "@share/services";

export function mapCreateGameTeamPlayerRequest(): ICreateGameTeamPlayerRequest {
    return {
        GameTeamPlayer: {}
    };
}

export function mapCreatesGameTeamPlayerRequest(playerIds: number[]): ICreatesGameTeamPlayerRequest {
    return {
        GameTeamPlayers: playerIds.map(id => ({ Player: id }))
    };
}

export function mapDeletesGameTeamPlayerRequest(playerIds: number[]): IDeletesGameTeamPlayerRequest {
    return {
        GameTeamPlayers: playerIds.map(id => ({ Player: id }))
    };
}