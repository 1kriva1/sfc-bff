import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { ApiConstants } from "@share/constants";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable, of } from "rxjs";
import { TeamServiceConstants } from "../../team-service.constants";
import { TeamGameServiceConstants } from "../team-game-service.constants";
import { IGetTeamGameStatisticRequest } from "./models/get/get-game-player-statistic.request";
import { IGetTeamGameStatisticResponse } from "./models/get/get-game-player-statistic.response";

@Injectable({
  providedIn: 'root'
})
export class TeamGameStatisticService {

  constructor(private http: HttpClient) { }

  public get(teamId: number, request?: IGetTeamGameStatisticRequest): Observable<IGetTeamGameStatisticResponse> {
    return of({
      Team: { Id: 10 },
      Statistic: [
        {
          Date: new Date(2025, 0, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 1, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 2, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 3, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
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
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 5, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 6, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 7, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 8, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 3 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        },
        {
          Date: new Date(2025, 9, 1),
          Value: {
            Statuses: [
              { Key: 0, Total: 4 },
              { Key: 1, Total: 0 },
              { Key: 2, Total: 0 },
              { Key: 3, Total: 0 }
            ]
          }
        }
      ],
      Success: true,
      Message: '',
      Errors: null
    });

    // return this.http.get<IGetTeamGameStatisticResponse>(
    //   `${TeamServiceConstants.URI_PART}/${teamId}/${TeamGameServiceConstants.URI_PART}/${ApiConstants.STATISTIC_URI_PART}`,
    //   {
    //     context: new HttpContext().set(LOADER, { show: false }),
    //     params: buildHttpParams(request)
    //   }
    // );
  }
}