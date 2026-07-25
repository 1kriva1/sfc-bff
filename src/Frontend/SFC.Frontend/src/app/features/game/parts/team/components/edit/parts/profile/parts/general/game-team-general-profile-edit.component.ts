import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { CommonConstants, empty, nameof } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { controlFileMaxSizeValidationMessage, tagMaxLengthValidationMessage } from '@share/utils/validations';
import { ValidationLocalization } from '@share/localization';
import { ComponentsConstants, ValidationConstants } from '@share/constants';
import { InputsLocalization } from '@share/localization/inputs.localization';
import { Locale } from '@core/enums';
import { StorageService } from '@core/services';
import { faCamera, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { getControl, getFormGroup } from '@core/utils';
import { GameTeamProfileEditPartComponent } from '../game-team-profile-edit-part.component';
import { GameTeamGeneralProfileEditConstants } from './game-team-general-profile-edit.constants';
import { GameTeamGeneralProfileEditLocalization } from './game-team-general-profile-edit.localization';
import { IGameTeamProfileEditFormModel } from '../../game-team-profile-edit-form.model';
import { CoreLocalization } from '@core/localization';
import { IGameTeamGeneralProfileEditFormModel } from './game-team-general-profile-edit-form.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-game-team-general-profile-edit',
    templateUrl: './game-team-general-profile-edit.component.html',
    styleUrls: ['./game-team-general-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameTeamGeneralProfileEditComponent
    extends GameTeamProfileEditPartComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faCamera = faCamera;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // share
    ValidationConstants = ValidationConstants;
    InputsLocalization = InputsLocalization;
    ValidationLocalization = ValidationLocalization;
    ComponentsConstants = ComponentsConstants;
    tagMaxLengthValidationMessage = tagMaxLengthValidationMessage;

    // component
    Constants = GameTeamGeneralProfileEditConstants;
    Localization = GameTeamGeneralProfileEditLocalization;

    /* Fields */

    public locale!: Locale;

    public generalForm!: FormGroup;

    /* End Fields */

    /* Properties */

    private get logoControl(): AbstractControl | empty { return getControl(nameof<IGameTeamGeneralProfileEditFormModel>('logo'), this.controls) };

    public get logoMaxSizeValidationMessage(): string {
        return this.logoControl ? controlFileMaxSizeValidationMessage(this.logoControl) : CommonConstants.EMPTY_STRING;
    }

    /* End Properties */

    constructor(
        private storageService: StorageService,
        route: ActivatedRoute,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        this.generalForm = getFormGroup(nameof<IGameTeamProfileEditFormModel>('general'), this.form.controls)!;
    }
}