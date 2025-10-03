import { Component } from "@angular/core";
import { faBookOpen, faCircleInfo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { SchemeTeamViewPageLocalization } from "./scheme-team-view-page.localization";
import { SchemeTeamViewPageRoute } from "./scheme-team-view-page-route.enum";
import { SchemeTeamViewProfileRoute } from "./components/profile/scheme-team-view-profile-route.enum";
import { getBackNavigationModel, getUrlSegment } from "@core/utils";
import { setMenuActiveItem } from "@share/utils/components";
import { SchemeTeamViewPageConstants } from "./scheme-team-view-page.constants";
import { IBackNavigationModel } from "@core/models";
import { empty } from "ngx-sfc-common";
import { ISchemeTeamModel } from "@share/models/scheme/scheme-team.model";

@Component({
    templateUrl: './scheme-team-view-page.component.html',
    styleUrls: ['./scheme-team-view-page.component.scss']
})
export class SchemeTeamViewPageComponent {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = SchemeTeamViewPageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: SchemeTeamViewPageRoute.Profile,
                label: SchemeTeamViewPageLocalization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                open: true,
                active: true,
                click: item => this.navigate(item),
                items: [
                    {
                        id: SchemeTeamViewProfileRoute.General,
                        label: SchemeTeamViewPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, SchemeTeamViewPageRoute.Profile)
                    }
                ]
            }
        ]
    };

    public get model(): ISchemeTeamModel { return this.route.snapshot.data[SchemeTeamViewPageConstants.RESOLVE_KEY].result; };

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