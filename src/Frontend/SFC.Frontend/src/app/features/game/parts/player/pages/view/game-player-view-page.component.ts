import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { buildTitle, getDataFromRoute } from "@core/utils";
import { BaseViewComponent } from "@share/components";
import { IDropdownMenuItemModel, ITabModel } from "ngx-sfc-components";
import { GamePlayerViewPageConstants } from "./game-player-view-page.constants";

@Component({
    templateUrl: './game-player-view-page.component.html',
    styleUrls: ['./game-player-view-page.component.scss']
})
export class GamePlayerViewPageComponent
    extends BaseViewComponent<any, any>
    implements OnInit {

    // component
    Constants = GamePlayerViewPageConstants;

    /* View page */

    public tabs: ITabModel[] = [];

    /* End View page */

    /* Abstract */

    protected get model(): any { return getDataFromRoute<any>(this.route, GamePlayerViewPageConstants.RESOLVE_KEY)!; };

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