import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable, of } from "rxjs";
import { buildHttpParams } from "ngx-sfc-common";
import { IFindInviteGamePlayerRequest } from "./models/find/find-invite-game-player.request";
import { IFindInviteGamePlayerResponse } from "./models/find/find-invite-game-player.response";
import { InviteServiceConstants } from "../../invite-service.constants";
import { InviteGamePlayerServiceConstants } from "./invite-game-player-service.constants";
import { InviteGameServiceConstants } from "../invite-game-service.constants";
import { IInviteGamePlayerCancelResponse } from "./models/cancel/invite-game-player-cancel.response";

@Injectable({
    providedIn: 'root'
})
export class InviteGamePlayerService {

    constructor(private http: HttpClient) { }

    public cancel(inviteId: number, gameId: number, playerId: number): Observable<IInviteGamePlayerCancelResponse> {
        // return this.http.put<IInviteGamePlayerCancelResponse>(
        //     `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGamePlayerServiceConstants.URI_PART}/${playerId}/cancel`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );
        
        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IInviteGamePlayerCancelResponse);
    }

    public find(gameId: number, request: IFindInviteGamePlayerRequest): Observable<HttpResponse<IFindInviteGamePlayerResponse>> {
        // return this.http.get<IFindInviteGamePlayerResponse>(
        //     `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGamePlayerServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );
        
        const body: IFindInviteGamePlayerResponse = {
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
            new HttpResponse<IFindInviteGamePlayerResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}