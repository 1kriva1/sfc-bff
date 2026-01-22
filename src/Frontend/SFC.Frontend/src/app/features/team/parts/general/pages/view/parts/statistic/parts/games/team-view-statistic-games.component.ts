import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getDataFromRouteRecursively } from "@core/utils";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    ITeamModel
} from "@share/models";
import 'chartjs-adapter-date-fns';
import { TeamViewStatisticGamesLocalization } from "./team-view-statistic-games.localization";
import { TeamViewPageConstants } from "../../../../team-view-page.constants";
import { Observable, of } from "rxjs";
import { ITeamViewStatisticGamesModel } from "./team-view-statistic-games.model";

@Component({
    templateUrl: './team-view-statistic-games.component.html',
    styleUrls: ['./team-view-statistic-games.component.scss']
})
export class TeamViewStatisticGamesComponent {

    // component
    Localization = TeamViewStatisticGamesLocalization;

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromRouteRecursively<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public viewModel$: Observable<ITeamViewStatisticGamesModel> = of({});

    /* End Fields */

    constructor(
        public themeService: ThemeService,
        private route: ActivatedRoute
    ) { }
}