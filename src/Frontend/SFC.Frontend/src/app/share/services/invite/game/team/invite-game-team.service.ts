import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable, of } from "rxjs";
import { ICreateGameTeamInvitesResponse } from "./models/create-range/invite-game-team-create-range.response";
import { ICreateGameTeamInvitesRequest } from "./models/create-range/invite-game-team-create-range.request";
import { InviteServiceConstants } from "../../invite-service.constants";
import { InviteGameTeamServiceConstants } from "./invite-game-team-service.constants";
import { InviteGameServiceConstants } from "../invite-game-service.constants";
import { IInviteGameTeamFindRequest } from "./models/find/invite-game-player-find.request";
import { IInviteGameTeamFindResponse } from "./models/find/invite-game-player-find.response";
import { buildHttpParams } from "ngx-sfc-common";
import { IInviteGameTeamCancelResponse } from "./models/cancel/invite-game-team-cancel.response";

@Injectable({
    providedIn: 'root'
})
export class InviteGameTeamService {

    constructor(private http: HttpClient) { }

    public createRange(gameId: number, request: ICreateGameTeamInvitesRequest): Observable<ICreateGameTeamInvitesResponse> {
        // return this.http.post<ICreateGameTeamInvitesResponse>(
        //     `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Invites: [],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ICreateGameTeamInvitesResponse);
    }

    public cancel(inviteId: number, gameId: number, teamId: number): Observable<IInviteGameTeamCancelResponse> {
        // return this.http.put<IInviteGamePlayerCancelResponse>(
        //     `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}/${teamId}/cancel`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as IInviteGameTeamCancelResponse);
    }

    public find(gameId: number, request: IInviteGameTeamFindRequest): Observable<HttpResponse<IInviteGameTeamFindResponse>> {
        // return this.http.get<IInviteGameTeamFindResponse>(
        //     `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );

        const body: IInviteGameTeamFindResponse = {
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
            new HttpResponse<IInviteGameTeamFindResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}