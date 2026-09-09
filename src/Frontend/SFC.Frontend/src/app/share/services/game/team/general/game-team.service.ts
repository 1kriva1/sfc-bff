import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buildHttpParams } from "ngx-sfc-common";
import { IFindGameTeamsRequest } from "./models/find/find-game-teams.request";
import { IFindGameTeamsResponse } from "./models/find/find-game-teams.response";
import { Observable, of } from "rxjs";
import { GameServiceConstants } from "../../game-service.constants";
import { GameTeamServiceConstants } from "../game-team-service.constants";
import { INCLUDE, LOADER } from "@core/interceptors";
import { IGetGameTeamsResponse } from "./models/gets/get-game-teams.response";
import { IUpdateGameTeamsResponse } from "./models/updates/update-game-teams.response";
import { IUpdateGameTeamsRequest } from "./models/updates/update-game-teams.request";
import { ICreateGameTeamRequest } from "./models/create/create-game-team.request";
import { ICreateGameTeamResponse } from "./models/create/create-game-team.response";
import { IUpdateGameTeamResponse } from "./models/update/update-game-team.response";
import { IUpdateGameTeamRequest } from "./models/update/update-game-team.request";
import { IGetGameTeamResponse } from "./models/get/get-game-team.response";
import { GameTeamInclude } from "@share/enums/features/game/game-include.enum";

@Injectable({
    providedIn: 'root'
})
export class GameTeamService {

    constructor(private http: HttpClient) { }

    public create(gameId: number, request: ICreateGameTeamRequest): Observable<ICreateGameTeamResponse> {
        // return this.http.post<ICreateGameTeamResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Team: {
                Id: 10,
                Status: 0,
                Index: 1,
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
        } as ICreateGameTeamResponse);
    }

    public get(gameId: number, teamId: number, include: GameTeamInclude[] = []): Observable<IGetGameTeamResponse> {
        // return this.http.get<IGetGameTeamResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}`,
        //     { 
        //         context: new HttpContext().set(LOADER, { show: true }).set(INCLUDE, include)
        //     }
        // );

        return of({
            GameTeam: {
                Id: 10,
                Status: 0,
                Index: 1,
                Team: {
                    Id: 6,
                    Status: 0,
                    Players: [
                        {
                            Id: 1,
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
                            }
                        }
                    ],
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
                    }
                }
            },
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IGetGameTeamResponse);
    }

    public gets(gameId: number, include: GameTeamInclude[] = []): Observable<IGetGameTeamsResponse> {
        // return this.http.get<IGetGameTeamsResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}`,
        //     context: new HttpContext().set(LOADER, { show: true }).set(INCLUDE, include)
        // );

        return of({
            GameTeams: [
                {
                    Id: 10,
                    Status: 0,
                    Index: 1,
                    Team: {
                        Id: 40,
                        Status: 0,
                        Players: [],
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
                        }
                    }
                }
            ],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IGetGameTeamsResponse);
    }

    public update(gameId: number, teamId: number, request: IUpdateGameTeamRequest): Observable<IUpdateGameTeamResponse> {
        // return this.http.put<IUpdateGameTeamResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // )

        return of({
            Success: true,
            Message: 'All ok!'
        } as IUpdateGameTeamResponse);
    }

    public updates(gameId: number, request: IUpdateGameTeamsRequest): Observable<IUpdateGameTeamsResponse> {
        // return this.http.put<IUpdateGameTeamsResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // )

        return of({
            Success: true,
            Message: 'All ok!'
        } as IUpdateGameTeamsResponse);
    }

    public find(gameId: number, request: IFindGameTeamsRequest, include: GameTeamInclude[] = [], loader: boolean = true): Observable<HttpResponse<IFindGameTeamsResponse>> {
        // return this.http.get<IFindGameTeamsResponse>(
        //     `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: loader }).set(INCLUDE, include),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );


        const body: IFindGameTeamsResponse = {
            Items: [
                {
                    Id: 10,
                    Status: 0,
                    Index: 1,
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
                }],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        };

        return of(
            new HttpResponse<IFindGameTeamsResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}