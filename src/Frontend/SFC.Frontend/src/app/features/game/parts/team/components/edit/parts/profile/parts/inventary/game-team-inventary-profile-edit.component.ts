import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { CheckmarkType, nameof } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { ValidationConstants } from '@share/constants';
import { getFormGroup } from '@core/utils';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { maxValidationMessage, minValidationMessage } from '@share/utils';
import { ValidationLocalization } from '@share/localization';
import { GameTeamProfileEditPartComponent } from '../game-team-profile-edit-part.component';
import { GameTeamInventaryProfileEditConstants } from './game-team-inventary-profile-edit.constants';
import { GameTeamInventaryProfileEditLocalization } from './game-team-inventary-profile-edit.localization';
import { IGameTeamProfileEditFormModel } from '../../game-team-profile-edit-form.model';
import { EnumService } from '@share/services';
import { IEnumModel } from '@core/types';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-game-team-inventary-profile-edit',
    templateUrl: './game-team-inventary-profile-edit.component.html',
    styleUrls: ['./game-team-inventary-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameTeamInventaryProfileEditComponent
    extends GameTeamProfileEditPartComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // ngx-sfc-common
    CheckmarkType = CheckmarkType;

    // share
    ValidationConstants = ValidationConstants;
    ValidationLocalization = ValidationLocalization;
    minValidationMessage = minValidationMessage;
    maxValidationMessage = maxValidationMessage;

    // component
    Constants = GameTeamInventaryProfileEditConstants;
    Localization = GameTeamInventaryProfileEditLocalization;

    /* Properties */

    public inventaryForm!: FormGroup;

    /* End Properties */

    /* Observables */


    /* End Observables */

    public shirts: IEnumModel<number>[] = this.enumService.enums.shirts;

    constructor(
        private enumService: EnumService,
        route: ActivatedRoute,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }

    ngOnInit(): void {
        this.inventaryForm = getFormGroup(nameof<IGameTeamProfileEditFormModel>('inventary'), this.form.controls)!;
    }
}