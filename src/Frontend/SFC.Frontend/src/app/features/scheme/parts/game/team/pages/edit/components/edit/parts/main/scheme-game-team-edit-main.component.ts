import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { map, Observable, startWith, EMPTY, switchMap, combineLatest, filter, tap } from 'rxjs';
import { empty, nameof, Direction, ButtonType, NotificationType, where } from 'ngx-sfc-common';
import { buildPreviewValue, getClickObservableFromElementReference, getControl } from '@core/utils';
import { CoreLocalization } from '@core/localization';
import { SchemeGameTeamPreviewMainLocalization } from './scheme-game-team-edit-main.localization';
import { getPlayersRaiting } from '@share/utils';
import { SchemeGameTeamEditMainConstants } from './scheme-game-team-edit-main.constants';
import { ISchemeGameTeamInfoModel } from '@share/components';
import { ActivatedRoute } from '@angular/router';
import { CommonConstants } from 'ngx-sfc-common';
import { BaseErrorResponse } from '@core/models';
import { SchemeGameTeamEditPageEditComponent } from '../../scheme-game-team-edit-page-edit.component';
import { ISchemeGameTeamEditPageFormModel } from '../../../../models/scheme-game-team-edit-page-form.model';
import { ISchemeGameTeamGeneralProfileEditFormModel } from '../../../../../../components/edit/parts/profile/parts/general/scheme-game-team-general-profile-edit-form.model';
import { ISchemeGameTeamProfileEditFormModel } from '../../../../../../components/edit/parts/profile/scheme-game-team-profile-edit-form.model';
import { ISchemeGameTeamEditFormModel } from '../../../../../../components/edit/scheme-game-team-edit-form.model';
import { ISchemeGameTeamFormationEditFormModel } from '../../../../../../components/edit/parts/formation/scheme-game-team-formation-edit-form.model';

@Component({
    selector: 'sfc-scheme-game-team-edit-main',
    templateUrl: './scheme-game-team-edit-main.component.html',
    styleUrls: ['./scheme-game-team-edit-main.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeGameTeamEditMainComponent
    extends SchemeGameTeamEditPageEditComponent<ISchemeGameTeamEditPageFormModel, BaseErrorResponse>
    implements OnInit, AfterViewInit {

    // icons

    // ngx-sfc-common
    Direction = Direction;
    ButtonType = ButtonType;
    NotificationType = NotificationType;

    // component
    Constants = SchemeGameTeamEditMainConstants;
    Localization = SchemeGameTeamPreviewMainLocalization;

    /* Inputs */

    @Input()
    submitDisabled: boolean = false;

    @Input()
    submitButtonText: string = CommonConstants.EMPTY_STRING;

    @Input()
    buildSubmitObservable: (value: ISchemeGameTeamEditPageFormModel) => Observable<BaseErrorResponse> = () => EMPTY;

    /* End Inputs */

    /* Outputs */

    @Output()
    postSubmit: EventEmitter<BaseErrorResponse> = new EventEmitter<BaseErrorResponse>();

    /* End Outputs */

    /* Fields */

    /* End Fields */

    /* Observables */

    public name$: Observable<string> = EMPTY;

    public schemeGameTeamInfoModel$: Observable<ISchemeGameTeamInfoModel> = EMPTY;

    public result$: Observable<BaseErrorResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    private submitButton: ElementRef | undefined;

    /* End View */

    constructor(
        route: ActivatedRoute,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }

    ngOnInit(): void {
        const nameControl: AbstractControl | empty = getControl(nameof<ISchemeGameTeamGeneralProfileEditFormModel>('name'), this.form.controls);

        if (nameControl) {
            this.name$ = nameControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.name),
                map((value: string) => buildPreviewValue(value, CoreLocalization.NOMENCLATURE))
            );
        }

        const generalProfileControl: AbstractControl | empty = getControl(nameof<ISchemeGameTeamProfileEditFormModel>('general'), this.form.controls),
            formationControl: AbstractControl | empty = getControl(nameof<ISchemeGameTeamEditFormModel>('formation'), this.form.controls);

        if (generalProfileControl && formationControl) {
            this.schemeGameTeamInfoModel$ = combineLatest(
                [
                    generalProfileControl.valueChanges.pipe(startWith(this.form.value.profile.general)),
                    formationControl.valueChanges.pipe(startWith(this.form.value.formation))
                ]).pipe(
                    map(([general, formation]) => this.buildSchemeGameTeamInfoModel(general, formation))
                );
        }
    }

    ngAfterViewInit(): void {
        if (this.submitButton) {
            const formValueChanges: Observable<ISchemeGameTeamEditPageFormModel> = this.form.valueChanges.pipe(startWith(this.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(this.submitButton);

            this.result$ = formValueChanges.pipe(
                switchMap((value: ISchemeGameTeamEditPageFormModel) => {
                    return submit$.pipe(
                        filter(() => this.form.valid),
                        switchMap(() => this.buildSubmitObservable(value)),
                        tap((result) => this.postSubmit.emit(result))
                    );
                }));
        }
    }

    private buildSchemeGameTeamInfoModel(general: ISchemeGameTeamGeneralProfileEditFormModel, formation: ISchemeGameTeamFormationEditFormModel)
        : ISchemeGameTeamInfoModel {
        const rating: number = getPlayersRaiting([]);

        return {
            name: buildPreviewValue(general.name, CoreLocalization.NOMENCLATURE),
            raiting: rating,
            formation: formation.formation,
            players: where(formation.field.players, item => !!item.player)?.length || 0
        };
    }
}