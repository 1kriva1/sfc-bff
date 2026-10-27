import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faA, faB, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith, EMPTY, filter, switchMap, tap, pairwise } from 'rxjs';
import { empty, nameof, convertDateToTimestamp, CommonConstants, NotificationType, ButtonType, Position, ReloadService } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { buildPreviewValue, getClickObservableFromElementReference, getControl, getDataFromRouteRecursively } from '@core/utils';
import { CoreLocalization } from '@core/localization';
import { IEnumModel } from "@share/models";
import { EnumService, GameTeamService, IUpdateGameTeamsResponse } from '@share/services';
import { formatDate } from '@angular/common';
import { Locale } from '@core/enums';
import { INotification, NotificationService, StorageService } from '@core/services';
import { GameMainEditLocalization } from './game-main-edit.localization';
import { getEnum, getStars, getTeamRaiting } from '@share/utils';
import { GameMainEditConstants } from './game-main-edit.constants';
import { IAvatarInputGameTeamsModalBodyEventModel } from '@share/components';
import { ITeamModel } from '@share/models';
import { BaseErrorResponse } from '@core/models';
import { AvatarInputTemplate, IAvatarInputModalContextModel, IAvatarInputModalEventModel, IAvatarInputModel } from 'ngx-sfc-inputs';
import { ActivatedRoute } from '@angular/router';
import { ValidationLocalization } from '@share/localization';
import { IGameEditPageFormModel } from '../../../../models/game-edit-page-form.model';
import { GameEditPageEditComponent } from '../../game-edit-page-edit.component';
import { GameEditPageConstants } from '../../../../game-edit-page.constants';
import { IGameEditPageModel } from '../../../../models/game-edit-page.model';
import { IGameGeneralProfileEditFormModel } from '../../../../../../components/edit/parts/profile/parts/general/game-general-profile-edit-form.model';
import { ChangesCheckService } from '@core/guards/changes-check/changes-check.service';
import { MessageSeverity } from '@core/services/message/message-severity.enum';
import { mapUpdateGameTeamRequest } from './game-main-edit.mapper';
import { IGameMainEditFormModel } from './game-main-edit-form.model';
import { Enum, GameAction } from '@share/enums';

@Component({
    selector: 'sfc-game-main-edit',
    templateUrl: './game-main-edit.component.html',
    styleUrls: ['./game-main-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameMainEditComponent<TFormValue extends IGameEditPageFormModel, TResponse extends BaseErrorResponse>
    extends GameEditPageEditComponent<TFormValue, TResponse>
    implements OnInit, AfterViewInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faA = faA;
    faB = faB;

    // ngx-sfc-common
    ButtonType = ButtonType;
    Position = Position;
    NotificationType = NotificationType;

    // ngx-sfc-input
    AvatarInputTemplate = AvatarInputTemplate;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Constants = GameMainEditConstants;
    Localization = GameMainEditLocalization;

    /* Inputs */

    @Input()
    submitDisabled: boolean = false;

    @Input()
    submitButtonText: string = CommonConstants.EMPTY_STRING;

    @Input()
    buildSubmitObservable: (value: TFormValue) => Observable<TResponse> = () => EMPTY;

    /* End Inputs */

    /* Outputs */

    @Output()
    postSubmit: EventEmitter<TResponse> = new EventEmitter<TResponse>();

    /* End Outputs */

    /* Fields */

    public status!: IEnumModel<number>;

    private locale!: Locale;

    public teamAAvatarModel: IAvatarInputModel | empty = null;

    public teamBAvatarModel: IAvatarInputModel | empty = null;

    public model!: IGameEditPageModel;

    /* End Fields */

    /* Observables */

    public date$: Observable<string> = EMPTY;

    public from$: Observable<string> = EMPTY;

    public to$: Observable<string> = EMPTY;

    public name$: Observable<string> = EMPTY;

    public result$: Observable<BaseErrorResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    private submitButton: ElementRef | undefined;

    /* End View */

    @HostBinding('class')
    private get _status(): string { return `${GameMainEditConstants.STATUS_CLASS_PART}-${this.status?.key}` };

    constructor(
        private enumService: EnumService,
        private storageService: StorageService,
        private route: ActivatedRoute,
        private gameTeamService: GameTeamService,
        private changesCheckService: ChangesCheckService,
        private notificationService: NotificationService,
        private reloadService: ReloadService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        this.model = getDataFromRouteRecursively<IGameEditPageModel>(this.route, GameEditPageConstants.RESOLVE_KEY)!;

        this.status = getEnum(this.model.game.game.status, this.enumService.enums.gameStatuses)!;

        const nameControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('name'), this.form.controls);

        if (nameControl) {
            this.name$ = nameControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.name),
                map((value: string) => buildPreviewValue(value, CoreLocalization.NOMENCLATURE))
            );
        }

        const dateControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('date'), this.form.controls);

        if (dateControl) {
            this.date$ = dateControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.date),
                map((value: Date) => buildPreviewValue(value ? formatDate(value, 'fullDate', this.locale) : value, CoreLocalization.Date))
            );
        }

        const fromControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('from'), this.form.controls);

        if (fromControl) {
            this.from$ = fromControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.from),
                map((value: Date) => buildPreviewValue(value ? convertDateToTimestamp(value, this.locale) : value, CoreLocalization.FROM))
            );
        }

        const toControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('to'), this.form.controls);

        if (toControl) {
            this.to$ = toControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.to),
                map((value: Date) => buildPreviewValue(value ? convertDateToTimestamp(value, this.locale) : value, CoreLocalization.TO))
            );
        }

        const teamAControl: AbstractControl | empty = getControl(nameof<IGameMainEditFormModel>('teamAId'), this.form.controls);
        this.subscribeToGameTeamChanges(teamAControl, this.form.value.main.teamAId, Enum.GameTeamIndex.A);

        const teamBControl: AbstractControl | empty = getControl(nameof<IGameMainEditFormModel>('teamBId'), this.form.controls);
        this.subscribeToGameTeamChanges(teamBControl, this.form.value.main.teamBId, Enum.GameTeamIndex.B);

        this.teamAAvatarModel = this.buildTeamAvatarInputModel(this.model.gameTeam.a?.gameTeam.team);

        this.teamBAvatarModel = this.buildTeamAvatarInputModel(this.model.gameTeam.b?.gameTeam.team);
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
        }
    }

    public onSelectGameTeam(event: IAvatarInputGameTeamsModalBodyEventModel, context: IAvatarInputModalContextModel): void {
        if (event.gameTeam) {
            const eventModel: IAvatarInputModalEventModel = {
                avatarModel: this.buildTeamAvatarInputModel(event.gameTeam.gameTeam.team)!,
                model: event.gameTeam,
                value: event.gameTeam.gameTeam.team?.id!
            };

            context.onSelect(eventModel, event.selected);
        }
    }

    private updateGameTeams(currentTeamAId: number | empty, previousTeamAId: number | empty, index: number)
        : Observable<IUpdateGameTeamsResponse> {
        const request = mapUpdateGameTeamRequest(
            currentTeamAId,
            previousTeamAId,
            index
        );

        return this.gameTeamService.updates(this.model.game.game.id, request);
    }

    private buildTeamAvatarInputModel(model: ITeamModel | empty): IAvatarInputModel | empty {
        if (!model) return null;

        const rating: number = getTeamRaiting(model);

        return {
            avatar: {
                firstName: model.profile.general.name,
                image: model.profile.general.logo ?? CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
            },
            progress: rating,
            stars: getStars(rating)
        };
    }

    private subscribeToGameTeamChanges(control: AbstractControl | empty, teamId: number | empty, index: number): void {
        if (control) {
            control.valueChanges.pipe(
                startWith(teamId),
                filter(() => control.valid),
                pairwise(),
                switchMap(([previousTeamAId, currentTeamAId]) => this.updateGameTeams(currentTeamAId, previousTeamAId, index))
            ).subscribe(response => this.onUpdated(response));
        }
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: GameMainEditLocalization.NOTIFICATION.UPDATED.VALUE,
            title: GameMainEditLocalization.NOTIFICATION.UPDATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    public onUpdated(response: IUpdateGameTeamsResponse): void {
        if (response.Success) {
            this.notify();
            this.reloadService.reload(GameAction.GameTeam);
            this.changesCheckService.set(this.form);
        }
    }
}