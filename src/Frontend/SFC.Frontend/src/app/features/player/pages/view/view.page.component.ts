import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from "@core/components";
import { buildTitle } from "@core/utils";
import {
    faChartLine, faChartPie, faPeopleGroup,
    faPersonHalfDress, faFutbol, faAward, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { IPlayerInfoPanelModel } from "@share/components";
import { getRaiting } from "@share/utils";
import { ComponentSize, getAge, Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel, INavigationMenuItemModel } from "ngx-sfc-components";
import { ViewPagePart } from "./enums/view-page-part.enum";
import { IPlayerModel } from "./mapper/models";
import { ViewPageConstants } from "./view.page.constants";
import { ViewPageLocalization } from "./view.page.localization";

@Component({
    templateUrl: './view.page.component.html',
    styleUrls: ['./view.page.component.scss']
})
export class ViewPageComponent implements OnInit {

    Constants = ViewPageConstants;
    ComponentSize = ComponentSize;
    Position = Position;
    Localization = ViewPageLocalization;

    public MENU: INavigationMenuItemModel[] = [];

    public ACTION_ITEMS: IDropdownMenuItemModel[] = [
        {
            label: ViewPageLocalization.MENU.ACTION.INVITE_TO_GAME,
            icon: faUserPlus
        },
        {
            label: ViewPageLocalization.MENU.ACTION.ADD_TO_TEAM,
            icon: faPeopleGroup
        }
    ];

    public playerInfoPanelModel!: IPlayerInfoPanelModel;

    private currentPart: ViewPagePart = ViewPagePart.General;

    private model!: IPlayerModel;

    constructor(
        public headerService: HeaderService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.model = this.route.snapshot.data[ViewPageConstants.RESOLVE_KEY]?.result;

        this.playerInfoPanelModel = this.getPlayerInfoPanelModel();

        this.currentPart = this.getRoutePart(this.router.url)

        this.MENU = this.buildNavigationMenuItems();

        this.setPageTitle();
    }

    private getRoutePart(url: string): ViewPagePart {
        return url.split('/').pop() as ViewPagePart;
    }

    private getPlayerInfoPanelModel(): IPlayerInfoPanelModel {
        return {
            photo: this.model?.general.photo,
            firstName: this.model?.general.firstName,
            lastName: this.model?.general.lastName,
            city: this.model?.general.city,
            age: this.model?.general.birthday ? getAge(this.model.general.birthday) : null,
            raiting: this.model?.stats.value ? getRaiting(this.model?.stats.value) : null
        };
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(`${this.model?.general.firstName} ${this.model?.general.lastName}`);
        this.titleService.setTitle(pageTitle);
    }

    private buildNavigationMenuItems(): INavigationMenuItemModel[] {
        return [
            {
                label: ViewPageLocalization.MENU.NAVIGATION.GENERAL,
                icon: faPersonHalfDress,
                ...this.buildNavigationMenuItem(ViewPagePart.General)
            },
            {
                label: ViewPageLocalization.MENU.NAVIGATION.STATS,
                icon: faChartLine,
                ...this.buildNavigationMenuItem(ViewPagePart.Stats)
            },
            {
                label: ViewPageLocalization.MENU.NAVIGATION.DASHBOARD,
                icon: faChartPie,
                ...this.buildNavigationMenuItem(ViewPagePart.Dashboard)
            },
            {
                label: ViewPageLocalization.MENU.NAVIGATION.GAMES,
                icon: faFutbol,
                ...this.buildNavigationMenuItem(ViewPagePart.Games)
            },
            {
                label: ViewPageLocalization.MENU.NAVIGATION.TEAMS,
                icon: faPeopleGroup,
                ...this.buildNavigationMenuItem(ViewPagePart.Teams)
            },
            {
                label: ViewPageLocalization.MENU.NAVIGATION.BADGES,
                icon: faAward,
                ...this.buildNavigationMenuItem(ViewPagePart.Badges)
            }
        ];
    }

    private buildNavigationMenuItem(part: ViewPagePart)
        : { active: boolean, click: (_: INavigationMenuItemModel) => void } {
        return {
            active: this.currentPart === part,
            click: () => this.router.navigate([part], { relativeTo: this.route })
        };
    }
}