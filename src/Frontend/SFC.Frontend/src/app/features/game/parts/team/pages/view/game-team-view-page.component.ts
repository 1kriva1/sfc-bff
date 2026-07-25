import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { buildTitle, getDataFromRoute } from "@core/utils";
import { BaseViewComponent } from "@share/components";
import { IDropdownMenuItemModel, ITabModel } from "ngx-sfc-components";
import { GameTeamViewPageConstants } from "./game-team-view-page.constants";

@Component({
    templateUrl: './game-team-view-page.component.html',
    styleUrls: ['./game-team-view-page.component.scss']
})
export class GameTeamViewPageComponent
    extends BaseViewComponent<any, any>
    implements OnInit {

    // component
    Constants = GameTeamViewPageConstants;

    /* View page */

    public tabs: ITabModel[] = [];

    /* End View page */

    /* Abstract */

    protected get model(): any { return getDataFromRoute<any>(this.route, GameTeamViewPageConstants.RESOLVE_KEY)!; };

    /* End Abstract */

    constructor(
        route: ActivatedRoute,
        router: Router,
        titleService: Title
    ) {
        super(route, router, titleService);
    }

    protected buildPageTitle(): string {
        return buildTitle('Name');
    }

    protected buildInfoModel(): any {
        return {
        };
    }

    private buildActions(): IDropdownMenuItemModel[] {
        return [
        ]
    }
}