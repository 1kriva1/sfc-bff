import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getDataFromParentRoute } from "@core/utils";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faC, faCoins, faD, faLocationDot, faShirt } from "@fortawesome/free-solid-svg-icons";
import { IAvailabilityEditFormModel } from "@share/components";
import { ITeamModel } from "@share/models";
import { EnumService } from "@share/services";
import { getTagsFromValues } from "@share/utils";
import { CommonConstants, ComponentSize, empty, ITagModel } from "ngx-sfc-common";
import { TeamViewPageConstants } from "../../team-view-page.constants";
import { TeamViewOverviewLocalization } from "./team-view-overview.localization";

@Component({
    templateUrl: './team-view-overview.component.html',
    styleUrls: ['./team-view-overview.component.scss']
})
export class TeamViewOverviewComponent implements OnInit {

    // icons
    faClock = faClock;
    faLocationDot = faLocationDot
    faC = faC;
    faD = faD;
    faShirt = faShirt;
    faCoins = faCoins;

    // ngx-sfc-common
    ComponentSize = ComponentSize;

    // component
    Localization = TeamViewOverviewLocalization;

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromParentRoute<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public shirtTags: ITagModel[] = [];

    public freePlayLabel: string = CommonConstants.EMPTY_STRING;

    public description: string | empty = null;

    public availability: IAvailabilityEditFormModel[] = [];

    /* End Fields */

    constructor(
        private route: ActivatedRoute,
        private enumService: EnumService
    ) { }

    ngOnInit(): void {
        this.freePlayLabel = this.model.profile.financial.freePlay
            ? TeamViewOverviewLocalization.PANEL.FREE_PLAY.ONLY_FREE_PLAY_OPTION
            : TeamViewOverviewLocalization.PANEL.FREE_PLAY.ANY_PLAY_OPTION;

        this.description = this.model.profile.general.description;

        this.availability = this.model.profile.general.availability || [];

        if (this.model.profile.inventary.shirts) {
            this.shirtTags = getTagsFromValues(this.model.profile.inventary.shirts, this.enumService.enums.shirts);
        }
    }
}