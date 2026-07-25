import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable, of } from "rxjs";
import { buildHttpParams } from "ngx-sfc-common";
import { IRequestGamePlayerFindRequest } from "./models/find/request-game-player-find.request";
import { IRequestGamePlayerFindResponse } from "./models/find/request-game-player-find.response";
import { RequestServiceConstants } from "../../request-service.constants";
import { RequestGameServiceConstants } from "../request-game-service.constants";
import { RequestGamePlayerServiceConstants } from "./request-game-player-service.constants";
import { IRequestGamePlayerAcceptResponse } from "./models/accept/request-game-player-accept.response";
import { IRequestGamePlayerDeclineRequest } from "./models/decline/request-game-player-decline.request";
import { IRequestGamePlayerDeclineResponse } from "./models/decline/request-game-player-decline.response";

@Injectable({
    providedIn: 'root'
})
export class RequestGamePlayerService {

    constructor(private http: HttpClient) { }

    public accept(requestId: number, gameId: number, playerId: number): Observable<IRequestGamePlayerAcceptResponse> {
        // return this.http.put<IRequestGamePlayerAcceptResponse>(
        //     `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGamePlayerServiceConstants.URI_PART}/${playerId}/accept`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IRequestGamePlayerAcceptResponse);
    }

    public decline(requestId: number, gameId: number, playerId: number, request: IRequestGamePlayerDeclineRequest): Observable<IRequestGamePlayerDeclineResponse> {
        // return this.http.put<IRequestGamePlayerDeclineResponse>(
        //     `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGamePlayerServiceConstants.URI_PART}/${playerId}/decline`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IRequestGamePlayerDeclineResponse);
    }

    public find(gameId: number, request: IRequestGamePlayerFindRequest): Observable<HttpResponse<IRequestGamePlayerFindResponse>> {
        // return this.http.get<IRequestGamePlayerFindResponse>(
        //     `${RequestServiceConstants.URI_PART}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGamePlayerServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );

        const body: IRequestGamePlayerFindResponse = {
            Items: [
                {
                    Id: 10,
                    Status: 0,
                    GameComment: 'game comment',
                    PlayerComment: 'player commenty',
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
                    Game: {
                        Id: 1,
                        Status: 0,
                        Profile: {
                            General: {
                                Name: "Test name",
                                Description: "My super description",
                                Date: new Date(4, 15, 2026),
                                From: '10:45:20',
                                To: '14:45:20',
                                Stadium: 5,
                                Tags: ['tag 1', 'tag 2', 'tag 3']
                            },
                            Inventary: {
                                ShirtsRequired: true,
                                ShirtsCount: 2
                            },
                            Financial: {
                                FreeGame: false,
                                PayAmount: 330
                            }
                        }
                    }
                },
                {
                    Id: 11,
                    Status: 1,
                    GameComment: 'game comment 1',
                    PlayerComment: 'player commenty 1',
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
                    Game: {
                        Id: 1,
                        Status: 0,
                        Profile: {
                            General: {
                                Name: "Test name",
                                Description: "My super description",
                                Date: new Date(4, 15, 2026),
                                From: '10:45:20',
                                To: '14:45:20',
                                Stadium: 5,
                                Tags: ['tag 1', 'tag 2', 'tag 3']
                            },
                            Inventary: {
                                ShirtsRequired: true,
                                ShirtsCount: 2
                            },
                            Financial: {
                                FreeGame: false,
                                PayAmount: 330
                            }
                        }
                    }
                }
            ],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        };

        return of(
            new HttpResponse<IRequestGamePlayerFindResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}