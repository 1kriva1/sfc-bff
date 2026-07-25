import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable, of } from "rxjs";
import { IGamePlayerFindRequest } from "./models/find/game-player-find.request";
import { IGamePlayerFindResponse } from "./models/find/game-player-find.response";
import { LOADER } from "@core/interceptors";
import { GameServiceConstants } from "../../game-service.constants";
import { GamePlayerServiceConstants } from "../game-player-service.constants";

@Injectable({
    providedIn: 'root'
})
export class GamePlayerService {

    constructor(private http: HttpClient) { }

    public find(gameId: number, request: IGamePlayerFindRequest): Observable<HttpResponse<IGamePlayerFindResponse>> {
        // return this.http.get<IGamePlayerFindResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GamePlayerServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );

        const body: IGamePlayerFindResponse = {
            Items: [
                {
                    Id: 10,
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
                    GameTeam: null
                },
                {
                    Id: 11,
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
                    GameTeam: {
                        Id: 15,
                        Status: 1,
                        Index: null,
                        Team: {
                            Id: 50,
                            Status: 0,
                            Profile: {
                                General: {
                                    Name: "Super team",
                                    City: "iubhinkln",
                                    Description: null,
                                    Logo: null,
                                    Tags: [
                                        "asqwe"
                                    ],
                                    Availability: []
                                },
                                Financial: {
                                    FreePlay: false,
                                    HasManiches: false
                                },
                                Inventary: {
                                    Shirts: [
                                        2,
                                        4
                                    ]
                                }
                            },
                            Players: []
                        }
                    }
                }
            ],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        };

        return of(
            new HttpResponse<IGamePlayerFindResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}