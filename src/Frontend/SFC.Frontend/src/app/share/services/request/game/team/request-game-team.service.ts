import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable, of } from "rxjs";
import { IRequestGameTeamFindRequest } from "./models/find/request-game-team-find.request";
import { IRequestGameTeamFindResponse } from "./models/find/request-game-team-find.response";
import { RequestServiceConstants } from "../../request-service.constants";
import { RequestGameServiceConstants } from "../request-game-service.constants";
import { RequestGameTeamServiceConstants } from "./request-game-team-service.constants";
import { buildHttpParams } from "ngx-sfc-common";
import { IRequestGameTeamAcceptResponse } from "./models/accept/request-game-team-accept.response";
import { IRequestGameTeamDeclineRequest } from "./models/decline/request-game-team-decline.request";
import { IRequestGameTeamDeclineResponse } from "./models/decline/request-game-team-decline.response";

@Injectable({
    providedIn: 'root'
})
export class RequestGameTeamService {

    constructor(private http: HttpClient) { }

    public accept(requestId: number, gameId: number, playerId: number): Observable<IRequestGameTeamAcceptResponse> {
        // return this.http.put<IRequestGameTeamAcceptResponse>(
        //     `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGameTeamServiceConstants.URI_PART}/${playerId}/accept`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IRequestGameTeamAcceptResponse);
    }

    public decline(requestId: number, gameId: number, playerId: number, request: IRequestGameTeamDeclineRequest): Observable<IRequestGameTeamDeclineResponse> {
        // return this.http.put<IRequestGameTeamDeclineResponse>(
        //     `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGameTeamServiceConstants.URI_PART}/${playerId}/decline`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IRequestGameTeamDeclineResponse);
    }

    public find(gameId: number, request: IRequestGameTeamFindRequest): Observable<HttpResponse<IRequestGameTeamFindResponse>> {
        // return this.http.get<IRequestGameTeamFindResponse>(
        //     `${RequestServiceConstants.URI_PART}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGameTeamServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );

        const body: IRequestGameTeamFindResponse = {
            Items: [
                {
                    Id: 10,
                    Status: 0,
                    GameComment: 'game comment',
                    TeamComment: 'team commenty',
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
                    },
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
                },
                {
                    Id: 11,
                    Status: 1,
                    GameComment: 'game comment 1',
                    TeamComment: 'team commenty 1',
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
                    },
                    Team: {
                        Id: 41,
                        Status: 0,
                        Players: [],
                        Profile: {
                            General: {
                                Name: "Athletic Aces 1",
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
        };

        return of(
            new HttpResponse<IRequestGameTeamFindResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}