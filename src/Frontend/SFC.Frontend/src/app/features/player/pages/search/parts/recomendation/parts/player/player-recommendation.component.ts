import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { RouteKey } from "@core/enums";
import { faPeopleGroup, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { ProfileRoute } from "@share/enums";
import { Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { PlayerRecomendationConstants } from "./player-recommendation.constants";
import { PlayerRecommendationLocalization } from "./player-recommendation.localization";

@Component({
    selector: 'sfc-player-recommendation',
    templateUrl: './player-recommendation.component.html',
    styleUrls: ['./player-recommendation.component.scss']
})
export class PlayerRecommendationComponent {

    Constants = PlayerRecomendationConstants;
    Position = Position;
    Localization = PlayerRecommendationLocalization;

    public actionItems: IDropdownMenuItemModel[] = [
        {
            label: this.Localization.ACTIONS.INVITE_TO_GAME,
            icon: faUserPlus
        },
        {
            label: this.Localization.ACTIONS.ADD_TO_TEAM,
            icon: faPeopleGroup,
            delimeter: true
        },
        {
            label: this.Localization.ACTIONS.OPEN_PROFILE,
            icon: faUser,
            click: () => this.router.navigate([`${ProfileRoute.Profiles}/${1}/${RouteKey.Edit}`])
        }
    ];

    @Input()
    model: IPlayerInfoModel = { raiting: 0 };

    constructor(private router: Router) { }
}