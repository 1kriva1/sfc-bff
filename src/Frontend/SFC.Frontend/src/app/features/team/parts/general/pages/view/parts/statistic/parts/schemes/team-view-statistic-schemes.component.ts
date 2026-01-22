import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getDataFromRouteRecursively } from "@core/utils";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    ITeamModel
} from "@share/models";
import 'chartjs-adapter-date-fns';
import { TeamViewStatisticSchemesLocalization } from "./team-view-statistic-schemes.localization";
import { TeamViewPageConstants } from "../../../../team-view-page.constants";
import { Observable, of } from "rxjs";
import { ITeamViewStatisticSchemesModel } from "./team-view-statistic-schemes.model";

@Component({
    templateUrl: './team-view-statistic-schemes.component.html',
    styleUrls: ['./team-view-statistic-schemes.component.scss']
})
export class TeamViewStatisticSchemesComponent {

    // component
    Localization = TeamViewStatisticSchemesLocalization;

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromRouteRecursively<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public viewModel$: Observable<ITeamViewStatisticSchemesModel> = of({});

    /* End Fields */

    constructor(
        public themeService: ThemeService,
        private route: ActivatedRoute
    ) { }
}