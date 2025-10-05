import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faAnglesDown, faBan, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Observable, EMPTY, startWith, switchMap, filter, tap } from 'rxjs';
import { ButtonType, NotificationType, CommonConstants, ModalService, ComponentSize } from 'ngx-sfc-common';
import { AvatarInputTemplate, IAvatarInputModalContextModel, IAvatarInputModalEventModel, IAvatarInputModel } from 'ngx-sfc-inputs';
import { CoreConstants } from '@core/constants';
import { BaseErrorResponse } from '@core/models';
import { getPlayersRaiting, getRaiting, getStars } from '@share/utils/stats';
import { ValidationLocalization } from '@share/localization';
import { CoreLocalization } from '@core/localization';
import { InviteTeamPlayerMainEditLocalization } from './invite-team-player-main-edit.localization';
import { InviteTeamPlayerEditComponent } from '../../invite-team-player-edit.component';
import { IInviteTeamPlayerEditFormModel } from '../../invite-team-player-edit-form.model';
import { IAvatarInputPlayersModalBodyEventModel } from '@share/components/extends/inputs/avatar/modal/body/player/avatar-input-players-modal-body-event.model';
import { IAvatarInputTeamsModalBodyEventModel } from '@share/components/extends/inputs/avatar/modal/body/team/general/avatar-input-teams-modal-body-event.model';
import { IPlayerModel } from '@share/models/player/player.model';
import { ITeamModel } from '@share/models/team/team.model';
import { InviteTeamPlayerPreviewService } from '../../../preview/invite-team-player-preview.service';
import { getClickObservableFromElementReference } from '@core/utils';
import { ITeamPlayerInviteModel } from '@share/models/invite/team-player-invite.model';
import { InviteTeamPlayerMainEditConstants } from './invite-team-player-main-edit.constants';
import { InviteTeamPlayerModal } from '@share/components';

@Component({
    selector: 'sfc-invite-team-player-main-edit',
    templateUrl: './invite-team-player-main-edit.component.html',
    styleUrls: ['./invite-team-player-main-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InviteTeamPlayerMainEditComponent<TFormValue extends IInviteTeamPlayerEditFormModel, TResponse extends BaseErrorResponse>
    extends InviteTeamPlayerEditComponent<TFormValue, TResponse>
    implements OnInit, AfterViewInit, OnDestroy {

    // icons
    faUserPlus = faUserPlus;
    faAnglesDown = faAnglesDown;
    faUsers = faUsers
    faBan = faBan;

    // ngx-sfc-common
    ButtonType = ButtonType;
    NotificationType = NotificationType;
    ComponentSize = ComponentSize;

    // ngx-sfc-input
    AvatarInputTemplate = AvatarInputTemplate;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Constants = InviteTeamPlayerMainEditConstants;
    Localization = InviteTeamPlayerMainEditLocalization;

    /* Inputs */

    @Input()
    submitDisabled: boolean = false;

    @Input()
    submitButtonText: string = CommonConstants.EMPTY_STRING;

    @Input()
    buildSubmitObservable: (value: TFormValue) => Observable<TResponse> = () => EMPTY;

    @Input()
    invite: ITeamPlayerInviteModel | null = null;

    @Input()
    actions: boolean = false;

    /* End Inputs */

    /* Outputs */

    @Output()
    postSubmit: EventEmitter<TResponse> = new EventEmitter<TResponse>();

    /* End Outputs */

    /* Observables */

    public result$: Observable<BaseErrorResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    private submitButton: ElementRef | undefined;

    /* End View */

    /* Properties */

    // private model: ITeamInvitePlayerCreatePageResolveModel | null;

    public teamAvatarInputModel!: IAvatarInputModel;

    public playerAvatarInputModel!: IAvatarInputModel;

    /* End Properties */

    constructor(
        public inviteTeamPlayerPreviewService: InviteTeamPlayerPreviewService,
        private modalService: ModalService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.setAvatarInputModels();
    }

    ngAfterViewInit(): void {
        if (this.submitButton) {
            const formValueChanges: Observable<TFormValue> = this.form.valueChanges.pipe(startWith(this.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(this.submitButton);

            this.result$ = formValueChanges.pipe(
                switchMap((value: TFormValue) => {
                    return submit$.pipe(
                        filter(() => this.form.valid),
                        switchMap(() => this.buildSubmitObservable(value)),
                        tap((result) => this.postSubmit.emit(result))
                    );
                }));
        } else {
            console.error(`Submit button is missing in TeamInvitePlayerMainEditComponent.`);
        }
    }

    ngOnDestroy(): void {
        this.inviteTeamPlayerPreviewService.clear();
    }

    public cancel(): void {
        this.modalService.open(InviteTeamPlayerModal.Cancel, this.invite)
    }

    public onChangePlayer(player: IPlayerModel | null): void {
        if (player) {
            this.playerAvatarInputModel = this.buildPlayerAvatarInputModel(player);
        }

        this.inviteTeamPlayerPreviewService.updatePlayer(player);
    }

    public onSelectPlayer(event: IAvatarInputPlayersModalBodyEventModel, context: IAvatarInputModalContextModel): void {
        if (event.player) {
            const eventModel: IAvatarInputModalEventModel = {
                avatarModel: this.buildPlayerAvatarInputModel(event.player),
                model: event.player,
                value: event.player.id
            };
            context.onSelect(eventModel, event.selected);
        }
    }

    public onChangeTeam(team: ITeamModel | null): void {
        if (team) {
            this.teamAvatarInputModel = this.buildTeamAvatarInputModel(team);
        }

        this.inviteTeamPlayerPreviewService.updateTeam(team);
    }

    public onSelectTeam(event: IAvatarInputTeamsModalBodyEventModel, context: IAvatarInputModalContextModel): void {
        if (event.team) {
            const eventModel: IAvatarInputModalEventModel = {
                avatarModel: this.buildTeamAvatarInputModel(event.team),
                model: event.team,
                value: event.team.id
            };
            context.onSelect(eventModel, event.selected);
        }
    }

    private setAvatarInputModels(): void {
        if (this.invite?.team) {
            this.teamAvatarInputModel = this.buildTeamAvatarInputModel(this.invite.team);
            this.inviteTeamPlayerPreviewService.updateTeam(this.invite.team);
        }

        if (this.invite?.player) {
            this.playerAvatarInputModel = this.buildPlayerAvatarInputModel(this.invite.player);
            this.inviteTeamPlayerPreviewService.updatePlayer(this.invite.player);
        }
    }

    private buildPlayerAvatarInputModel(model: IPlayerModel): IAvatarInputModel {
        const rating: number = getRaiting(model.stats);

        return {
            avatar: {
                firstName: model.general.firstName,
                lastName: model.general.lastName,
                image: model.general.photo ?? CoreConstants.DEFAULT_AVATAR_PATH
            },
            progress: rating,
            stars: getStars(rating)
        };
    }

    private buildTeamAvatarInputModel(model: ITeamModel): IAvatarInputModel {
        const teamPlayers: IPlayerModel[] = model.players.map(teamplayer => teamplayer.player),
            rating: number = getPlayersRaiting(teamPlayers);

        return {
            avatar: {
                firstName: model.profile.general.name,
                image: model.profile.general.logo ?? CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
            },
            progress: rating,
            stars: getStars(rating)
        };
    }
}