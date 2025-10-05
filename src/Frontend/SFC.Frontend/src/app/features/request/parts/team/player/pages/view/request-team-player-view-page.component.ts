import { Component, OnInit } from "@angular/core";
import { faBookOpen, faCircleInfo, faQuestionCircle, faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { RequestTeamPlayerViewPageLocalization } from "./request-team-player-view-page.localization";
import { RequestTeamPlayerViewPageRoute } from "./request-team-player-view-page-route.enum";
import { RequestTeamPlayerViewProfileRoute } from "./components/profile/request-team-player-view-profile-route.enum";
import { buildTitle, getBackNavigationModel, getRouteData, getUrlSegment } from "@core/utils";
import { setMenuActiveItem } from "@share/utils/components";
import { RequestTeamPlayerViewPageConstants } from "./request-team-player-view-page.constants";
import { IBackNavigationModel } from "@core/models";
import { empty } from "ngx-sfc-common";
import { ITeamPlayerRequestModel } from "@share/models/request/team-player-request.model";
import { ShareLocalization } from "@share/localization";
import { getFullName } from "@share/utils/features/player";
import { Title } from "@angular/platform-browser";
import { StorageService } from "@core/services";
import { RouteConstants } from "@core/constants";
import { Location } from "@angular/common";

@Component({
    templateUrl: './request-team-player-view-page.component.html',
    styleUrls: ['./request-team-player-view-page.component.scss']
})
export class RequestTeamPlayerViewPageComponent implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = RequestTeamPlayerViewPageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: RequestTeamPlayerViewPageRoute.Profile,
                label: RequestTeamPlayerViewPageLocalization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                open: true,
                active: true,
                click: item => this.navigate(item),
                items: [
                    {
                        id: RequestTeamPlayerViewProfileRoute.General,
                        label: RequestTeamPlayerViewPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, RequestTeamPlayerViewPageRoute.Profile)
                    },
                    {
                        id: RequestTeamPlayerViewProfileRoute.Football,
                        label: RequestTeamPlayerViewPageLocalization.MENU.ITEMS.FOOTBALL,
                        icon: faSoccerBall,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, RequestTeamPlayerViewPageRoute.Profile)
                    }
                ]
            }
        ]
    };

    public model: ITeamPlayerRequestModel;

    public backNavigationModel: IBackNavigationModel | empty = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private storageService: StorageService,
        private location: Location) {
        this.backNavigationModel = this.getBackNavigationModel();
        this.model = this.getResolveModel();
        this.setMenuActiveItem();
    }

    ngOnInit(): void {
        this.setPageTitle();
    }

    public onAccepted(_: ITeamPlayerRequestModel): void {
        this.navigateBack();
    }

    public onDeclined(_: ITeamPlayerRequestModel): void {
        this.navigateBack();
    }

    private getResolveModel(): ITeamPlayerRequestModel {
        const routeData: ITeamPlayerRequestModel | null =
            getRouteData(this.route.snapshot, RequestTeamPlayerViewPageConstants.RESOLVE_KEY);

        if (!routeData) {
            console.error('Missing resolve model!');
        }

        return routeData!;
    }

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private navigateBack(): void {
        if (this.backNavigationModel) {
            this.router.navigate([this.backNavigationModel.url]);
        } else {
            this.location.back();
        }
    }

    private getBackNavigationModel(): IBackNavigationModel | empty {
        const navigation: Navigation | null = this.router.getCurrentNavigation();

        const model: IBackNavigationModel | null = getBackNavigationModel(navigation);

        if (model) {
            this.storageService.set(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY, model);
        }

        return model ?? this.storageService.get(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY);
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(`${ShareLocalization.REQUEST} ${CoreLocalization.FROM} ${getFullName(this.model.player)} 
            ${CoreLocalization.TO} ${this.model.team.profile.general.name}`);
        this.titleService.setTitle(pageTitle);
    }
}