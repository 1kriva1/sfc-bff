import { Component } from "@angular/core";
import { faBookOpen, faCircleInfo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { InviteTeamPlayerViewPageLocalization } from "./invite-team-player-view-page.localization";
import { InviteTeamPlayerViewPageRoute } from "./invite-team-player-view-page-route.enum";
import { InviteTeamPlayerViewProfileRoute } from "./components/profile/invite-team-player-view-profile-route.enum";
import { getBackNavigationModel, getUrlSegment } from "@core/utils";
import { setMenuActiveItem } from "@share/utils/components";
import { InviteTeamPlayerViewPageConstants } from "./invite-team-player-view-page.constants";
import { IBackNavigationModel } from "@core/models";
import { empty } from "ngx-sfc-common";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";

@Component({
    templateUrl: './invite-team-player-view-page.component.html',
    styleUrls: ['./invite-team-player-view-page.component.scss']
})
export class InviteTeamPlayerViewPageComponent {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = InviteTeamPlayerViewPageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: InviteTeamPlayerViewPageRoute.Profile,
                label: InviteTeamPlayerViewPageLocalization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                open: true,
                active: true,
                click: item => this.navigate(item),
                items: [
                    {
                        id: InviteTeamPlayerViewProfileRoute.General,
                        label: InviteTeamPlayerViewPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, InviteTeamPlayerViewPageRoute.Profile)
                    }
                ]
            }
        ]
    };

    public get model(): ITeamPlayerInviteModel { return this.route.snapshot.data[InviteTeamPlayerViewPageConstants.RESOLVE_KEY].result; };

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