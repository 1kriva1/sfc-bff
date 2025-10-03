import { Component } from "@angular/core";
import { faBookOpen, faCircleInfo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { TeamPlayerViewPageLocalization } from "./team-player-view-page.localization";
import { ITeamPlayerViewPageModel } from "./team-player-view-page.model";
import { TeamPlayerViewPageRoute } from "./team-player-view-page-route.enum";
import { TeamPlayerViewProfileRoute } from "./components/profile/team-player-view-profile-route.enum";
import { getBackNavigationModel, getUrlSegment } from "@core/utils";
import { setMenuActiveItem } from "@share/utils/components";
import { TeamPlayerViewPageConstants } from "./team-player-view-page.constants";
import { IBackNavigationModel } from "@core/models";
import { empty } from "ngx-sfc-common";

@Component({
    templateUrl: './team-player-view-page.component.html',
    styleUrls: ['./team-player-view-page.component.scss']
})
export class TeamPlayerViewPageComponent {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = TeamPlayerViewPageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: TeamPlayerViewPageRoute.Profile,
                label: TeamPlayerViewPageLocalization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                open: true,
                active: true,
                click: item => this.navigate(item),
                items: [
                    {
                        id: TeamPlayerViewProfileRoute.General,
                        label: TeamPlayerViewPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamPlayerViewPageRoute.Profile)
                    }
                ]
            }
        ]
    };

    public get model(): ITeamPlayerViewPageModel { return this.route.snapshot.data[TeamPlayerViewPageConstants.RESOLVE_KEY].result; };

    public backNavigationModel: IBackNavigationModel | empty = null;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.backNavigationModel = this.getBackNavigationModel();
        this.setMenuActiveItem();
    }

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private getBackNavigationModel(): IBackNavigationModel | empty {
        const navigation: Navigation | null = this.router.getCurrentNavigation();
        return getBackNavigationModel(navigation);
    }
}