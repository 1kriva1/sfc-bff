import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { buildTitle, getDataFromRoute } from "@core/utils";
import { BaseViewComponent } from "@share/components";
import { IDropdownMenuItemModel, ITabModel } from "ngx-sfc-components";
import { RequestGameTeamViewPageConstants } from "./request-game-team-view-page.constants";

@Component({
    templateUrl: './request-game-team-view-page.component.html',
    styleUrls: ['./request-game-team-view-page.component.scss']
})
export class RequestGameTeamViewPageComponent
    extends BaseViewComponent<any, any>
    implements OnInit {

    // component
    Constants = RequestGameTeamViewPageConstants;

    /* View page */

    public tabs: ITabModel[] = [];

    /* End View page */

    /* Abstract */

    protected get model(): any { return getDataFromRoute<any>(this.route, RequestGameTeamViewPageConstants.RESOLVE_KEY)!; };

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