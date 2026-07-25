import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable, of } from "rxjs";
import { GameServiceConstants } from "../../game-service.constants";
import { GameTeamServiceConstants } from "../game-team-service.constants";
import { LOADER } from "@core/interceptors";
import { ICreatesGameTeamPlayerRequest } from "./models/creates/creates-game-team-player.request";
import { ICreatesGameTeamPlayerResponse } from "./models/creates/creates-game-team-player.response";
import { IGameTeamPlayerFindRequest } from "./models/find/game-team-player-find.request";
import { IGameTeamPlayerFindResponse } from "./models/find/game-team-player-find.response";
import { GameTeamPlayerServiceConstants } from "./game-team-player-service.constants";
import { ICreateGameTeamPlayerResponse } from "./models/create/create-game-team-player.response";
import { IDeleteGameTeamPlayerResponse } from "./models/delete/delete-game-team-player.response";
import { IDeletesGameTeamPlayerRequest } from "./models/deletes/deletes-game-team-player.request";
import { IDeletesGameTeamPlayerResponse } from "./models/deletes/deletes-game-team-player.response";
@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayerService {

    constructor(private http: HttpClient) { }

    public creates(gameId: number, teamId: number, request: ICreatesGameTeamPlayerRequest): Observable<ICreatesGameTeamPlayerResponse> {
        // return this.http.post<ICreatesGameTeamPlayerResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/creates`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            GameTeamPlayers: [],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ICreatesGameTeamPlayerResponse);
    }

    public create(gameId: number, teamId: number, playerId: number): Observable<ICreateGameTeamPlayerResponse> {
        // return this.http.post<ICreateGameTeamPlayerResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}/${playerId}`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // )

        return of({
            GameTeamPlayer: {
                Id: 10,
                Status: 0,
                Player: {
                    "Id": 5,
                    "Profile": {
                        "General": {
                            "FirstName": "Cynthia",
                            "LastName": "Bell",
                            "Photo": null,
                            "Birthday": null,
                            "City": "Northtown",
                            "FreePlay": false,
                            "Tags": [
                                "Superman",
                                "Mountain",
                                "AngryMan",
                                "Virtuoso",
                                "handsome man",
                                "dribbler",
                                "complainer",
                                "big",
                                "brother"
                            ],
                            "Availability": {
                                "Days": [
                                    5
                                ],
                                "From": "00:00:00",
                                "To": "23:59:00"
                            }
                        },
                        "Football": {
                            "Height": 200,
                            "Weight": 80,
                            "Position": 3,
                            "WorkingFoot": 0,
                            "GameStyle": 3,
                            "Skill": 4,
                            "PhysicalCondition": 4
                        }
                    },
                    "Stats": {
                        "Values": [
                            {
                                "Type": 0,
                                "Value": 100
                            },
                            {
                                "Type": 1,
                                "Value": 100
                            },
                            {
                                "Type": 2,
                                "Value": 100
                            },
                            {
                                "Type": 3,
                                "Value": 100
                            },
                            {
                                "Type": 4,
                                "Value": 100
                            },
                            {
                                "Type": 5,
                                "Value": 100
                            },
                            {
                                "Type": 6,
                                "Value": 100
                            },
                            {
                                "Type": 7,
                                "Value": 100
                            },
                            {
                                "Type": 8,
                                "Value": 100
                            },
                            {
                                "Type": 9,
                                "Value": 100
                            },
                            {
                                "Type": 10,
                                "Value": 100
                            },
                            {
                                "Type": 11,
                                "Value": 100
                            },
                            {
                                "Type": 12,
                                "Value": 100
                            },
                            {
                                "Type": 13,
                                "Value": 100
                            },
                            {
                                "Type": 14,
                                "Value": 100
                            },
                            {
                                "Type": 15,
                                "Value": 100
                            },
                            {
                                "Type": 16,
                                "Value": 100
                            },
                            {
                                "Type": 17,
                                "Value": 100
                            },
                            {
                                "Type": 18,
                                "Value": 100
                            },
                            {
                                "Type": 19,
                                "Value": 100
                            },
                            {
                                "Type": 20,
                                "Value": 100
                            },
                            {
                                "Type": 21,
                                "Value": 100
                            },
                            {
                                "Type": 22,
                                "Value": 100
                            },
                            {
                                "Type": 23,
                                "Value": 100
                            },
                            {
                                "Type": 24,
                                "Value": 100
                            },
                            {
                                "Type": 25,
                                "Value": 100
                            },
                            {
                                "Type": 26,
                                "Value": 100
                            },
                            {
                                "Type": 27,
                                "Value": 100
                            },
                            {
                                "Type": 28,
                                "Value": 100
                            }
                        ]
                    }
                },
                Team: {
                    Id: 40,
                    Status: 0,
                    Profile: {
                        General: {
                            Name: "Athletic Aces",
                            City: "sqss",
                            Description: null,
                            Logo: null,
                            Tags: [
                                "Athletic",
                                "Collective",
                                "Gladiators"
                            ],
                            Availability: []
                        },
                        Financial: {
                            FreePlay: false,
                            HasManiches: false
                        },
                        Inventary: {
                            Shirts: [
                                0
                            ]
                        }
                    },
                    Players: []
                }
            },
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ICreateGameTeamPlayerResponse);
    }

    public delete(gameId: number, teamId: number, playerId: number): Observable<IDeleteGameTeamPlayerResponse> {
        // return this.http.delete<IDeleteGameTeamPlayerResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}/${playerId}`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IDeleteGameTeamPlayerResponse);
    }

    public deletes(gameId: number, teamId: number, request: IDeletesGameTeamPlayerRequest): Observable<IDeletesGameTeamPlayerResponse> {
        // return this.http.post<IDeletesGameTeamPlayerResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/deletes`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            GameTeamPlayers: [],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IDeletesGameTeamPlayerResponse);
    }

    public find(gameId: number, teamId: number, request: IGameTeamPlayerFindRequest): Observable<HttpResponse<IGameTeamPlayerFindResponse>> {
        // return this.http.get<IGameTeamPlayerFindResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );

        const body: IGameTeamPlayerFindResponse = {
            Items: [
                {
                    Id: 10,
                    Status: 0,
                    Player: {
                        "Id": 5,
                        "Profile": {
                            "General": {
                                "FirstName": "Cynthia",
                                "LastName": "Bell",
                                "Photo": null,
                                "Birthday": null,
                                "City": "Northtown",
                                "FreePlay": false,
                                "Tags": [
                                    "Superman",
                                    "Mountain",
                                    "AngryMan",
                                    "Virtuoso",
                                    "handsome man",
                                    "dribbler",
                                    "complainer",
                                    "big",
                                    "brother"
                                ],
                                "Availability": {
                                    "Days": [
                                        5
                                    ],
                                    "From": "00:00:00",
                                    "To": "23:59:00"
                                }
                            },
                            "Football": {
                                "Height": 200,
                                "Weight": 80,
                                "Position": 3,
                                "WorkingFoot": 0,
                                "GameStyle": 3,
                                "Skill": 4,
                                "PhysicalCondition": 4
                            }
                        },
                        "Stats": {
                            "Values": [
                                {
                                    "Type": 0,
                                    "Value": 100
                                },
                                {
                                    "Type": 1,
                                    "Value": 100
                                },
                                {
                                    "Type": 2,
                                    "Value": 100
                                },
                                {
                                    "Type": 3,
                                    "Value": 100
                                },
                                {
                                    "Type": 4,
                                    "Value": 100
                                },
                                {
                                    "Type": 5,
                                    "Value": 100
                                },
                                {
                                    "Type": 6,
                                    "Value": 100
                                },
                                {
                                    "Type": 7,
                                    "Value": 100
                                },
                                {
                                    "Type": 8,
                                    "Value": 100
                                },
                                {
                                    "Type": 9,
                                    "Value": 100
                                },
                                {
                                    "Type": 10,
                                    "Value": 100
                                },
                                {
                                    "Type": 11,
                                    "Value": 100
                                },
                                {
                                    "Type": 12,
                                    "Value": 100
                                },
                                {
                                    "Type": 13,
                                    "Value": 100
                                },
                                {
                                    "Type": 14,
                                    "Value": 100
                                },
                                {
                                    "Type": 15,
                                    "Value": 100
                                },
                                {
                                    "Type": 16,
                                    "Value": 100
                                },
                                {
                                    "Type": 17,
                                    "Value": 100
                                },
                                {
                                    "Type": 18,
                                    "Value": 100
                                },
                                {
                                    "Type": 19,
                                    "Value": 100
                                },
                                {
                                    "Type": 20,
                                    "Value": 100
                                },
                                {
                                    "Type": 21,
                                    "Value": 100
                                },
                                {
                                    "Type": 22,
                                    "Value": 100
                                },
                                {
                                    "Type": 23,
                                    "Value": 100
                                },
                                {
                                    "Type": 24,
                                    "Value": 100
                                },
                                {
                                    "Type": 25,
                                    "Value": 100
                                },
                                {
                                    "Type": 26,
                                    "Value": 100
                                },
                                {
                                    "Type": 27,
                                    "Value": 100
                                },
                                {
                                    "Type": 28,
                                    "Value": 100
                                }
                            ]
                        }
                    },
                    Team: {
                        Id: 40,
                        Status: 0,
                        Profile: {
                            General: {
                                Name: "Athletic Aces",
                                City: "sqss",
                                Description: null,
                                Logo: null,
                                Tags: [
                                    "Athletic",
                                    "Collective",
                                    "Gladiators"
                                ],
                                Availability: []
                            },
                            Financial: {
                                FreePlay: false,
                                HasManiches: false
                            },
                            Inventary: {
                                Shirts: [
                                    0
                                ]
                            }
                        },
                        Players: []
                    }
                },
                {
                    Id: 11,
                    Status: 1,
                    Player: {
                        "Id": 5,
                        "Profile": {
                            "General": {
                                "FirstName": "Cynthia",
                                "LastName": "Bell",
                                "Photo": null,
                                "Birthday": null,
                                "City": "Northtown",
                                "FreePlay": false,
                                "Tags": [
                                    "Superman",
                                    "Mountain",
                                    "AngryMan",
                                    "Virtuoso",
                                    "handsome man",
                                    "dribbler",
                                    "complainer",
                                    "big",
                                    "brother"
                                ],
                                "Availability": {
                                    "Days": [
                                        5
                                    ],
                                    "From": "00:00:00",
                                    "To": "23:59:00"
                                }
                            },
                            "Football": {
                                "Height": 200,
                                "Weight": 80,
                                "Position": 3,
                                "WorkingFoot": 0,
                                "GameStyle": 3,
                                "Skill": 4,
                                "PhysicalCondition": 4
                            }
                        },
                        "Stats": {
                            "Values": [
                                {
                                    "Type": 0,
                                    "Value": 100
                                },
                                {
                                    "Type": 1,
                                    "Value": 100
                                },
                                {
                                    "Type": 2,
                                    "Value": 100
                                },
                                {
                                    "Type": 3,
                                    "Value": 100
                                },
                                {
                                    "Type": 4,
                                    "Value": 100
                                },
                                {
                                    "Type": 5,
                                    "Value": 100
                                },
                                {
                                    "Type": 6,
                                    "Value": 100
                                },
                                {
                                    "Type": 7,
                                    "Value": 100
                                },
                                {
                                    "Type": 8,
                                    "Value": 100
                                },
                                {
                                    "Type": 9,
                                    "Value": 100
                                },
                                {
                                    "Type": 10,
                                    "Value": 100
                                },
                                {
                                    "Type": 11,
                                    "Value": 100
                                },
                                {
                                    "Type": 12,
                                    "Value": 100
                                },
                                {
                                    "Type": 13,
                                    "Value": 100
                                },
                                {
                                    "Type": 14,
                                    "Value": 100
                                },
                                {
                                    "Type": 15,
                                    "Value": 100
                                },
                                {
                                    "Type": 16,
                                    "Value": 100
                                },
                                {
                                    "Type": 17,
                                    "Value": 100
                                },
                                {
                                    "Type": 18,
                                    "Value": 100
                                },
                                {
                                    "Type": 19,
                                    "Value": 100
                                },
                                {
                                    "Type": 20,
                                    "Value": 100
                                },
                                {
                                    "Type": 21,
                                    "Value": 100
                                },
                                {
                                    "Type": 22,
                                    "Value": 100
                                },
                                {
                                    "Type": 23,
                                    "Value": 100
                                },
                                {
                                    "Type": 24,
                                    "Value": 100
                                },
                                {
                                    "Type": 25,
                                    "Value": 100
                                },
                                {
                                    "Type": 26,
                                    "Value": 100
                                },
                                {
                                    "Type": 27,
                                    "Value": 100
                                },
                                {
                                    "Type": 28,
                                    "Value": 100
                                }
                            ]
                        }
                    },
                    Team: {
                        Id: 40,
                        Status: 0,
                        Profile: {
                            General: {
                                Name: "Athletic Aces",
                                City: "sqss",
                                Description: null,
                                Logo: null,
                                Tags: [
                                    "Athletic",
                                    "Collective",
                                    "Gladiators"
                                ],
                                Availability: []
                            },
                            Financial: {
                                FreePlay: false,
                                HasManiches: false
                            },
                            Inventary: {
                                Shirts: [
                                    0
                                ]
                            }
                        },
                        Players: []
                    }
                }
            ],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        };

        return of(
            new HttpResponse<IGameTeamPlayerFindResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}