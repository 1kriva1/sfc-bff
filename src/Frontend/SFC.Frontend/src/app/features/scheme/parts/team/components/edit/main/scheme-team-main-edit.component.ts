import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faBan, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable, EMPTY, startWith, switchMap, filter, tap, map, combineLatest } from 'rxjs';
import { ButtonType, NotificationType, CommonConstants, ModalService, Direction, empty, nameof, Position } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { BaseErrorResponse } from '@core/models';
import { CoreLocalization } from '@core/localization';
import { buildPreviewValue, getClickObservableFromElementReference, getControl } from '@core/utils';
import { SchemeTeamMainEditLocalization } from './scheme-team-main-edit.localization';
import { ISchemeTeamEditFormModel } from '../scheme-team-edit-form.model';
import { ISchemeTeamFormationPlayerModel, ISchemeTeamModel } from '@share/models/scheme/scheme-team.model';
import { SchemeTeamEditComponent } from '../scheme-team-edit.component';
import { SchemeTeamMainEditConstants } from './scheme-team-main-edit.constants';
import { ISchemeInfoModel } from '@share/components/features/scheme/general/info/scheme-info.model';
import { EnumService } from '@share/services';
import { SchemeTeamFormationEditFieldService } from '../formation/parts/field/scheme-team-formation-edit-field.service';
import { getPlayersRaiting, getPlayersStars } from '@share/utils/stats';
import { ISchemeTeamProfileGeneralEditFormModel } from '../profile/parts/general/scheme-team-profile-general-edit-form.model';
import { SchemeTeamModal } from '@share/components/features/scheme';

@Component({
    selector: 'sfc-scheme-team-main-edit',
    templateUrl: './scheme-team-main-edit.component.html',
    styleUrls: ['./scheme-team-main-edit.component.scss']
})
export class SchemeTeamMainEditComponent<TFormValue extends ISchemeTeamEditFormModel, TResponse extends BaseErrorResponse>
    extends SchemeTeamEditComponent<TFormValue, TResponse>
    implements OnInit, AfterViewInit {

    // icons
    faBan = faBan;
    faQuestionCircle = faQuestionCircle;

    // ngx-sfc-common
    Direction = Direction;
    ButtonType = ButtonType;
    Position = Position;
    NotificationType = NotificationType;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // component
    Constants = SchemeTeamMainEditConstants;
    Localization = SchemeTeamMainEditLocalization;

    /* Inputs */

    @Input()
    submitDisabled: boolean = false;

    @Input()
    submitButtonText: string = CommonConstants.EMPTY_STRING;

    @Input()
    buildSubmitObservable: (value: TFormValue) => Observable<TResponse> = () => EMPTY;

    @Input()
    scheme: ISchemeTeamModel | null = null;

    @Input()
    actions: boolean = false;

    /* End Inputs */

    /* Outputs */

    @Output()
    postSubmit: EventEmitter<TResponse> = new EventEmitter<TResponse>();

    /* End Outputs */

    /* Observables */

    public name$: Observable<string> = EMPTY;

    public stars$: Observable<number> = EMPTY;

    public schemeInfoModel$: Observable<ISchemeInfoModel> = EMPTY;

    public result$: Observable<TResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    private submitButton: ElementRef | undefined;

    /* End View */

    /* Properties */

    private get nameControl(): AbstractControl | empty { return getControl(nameof<ISchemeTeamProfileGeneralEditFormModel>('name'), this.controls) };

    /* End Properties */

    constructor(
        private modalService: ModalService,
        private schemeTeamFormationEditFieldService: SchemeTeamFormationEditFieldService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        enumService: EnumService) {
        super(parent, formBuilder, enumService);
    }

    ngOnInit(): void {
        if (this.nameControl) {
            this.name$ = this.nameControl.valueChanges.pipe(
                startWith(this.value.profile.general.name),
                map((value: string) => buildPreviewValue(value, this.Localization.VIEW_MODEL.NAME))
            );
        } else {
            console.error(`Name control is missing for SchemeTeamMainEditComponent.`);
        }

        this.schemeInfoModel$ = combineLatest([
            this.formationChanges$,
            this.schemeTeamFormationEditFieldService.selectedPlayers$
        ]).pipe(
            map(([formation, players]) => {
                return {
                    formation: formation.key,
                    raiting: getPlayersRaiting(players.map(formationPlayer => formationPlayer.player!))
                }
            })
        ); 

        this.stars$ = this.schemeTeamFormationEditFieldService.selectedPlayers$.pipe(
            map((formationPlayers: ISchemeTeamFormationPlayerModel[]) =>
                getPlayersStars(formationPlayers.map(formationPlayer => formationPlayer.player!))));
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
            console.error(`Submit button is missing in SchemeTeamMainEditComponent.`);
        }
    }

    public remove(): void {
        this.modalService.open(SchemeTeamModal.Remove, this.scheme);
    }
}