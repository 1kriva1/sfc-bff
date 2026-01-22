import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { buildTitle, getDataFromRoute } from "@core/utils";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faChartPie, faChessBoard, faFutbol, faInfo, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { BaseViewComponent, ITeamInfoModel } from "@share/components";
import { ITeamModel } from "@share/models";
import { buildEditTeamAction, buildRequestTeamPlayerAction, getTeamRaiting } from "@share/utils";
import { IDropdownMenuItemModel, ITabModel } from "ngx-sfc-components";
import { TeamViewPageRoute } from "./team-view-page-route.enum";
import { TeamViewPageConstants } from "./team-view-page.constants";
import { TeamViewPageLocalization } from "./team-view-page.localization";

@Component({
    templateUrl: './team-view-page.component.html',
    styleUrls: ['./team-view-page.component.scss']
})
export class TeamViewPageComponent
    extends BaseViewComponent<ITeamModel, ITeamInfoModel>
    implements OnInit {

    // component
    Constants = TeamViewPageConstants;

    /* View page */

    public tabs: ITabModel[] = [
        {
            label: TeamViewPageLocalization.TABS.OVERVIEW.LABEL,
            icon: faInfo,
            selected: true,
            data: TeamViewPageRoute.Overview
        },
        {
            label: TeamViewPageLocalization.TABS.PLAYERS.LABEL,
            icon: faPeopleGroup,
            data: TeamViewPageRoute.Players
        },
        {
            label: TeamViewPageLocalization.TABS.SCHEMES.LABEL,
            icon: faChessBoard,
            data: TeamViewPageRoute.Schemes
        },
        {
            label: TeamViewPageLocalization.TABS.GAMES.LABEL,
            icon: faFutbol,
            data: TeamViewPageRoute.Games
        },
        {
            label: TeamViewPageLocalization.TABS.STATS.LABEL,
            icon: faStar,
            data: TeamViewPageRoute.Stats
        },
        {
            label: TeamViewPageLocalization.TABS.STATISTIC.LABEL,
            icon: faChartPie,
            data: TeamViewPageRoute.Statistic
        }
    ];

    /* End View page */

    /* Abstract */

    protected get model(): ITeamModel { return getDataFromRoute<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!; };

    /* End Abstract */

    constructor(
        route: ActivatedRoute,
        router: Router,
        titleService: Title
    ) {
        super(route, router, titleService);
    }

    protected buildPageTitle(): string {
        return buildTitle(this.model.profile.general.name);
    }

    protected buildInfoModel(): ITeamInfoModel {
        return {
            name: this.model.profile.general.name,
            city: this.model.profile.general.city,
            logo: this.model.profile.general.logo,
            tags: this.model.profile.general.tags,
            status: this.model.status,
            raiting: getTeamRaiting(this.model),
            actions: this.buildActions()
        };
    }

    private buildActions(): IDropdownMenuItemModel[] {
        return [
            buildRequestTeamPlayerAction(this.model, this.router),
            buildEditTeamAction(this.model.id, this.router)
        ]
    }
}