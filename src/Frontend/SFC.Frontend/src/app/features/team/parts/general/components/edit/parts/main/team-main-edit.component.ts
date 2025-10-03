import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faCamera, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith, tap, switchMap, filter, EMPTY } from 'rxjs';
import { empty, ButtonType, nameof, Position, NotificationType, CommonConstants } from 'ngx-sfc-common';
import { FileValidator } from 'ngx-sfc-inputs';
import { CoreConstants } from '@core/constants';
import { BaseErrorResponse } from '@core/models';
import { buildPreviewValue, getClickObservableFromElementReference, getControl } from '@core/utils';
import { controlFileMaxSizeValidationMessage } from '@share/utils/validations';
import { StatsValue } from '@share/types';
import { getStatsStars } from '@share/utils/stats';
import { TeamEditComponent } from '../../team-edit.component';
import { TeamMainEditLocalization } from './team-main-edit.localization';
import { ITeamMainEditFormModel } from './team-main-edit-form.model';
import { ITeamEditFormModel } from '../../team-edit-form.model';
import { ValidationLocalization } from '@share/localization';
import { CoreLocalization } from '@core/localization';
import { ITeamPlayerModel } from '@share/models/team/team-player.model';
import { ITeamGeneralProfileEditFormModel } from '../profile/parts/general/team-general-profile-edit-form.model';

@Component({
    selector: 'sfc-team-main-edit',
    templateUrl: './team-main-edit.component.html',
    styleUrls: ['./team-main-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TeamMainEditComponent<TFormValue extends ITeamEditFormModel, TResponse extends BaseErrorResponse>
    extends TeamEditComponent<TFormValue, TResponse>
    implements OnInit, AfterViewInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faCamera = faCamera;

    // ngx-sfc-common
    ButtonType = ButtonType;
    Position = Position;
    NotificationType = NotificationType;

    // ngx-sfc-input
    FileValidator = FileValidator;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = TeamMainEditLocalization;

    /* Inputs */

    @Input()
    players$: Observable<ITeamPlayerModel[]> = EMPTY;

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

    /* Observables */

    public name$: Observable<string> = EMPTY;

    public city$: Observable<string> = EMPTY;

    public stars$: Observable<number> = EMPTY;

    public result$: Observable<BaseErrorResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    private submitButton: ElementRef | undefined;

    /* End View */

    /* Properties */

    public get logoMaxSizeValidationMessage(): string {
        return this.logoControl ? controlFileMaxSizeValidationMessage(this.logoControl) : CommonConstants.EMPTY_STRING;
    }

    private get logoControl(): AbstractControl | empty { return getControl(nameof<ITeamMainEditFormModel>('logo'), this.controls) };

    private get nameControl(): AbstractControl | empty { return getControl(nameof<ITeamGeneralProfileEditFormModel>('name'), this.controls) };

    private get cityControl(): AbstractControl | empty { return getControl(nameof<ITeamGeneralProfileEditFormModel>('city'), this.controls) };

    /* End Properties */

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.onInit();
    }

    ngAfterViewInit(): void {
        this.onAfterViewInit();
    }

    private onInit(): void {
        if (this.nameControl) {
            this.name$ = this.nameControl.valueChanges.pipe(
                startWith(this.value.profile.general.name),
                map((value: string) => buildPreviewValue(value, this.Localization.VIEW_MODEL.NAME))
            );
        } else {
            console.error(`Name control is missing in TeamMainEditComponent.`);
        }

        if (this.cityControl) {
            this.city$ = this.cityControl.valueChanges.pipe(
                startWith(this.value.profile.general.city),
                map((value: string) => buildPreviewValue(value, this.Localization.VIEW_MODEL.CITY))
            );
        } else {
            console.error(`City control is missing in TeamMainEditComponent.`);
        }

        this.stars$ = this.players$.pipe(
            map((teamPlayers: ITeamPlayerModel[]) => {
                const stats: StatsValue[] = teamPlayers.map(teamPlayer => teamPlayer.player.stats);
                return getStatsStars(stats);
            }));
    }

    private onAfterViewInit(): void {
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
            console.error(`Submit button is missing in TeamMainEditComponent.`);
        }
    }
}