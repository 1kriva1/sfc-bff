import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable, of } from "rxjs";
import { SchemeServiceConstants } from "../../scheme.constants";
import { ISchemeGameTeamCreateResponse } from "./models/create/scheme-game-team-create.response";
import { SchemeTeamServiceConstants } from "../../team/scheme-team-service.constants";
import { ISchemeGameTeamCreateRequest } from "./models/create/scheme-game-team-create.request";
import { SchemeGameServiceConstants } from "../scheme-game-service.constants";
import { ISchemeGameTeamUpdateRequest } from "./models/update/scheme-game-team-update.request";
import { ISchemeGameTeamUpdateResponse } from "./models/update/scheme-game-team-update.response";
import { ISchemeGameTeamRemoveResponse } from "./models/remove/scheme-game-team-remove.response";
import { ISchemeGameTeamGetResponse } from "./models/get/scheme-game-team-get.response";
import { ISchemeGameTeamFindRequest } from "./models/find/scheme-game-team-find.request";
import { ISchemeGameTeamFindResponse } from "./models/find/scheme-game-team-find.response";

@Injectable({
    providedIn: 'root'
})
export class SchemeGameTeamService {

    constructor(private http: HttpClient) { }

    public create(gameId: number, teamId: number, request: ISchemeGameTeamCreateRequest): Observable<ISchemeGameTeamCreateResponse> {
        // return this.http.post<ISchemeGameTeamCreateResponse>(
        //     `${SchemeServiceConstants.URI_PART}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            "Scheme": {
                "Id": 77,
                "Team": {
                    "Id": 77,
                    "Status": 0,
                    "Profile": {
                        "General": {
                            "Name": "asdasd",
                            "City": "asd",
                            "Location": null,
                            "Description": "",
                            "Logo": null,
                            "Tags": [],
                            "Availability": []
                        },
                        "Financial": {
                            FreePlay: false,
                            HasManiches: false
                        },
                        "Inventary": {
                            Shirts: []
                        }
                    },
                    "Players": [
                        {
                            "Id": 49,
                            "Status": 0,
                            "Player": {
                                "Id": 77,
                                "Profile": {
                                    "General": {
                                        "FirstName": "ajksbdn",
                                        "LastName": "asd",
                                        "Photo": null,
                                        "Birthday": null,
                                        "City": "qweasd",
                                        "FreePlay": false,
                                        "Tags": [],
                                        "Availability": {
                                            "Days": [],
                                            "From": null,
                                            "To": null
                                        }
                                    },
                                    "Football": {
                                        "Height": null,
                                        "Weight": null,
                                        "Position": null,
                                        "WorkingFoot": null,
                                        "GameStyle": null,
                                        "Skill": null,
                                        "PhysicalCondition": null
                                    }
                                },
                                "Stats": {
                                    "Values": [
                                        {
                                            "Type": 0,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 1,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 2,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 3,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 4,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 5,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 6,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 7,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 8,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 9,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 10,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 11,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 12,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 13,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 14,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 15,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 16,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 17,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 18,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 19,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 20,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 21,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 22,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 23,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 24,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 25,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 26,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 27,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 28,
                                            "Value": 50
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                Game: {
                    Id: 100,
                    Status: 1,
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
                "Profile": {
                    "General": {
                        "Name": "asd",
                        "Comment": "asd"
                    }
                },
                "Formation": {
                    "TypeId": 0,
                    "FormationId": 1,
                    "Players": [
                        {
                            "Player": {
                                "Id": 77,
                                "Profile": {
                                    "General": {
                                        "FirstName": "ajksbdn",
                                        "LastName": "asd",
                                        "Photo": null,
                                        "Birthday": null,
                                        "City": "qweasd",
                                        "FreePlay": false,
                                        "Tags": [],
                                        "Availability": {
                                            "Days": [],
                                            "From": null,
                                            "To": null
                                        }
                                    },
                                    "Football": {
                                        "Height": null,
                                        "Weight": null,
                                        "Position": null,
                                        "WorkingFoot": null,
                                        "GameStyle": null,
                                        "Skill": null,
                                        "PhysicalCondition": null
                                    }
                                },
                                "Stats": {
                                    "Values": [
                                        {
                                            "Type": 0,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 1,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 2,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 3,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 4,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 5,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 6,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 7,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 8,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 9,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 10,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 11,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 12,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 13,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 14,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 15,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 16,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 17,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 18,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 19,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 20,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 21,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 22,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 23,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 24,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 25,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 26,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 27,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 28,
                                            "Value": 50
                                        }
                                    ]
                                }
                            },
                            "Position": {
                                "Index": 2,
                                "X": null,
                                "Y": null,
                                "FormationPositionId": 8
                            }
                        }
                    ]
                }
            },
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ISchemeGameTeamCreateResponse);
    }

    public update(schemeId: number, gameId: number, teamId: number, request: ISchemeGameTeamUpdateRequest): Observable<ISchemeGameTeamUpdateResponse> {
        // return this.http.put<ISchemeGameTeamUpdateResponse>(
        //     `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Success: true,
            Message: 'All ok!'
        } as ISchemeGameTeamUpdateResponse);
    }

    public remove(schemeId: number, gameId: number, teamId: number): Observable<ISchemeGameTeamRemoveResponse> {
        // return this.http.delete<ISchemeGameTeamRemoveResponse>(
        //     `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Success: false,
            Message: 'All ok!'
        } as ISchemeGameTeamRemoveResponse);
    }

    public get(schemeId: number, gameId: number, teamId: number): Observable<ISchemeGameTeamGetResponse> {
        // return this.http.get<ISchemeGameTeamGetResponse>(
        //     `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            "Scheme": {
                "Id": 77,
                "Team": {
                    "Id": 77,
                    "Status": 0,
                    "Profile": {
                        "General": {
                            "Name": "asdasd",
                            "City": "asd",
                            "Location": null,
                            "Description": "",
                            "Logo": null,
                            "Tags": [],
                            "Availability": []
                        },
                        "Financial": {
                            FreePlay: false,
                            HasManiches: false
                        },
                        "Inventary": {
                            Shirts: []
                        }
                    },
                    "Players": [
                        {
                            "Id": 49,
                            "Status": 0,
                            "Player": {
                                "Id": 77,
                                "Profile": {
                                    "General": {
                                        "FirstName": "ajksbdn",
                                        "LastName": "asd",
                                        "Photo": null,
                                        "Birthday": null,
                                        "City": "qweasd",
                                        "FreePlay": false,
                                        "Tags": [],
                                        "Availability": {
                                            "Days": [],
                                            "From": null,
                                            "To": null
                                        }
                                    },
                                    "Football": {
                                        "Height": null,
                                        "Weight": null,
                                        "Position": null,
                                        "WorkingFoot": null,
                                        "GameStyle": null,
                                        "Skill": null,
                                        "PhysicalCondition": null
                                    }
                                },
                                "Stats": {
                                    "Values": [
                                        {
                                            "Type": 0,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 1,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 2,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 3,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 4,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 5,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 6,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 7,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 8,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 9,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 10,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 11,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 12,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 13,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 14,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 15,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 16,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 17,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 18,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 19,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 20,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 21,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 22,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 23,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 24,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 25,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 26,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 27,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 28,
                                            "Value": 50
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                Game: {
                    Id: 100,
                    Status: 1,
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
                "Profile": {
                    "General": {
                        "Name": "asd",
                        "Comment": "asd"
                    }
                },
                "Formation": {
                    "TypeId": 0,
                    "FormationId": 1,
                    "Players": [
                        {
                            "Player": {
                                "Id": 77,
                                "Profile": {
                                    "General": {
                                        "FirstName": "ajksbdn",
                                        "LastName": "asd",
                                        "Photo": null,
                                        "Birthday": null,
                                        "City": "qweasd",
                                        "FreePlay": false,
                                        "Tags": [],
                                        "Availability": {
                                            "Days": [],
                                            "From": null,
                                            "To": null
                                        }
                                    },
                                    "Football": {
                                        "Height": null,
                                        "Weight": null,
                                        "Position": null,
                                        "WorkingFoot": null,
                                        "GameStyle": null,
                                        "Skill": null,
                                        "PhysicalCondition": null
                                    }
                                },
                                "Stats": {
                                    "Values": [
                                        {
                                            "Type": 0,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 1,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 2,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 3,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 4,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 5,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 6,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 7,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 8,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 9,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 10,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 11,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 12,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 13,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 14,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 15,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 16,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 17,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 18,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 19,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 20,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 21,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 22,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 23,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 24,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 25,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 26,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 27,
                                            "Value": 50
                                        },
                                        {
                                            "Type": 28,
                                            "Value": 50
                                        }
                                    ]
                                }
                            },
                            "Position": {
                                "Index": 2,
                                "X": null,
                                "Y": null,
                                "FormationPositionId": 8
                            }
                        }
                    ]
                }
            },
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ISchemeGameTeamGetResponse);
    }

    public find(gameId: number, teamId: number, request: ISchemeGameTeamFindRequest): Observable<HttpResponse<ISchemeGameTeamFindResponse>> {
        // return this.http.get<ISchemeGameTeamFindResponse>(
        //     `${SchemeServiceConstants.URI_PART}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, { show: false }),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // );

        const body: ISchemeGameTeamFindResponse = {
            Items: [
                {
                    "Id": 77,
                    "Team": {
                        "Id": 77,
                        "Status": 0,
                        "Profile": {
                            "General": {
                                "Name": "asd",
                                "City": "aasd",
                                "Description": "",
                                "Logo": null,
                                "Tags": [],
                                "Availability": []
                            },
                            "Financial": {
                                FreePlay: false,
                                HasManiches: false
                            },
                            "Inventary": {
                                "Shirts": []
                            }
                        },
                        "Players": [
                            {
                                "Id": 49,
                                "Status": 0,
                                "Player": {
                                    "Id": 77,
                                    "Profile": {
                                        "General": {
                                            "FirstName": "asqw",
                                            "LastName": "qwe",
                                            "Photo": null,
                                            "Birthday": null,
                                            "City": "asd",
                                            "FreePlay": false,
                                            "Tags": [],
                                            "Availability": {
                                                "Days": [],
                                                "From": null,
                                                "To": null
                                            }
                                        },
                                        "Football": {
                                            "Height": null,
                                            "Weight": null,
                                            "Position": null,
                                            "WorkingFoot": null,
                                            "GameStyle": null,
                                            "Skill": null,
                                            "PhysicalCondition": null
                                        }
                                    },
                                    "Stats": {
                                        "Values": [
                                            {
                                                "Type": 0,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 1,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 2,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 3,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 4,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 5,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 6,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 7,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 8,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 9,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 10,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 11,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 12,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 13,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 14,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 15,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 16,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 17,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 18,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 19,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 20,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 21,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 22,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 23,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 24,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 25,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 26,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 27,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 28,
                                                "Value": 50
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    Game: {
                        Id: 100,
                        Status: 1,
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
                    "Profile": {
                        "General": {
                            "Name": "asd",
                            "Comment": "qweqwe"
                        }
                    },
                    "Formation": {
                        "TypeId": 0,
                        "FormationId": 2,
                        "Players": [
                            {
                                "Player": {
                                    "Id": 77,
                                    "Profile": {
                                        "General": {
                                            "FirstName": "asqw",
                                            "LastName": "qwe",
                                            "Photo": null,
                                            "Birthday": null,
                                            "City": "asd",
                                            "FreePlay": false,
                                            "Tags": [],
                                            "Availability": {
                                                "Days": [],
                                                "From": null,
                                                "To": null
                                            }
                                        },
                                        "Football": {
                                            "Height": null,
                                            "Weight": null,
                                            "Position": null,
                                            "WorkingFoot": null,
                                            "GameStyle": null,
                                            "Skill": null,
                                            "PhysicalCondition": null
                                        }
                                    },
                                    "Stats": {
                                        "Values": [
                                            {
                                                "Type": 0,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 1,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 2,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 3,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 4,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 5,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 6,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 7,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 8,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 9,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 10,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 11,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 12,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 13,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 14,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 15,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 16,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 17,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 18,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 19,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 20,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 21,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 22,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 23,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 24,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 25,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 26,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 27,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 28,
                                                "Value": 50
                                            }
                                        ]
                                    }
                                },
                                "Position": {
                                    "Index": 1,
                                    "X": null,
                                    "Y": null,
                                    "FormationPositionId": 3
                                }
                            }
                        ]
                    }
                },
                {
                    "Id": 77,
                    "Team": {
                        "Id": 77,
                        "Status": 0,
                        "Profile": {
                            "General": {
                                "Name": "asd",
                                "City": "aasd",
                                "Description": "",
                                "Logo": null,
                                "Tags": [],
                                "Availability": []
                            },
                            "Financial": {
                                FreePlay: false,
                                HasManiches: false
                            },
                            "Inventary": {
                                "Shirts": []
                            }
                        },
                        "Players": [
                            {
                                "Id": 49,
                                "Status": 0,
                                "Player": {
                                    "Id": 77,
                                    "Profile": {
                                        "General": {
                                            "FirstName": "asqw",
                                            "LastName": "qwe",
                                            "Photo": null,
                                            "Birthday": null,
                                            "City": "asd",
                                            "FreePlay": false,
                                            "Tags": [],
                                            "Availability": {
                                                "Days": [],
                                                "From": null,
                                                "To": null
                                            }
                                        },
                                        "Football": {
                                            "Height": null,
                                            "Weight": null,
                                            "Position": null,
                                            "WorkingFoot": null,
                                            "GameStyle": null,
                                            "Skill": null,
                                            "PhysicalCondition": null
                                        }
                                    },
                                    "Stats": {
                                        "Values": [
                                            {
                                                "Type": 0,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 1,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 2,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 3,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 4,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 5,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 6,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 7,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 8,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 9,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 10,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 11,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 12,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 13,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 14,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 15,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 16,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 17,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 18,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 19,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 20,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 21,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 22,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 23,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 24,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 25,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 26,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 27,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 28,
                                                "Value": 50
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    Game: {
                        Id: 100,
                        Status: 1,
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
                    "Profile": {
                        "General": {
                            "Name": "asd",
                            "Comment": "qweqwe"
                        }
                    },
                    "Formation": {
                        "TypeId": 0,
                        "FormationId": 2,
                        "Players": [
                            {
                                "Player": {
                                    "Id": 77,
                                    "Profile": {
                                        "General": {
                                            "FirstName": "asqw",
                                            "LastName": "qwe",
                                            "Photo": null,
                                            "Birthday": null,
                                            "City": "asd",
                                            "FreePlay": false,
                                            "Tags": [],
                                            "Availability": {
                                                "Days": [],
                                                "From": null,
                                                "To": null
                                            }
                                        },
                                        "Football": {
                                            "Height": null,
                                            "Weight": null,
                                            "Position": null,
                                            "WorkingFoot": null,
                                            "GameStyle": null,
                                            "Skill": null,
                                            "PhysicalCondition": null
                                        }
                                    },
                                    "Stats": {
                                        "Values": [
                                            {
                                                "Type": 0,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 1,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 2,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 3,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 4,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 5,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 6,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 7,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 8,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 9,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 10,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 11,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 12,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 13,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 14,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 15,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 16,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 17,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 18,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 19,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 20,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 21,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 22,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 23,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 24,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 25,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 26,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 27,
                                                "Value": 50
                                            },
                                            {
                                                "Type": 28,
                                                "Value": 50
                                            }
                                        ]
                                    }
                                },
                                "Position": {
                                    "Index": 1,
                                    "X": null,
                                    "Y": null,
                                    "FormationPositionId": 3
                                }
                            }
                        ]
                    }
                }
            ],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        };

        return of(
            new HttpResponse<ISchemeGameTeamFindResponse>({
                body,
                headers: new HttpHeaders({ 'x-pagination': '{"CurrentPage":1,"TotalPages":1,"PageSize":12,"TotalCount":2,"HasPreviousPage":false,"HasNextPage":false}' }),
                status: 200,
                statusText: 'OK'
            })
        );
    }
}