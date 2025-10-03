import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faHashtag, faLocationPin, faQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EnumService } from '@share/services';
import { getTagsFromEnums } from '@share/utils/components';
import { RequestTeamPlayerViewProfilePartComponent } from '../request-team-player-view-profile-part.component';
import { RequestTeamPlayerViewFootballProfileLocalization } from './request-team-player-view-football-profile.localization';

@Component({
    templateUrl: './request-team-player-view-football-profile.component.html',
    styleUrls: ['./request-team-player-view-football-profile.component.scss']
})
export class RequestTeamPlayerViewFootballProfileComponent
    extends RequestTeamPlayerViewProfilePartComponent
    implements OnInit {

    // icons
    faCheck = faCheck;
    faXmark = faXmark;
    faLocationPin = faLocationPin;
    faHashtag = faHashtag;
    faQuestion = faQuestion;

    // component
    Localization = RequestTeamPlayerViewFootballProfileLocalization;

    public viewModel!: any;

    constructor(private enumService: EnumService, route: ActivatedRoute) {
        super(route);
    }

    ngOnInit(): void {
        this.viewModel = {
            positions: getTagsFromEnums(this.enumService.enums.footballPositions),
            number: 10,
            mainSquad: false
        };
    }
}