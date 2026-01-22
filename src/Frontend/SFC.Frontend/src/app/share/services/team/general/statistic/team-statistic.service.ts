import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { ApiConstants } from "@share/constants";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable, of } from "rxjs";
import { TeamServiceConstants } from "../../team-service.constants";
import { IGetTeamStatisticRequest } from "./models/get/get-team-statistic.request";
import { IGetTeamStatisticResponse } from "./models/get/get-team-statistic.response";

@Injectable({
  providedIn: 'root'
})
export class TeamStatisticService {

  constructor(private http: HttpClient) { }

  public get(teamId: number, request?: IGetTeamStatisticRequest): Observable<IGetTeamStatisticResponse> {
    return of({
      Team: { Id: 10 },
      Statistic: [{
        Date: new Date(),
        Value: {
          Games: 10,
          Wins: 7,
          Loses: 2,
          Draws: 1,
          Goals: 23,
          Conceded: 19,
          Assists: 23,
          Penalties: 1,
          CleanSheets: 0,
          RedCards: 1,
          YellowCards: 2
        }
      }],
      Success: true,
      Message: '',
      Errors: null
    });

    // return this.http.get<IGetTeamStatisticResponse>(
    //   `${TeamServiceConstants.URI_PART}/${teamId}/${ApiConstants.STATISTIC_URI_PART}`,
    //   {
    //     context: new HttpContext().set(LOADER, { show: false }),
    //     params: buildHttpParams(request)
    //   }
    // );
  }
}