import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpConstants } from "@core/constants";
import { LOADER } from "@core/interceptors";
import { ApiConstants } from "@share/constants";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable, of } from "rxjs";
import { TeamServiceConstants } from "../../team-service.constants";
import { TeamPlayerServiceConstants } from "../team-player-service.constants";
import { IFindTeamPlayerStatisticRequest } from "./models/find/find-team-player-statistic.request";
import { IFindTeamPlayerStatisticResponse } from "./models/find/find-team-player-statistic.response";
import { IGetTeamPlayerStatisticRequest } from "./models/get/get-team-player-statistic.request";
import { IGetTeamPlayerStatisticResponse } from "./models/get/get-team-player-statistic.response";

@Injectable({
  providedIn: 'root'
})
export class TeamPlayerStatisticService {

  constructor(private http: HttpClient) { }

  public get(teamId: number, request?: IGetTeamPlayerStatisticRequest): Observable<IGetTeamPlayerStatisticResponse> {
    return of({
      Team: { Id: 10 },
      Statistic: [
        {
          Date: new Date(2025, 0, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 1 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 },
              { Key: 4, Total: 0 }
            ],
            Positions: [
              { Key: 0, Total: 0 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 1 }
            ]
          }
        },
        {
          Date: new Date(2025, 1, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 3 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 },
              { Key: 4, Total: 0 }
            ],
            Positions: [
              { Key: 0, Total: 0 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 1 },
              { Key: 3, Total: 1 }
            ]
          }
        },
        {
          Date: new Date(2025, 2, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 3 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 },
              { Key: 4, Total: 0 }
            ],
            Positions: [
              { Key: 0, Total: 1 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 1 },
              { Key: 3, Total: 1 }
            ]
          }
        },
        {
          Date: new Date(2025, 3, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 3 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 },
              { Key: 4, Total: 0 }
            ],
            Positions: [
              { Key: 0, Total: 1 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 2 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 4, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 1 },
              { Key: 3, Total: 0 },
              { Key: 4, Total: 0 }
            ],
            Positions: [
              { Key: 0, Total: 1 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 2 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 4, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 10 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 1 },
              { Key: 3, Total: 0 },
              { Key: 4, Total: 0 }
            ],
            Positions: [
              { Key: 0, Total: 2 },
              { Key: 1, Total: 2 },
              { Key: 2, Total: 3 },
              { Key: 3, Total: 3 }
            ]
          }
        },
        {
          Date: new Date(2025, 5, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 7 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 1 },
              { Key: 3, Total: 2 },
              { Key: 4, Total: 1 }
            ],
            Positions: [
              { Key: 0, Total: 0 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 3 },
              { Key: 3, Total: 3 }
            ]
          }
        },
        {
          Date: new Date(2025, 6, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 6 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 1 },
              { Key: 3, Total: 2 },
              { Key: 4, Total: 1 }
            ],
            Positions: [
              { Key: 0, Total: 1 },
              { Key: 1, Total: 1 },
              { Key: 2, Total: 2 },
              { Key: 3, Total: 3 }
            ]
          }
        }
      ],
      Success: true,
      Message: '',
      Errors: null
    });
    // return this.http.get<IGetTeamPlayerStatisticResponse>(
    //   `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}/${ApiConstants.STATISTIC_URI_PART}`,
    //   {
    //     context: new HttpContext().set(LOADER, { show: false }),
    //     params: buildHttpParams(request)
    //   }
    // );
  }

  public find(teamId: number, request: IFindTeamPlayerStatisticRequest): Observable<HttpResponse<IFindTeamPlayerStatisticResponse>> {
    const headers = new HttpHeaders().set(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
      TotalCount: 10,
      HasNextPage: true
    }));

    return of({
      headers: headers,
      body: {
        Items: [
          {
            Date: new Date(),
            Value: [
              {
                TeamPlayer: {
                  "Id": 31,
                  "Status": 0,
                  "Player": {
                    "Id": 20,
                    "Profile": {
                      "General": {
                        "FirstName": "Andrew",
                        "LastName": "Clark",
                        "Photo": null,
                        "Birthday": "1965-01-16T00:00:00",
                        "City": "akvj",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                          "Value": 100
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
                          "Value": 100
                        }
                      ]
                    }
                  }
                },
                Activity: {
                  Games: 3,
                  Goals: 4,
                  Assists: 3,
                  RedCards: 0,
                  YellowCards: 1
                }
              },
              {
                TeamPlayer: {
                  "Id": 33,
                  "Status": 0,
                  "Player": {
                    "Id": 22,
                    "Profile": {
                      "General": {
                        "FirstName": "Carolyn",
                        "LastName": "Walker",
                        "Photo": null,
                        "Birthday": "1967-01-16T00:00:00",
                        "City": "vqfm",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 3,
                  Goals: 4,
                  Assists: 3,
                  RedCards: 0,
                  YellowCards: 1
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 0,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 3,
                  Goals: 4,
                  Assists: 3,
                  RedCards: 0,
                  YellowCards: 1
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 1,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 1,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 7,
                  Goals: 2,
                  Assists: 31,
                  RedCards: 1,
                  YellowCards: 4
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 2,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 2,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 1,
                  Goals: 6,
                  Assists: 1,
                  RedCards: 0,
                  YellowCards: 2
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 3,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 3,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 31,
                  Goals: 42,
                  Assists: 13,
                  RedCards: 10,
                  YellowCards: 1
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 4,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 23,
                  Goals: 24,
                  Assists: 13,
                  RedCards: 20,
                  YellowCards: 21
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 0,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 3,
                  Goals: 4,
                  Assists: 3,
                  RedCards: 0,
                  YellowCards: 1
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 0,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 3,
                  Goals: 4,
                  Assists: 3,
                  RedCards: 0,
                  YellowCards: 1
                }
              },
              {
                TeamPlayer: {
                  "Id": 35,
                  "Status": 0,
                  "Player": {
                    "Id": 24,
                    "Profile": {
                      "General": {
                        "FirstName": "Jerry",
                        "LastName": "Edwards",
                        "Photo": null,
                        "Birthday": "1990-01-16T00:00:00",
                        "City": "ggjl",
                        "FreePlay": true,
                        "Tags": [
                          "Superman",
                          "Mountain",
                          "AngryMan",
                          "Virtuoso",
                          "handsome man",
                          "dribbler",
                          "complainer",
                          "big",
                          "brother",
                          "Professional"
                        ],
                        "Availability": {
                          "Days": [],
                          "From": null,
                          "To": null
                        }
                      },
                      "Football": {
                        "Height": 0,
                        "Weight": 0,
                        "Position": 0,
                        "WorkingFoot": 0,
                        "GameStyle": 0,
                        "Skill": 0,
                        "PhysicalCondition": 0
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
                },
                Activity: {
                  Games: 3,
                  Goals: 4,
                  Assists: 3,
                  RedCards: 0,
                  YellowCards: 1
                }
              }
            ]
          }          
        ]
      },
      Success: true,
      Message: '',
      Errors: null
    } as any as HttpResponse<IFindTeamPlayerStatisticResponse>);

    // return this.http.get<IFindTeamPlayerStatisticResponse>(
    //   `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}/${ApiConstants.STATISTIC_URI_PART}/find`,
    //   {
    //     context: new HttpContext().set(LOADER, { show: false }),
    //     params: buildHttpParams(request),
    //     observe: 'response'
    //   }
    // );
  }
}