import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getDataFromParentRoute } from "@core/utils";
import { faBrain, faStar, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { ITeamModel } from "@share/models";
import { EnumService } from "@share/services";
import { StatsValue } from "@share/types";
import { ComponentSize } from "ngx-sfc-common";
import { TeamViewPageConstants } from "../../team-view-page.constants";
import { TeamViewStatsLocalization } from "./team-view-stats.localization";

@Component({
    templateUrl: './team-view-stats.component.html',
    styleUrls: ['./team-view-stats.component.scss']
})
export class TeamViewStatsComponent implements OnInit {

    // icons
    faChartSimple = faChartSimple;
    faStar = faStar;
    faBrain = faBrain;

    // ngx-sfc-common
    ComponentSize = ComponentSize;

    // component
    Localization = TeamViewStatsLocalization;

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromParentRoute<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public stats: StatsValue[] = [];

    /* End Fields */

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.stats = this.model.players.map(teamPlayer => teamPlayer.player.stats);
    }
}