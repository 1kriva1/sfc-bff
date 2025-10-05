import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CoreLocalization } from '@core/localization';
import { getEnum } from '@core/utils';
import { faAnglesDown, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RequestTeamPlayerModal } from '@share/components';
import { IPlayerInfoModel } from '@share/components/features/player/info/player-info.model';
import { ITeamInfoModel } from '@share/components/features/team/general/info/team-info.model';
import { ITeamPlayerRequestModel } from '@share/models/request/team-player-request.model';
import { EnumService } from '@share/services';
import { getPlayersRaiting, getRaiting } from '@share/utils/stats';
import { ButtonType, Direction, getAge, ModalService } from 'ngx-sfc-common';
import { TeamModal } from 'src/app/features/team/components/modals/team-modal.enum';
import { isTeamPlayerRequestActual } from 'src/app/features/team/utils/team.utils';
import { RequestTeamPlayerViewMainConstants } from './request-team-player-view-main.constants';
import { RequestTeamPlayerViewMainLocalization } from './request-team-player-view-main.localization';

@Component({
    selector: 'sfc-request-team-player-view-main',
    templateUrl: './request-team-player-view-main.component.html',
    styleUrls: ['./request-team-player-view-main.component.scss']
})
export class RequestTeamPlayerViewMainComponent implements OnInit {

    // icons
    faAnglesDown = faAnglesDown;
    faCheck = faCheck;
    faXmark = faXmark;

    // ngx-sfc-common
    Direction = Direction;
    ButtonType = ButtonType;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Constants = RequestTeamPlayerViewMainConstants;
    Localization = RequestTeamPlayerViewMainLocalization;

    @Input()
    request!: ITeamPlayerRequestModel;

    @HostBinding('class')
    private get _status(): string {
        return `${RequestTeamPlayerViewMainConstants.STATUS_CLASS_PART}-${this.request.status.key}`;
    }

    public playerInfoModel!: IPlayerInfoModel;

    public teamInfoModel!: ITeamInfoModel;

    public actions: boolean = false;

    constructor(private modalService: ModalService, private enumService: EnumService) { }

    ngOnInit(): void {
        this.playerInfoModel = {
            firstName: this.request.player.general.firstName,
            lastName: this.request.player.general.lastName,
            city: this.request.player.general.city,
            photo: this.request.player.general.photo,
            age: getAge(this.request.player.general.birthday),
            position: getEnum(this.request.player.football.position, this.enumService.enums.footballPositions),
            raiting: getRaiting(this.request.player.stats)
        };

        this.teamInfoModel = {
            name: this.request.team.profile.general.name,
            city: this.request.team.profile.general.city,
            logo: this.request.team.profile.general.logo,
            raiting: getPlayersRaiting(this.request.team.players.map(teamPlayer => teamPlayer.player))
        };

        this.actions = isTeamPlayerRequestActual(this.request.status.key, this.enumService.enums);
    }

    public accept(): void {
        this.modalService.open(RequestTeamPlayerModal.Accept, this.request);
    }

    public decline(): void {
        this.modalService.open(RequestTeamPlayerModal.Decline, this.request);
    }
}