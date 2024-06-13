import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { CheckmarkType, getPreviousDate, nameof, Compare } from 'ngx-sfc-common';
import { SelectItemModel, IDateTimeModalButtonsModel, maxArrayLength, compareThan } from 'ngx-sfc-inputs';
import { IForm } from '@core/types';
import { getWeekDays } from '@core/utils';
import { BaseEditComponent } from '../base-edit.component';
import { StorageService } from '@core/services/storage/storage.service';
import { Locale } from '@core/enums';
import { CommonConstants } from '@core/constants';
import { GeneralEditLocalization } from './general-edit.localization';
import { EditPagePart } from '../../enums/edit-page-part.enum';
import { GeneralEditConstants } from './general-edit.constants';
import { IGeneralEditAvailabilityModel, IGeneralEditModel } from './general-edit.model';

@Component({
    selector: 'sfc-general-edit',
    templateUrl: './general-edit.component.html',
    styleUrls: ['../base-edit.component.scss', './general-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GeneralEditComponent
    extends BaseEditComponent
    implements OnInit {

    CheckmarkType = CheckmarkType;
    EditPagePart = EditPagePart;
    Constants = GeneralEditConstants;
    Localization = GeneralEditLocalization;

    public readonly MAX_TAG_VALUE_VALIDATION: string =
        `${this.Localization.INPUT.TAGS.VALIDATIONS.TAG_LENGTH} ${this.Constants.MAX_TAG_VALUE_LENGTH} ${this.Localization.CHARACTERS}.`;

    public WEEK_DAYS: SelectItemModel[] = getWeekDays() as SelectItemModel[];

    public locale!: Locale;

    public birtdayLimits!: { min: Date, max: Date };

    public DATE_INPUT_MODAL_BUTTONS_MODEL: IDateTimeModalButtonsModel = {
        okLabel: this.Localization.BUTTON_OK_LABEL,
        cancelLabel: this.Localization.BUTTON_CANCEL_LABEL
    };

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private storageService: StorageService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const now: Date = new Date(),
            availabilityControls: IForm<IGeneralEditAvailabilityModel> = {
                days: [null],
                from: [null, [compareThan(nameof<IGeneralEditAvailabilityModel>('to'), Compare.Less)]],
                to: [null, [compareThan(nameof<IGeneralEditAvailabilityModel>('from'), Compare.More, true)]]
            },
            generalControls: IForm<IGeneralEditModel> = {
                firstName: [null, [Validators.required, Validators.maxLength(this.Constants.MAX_NAME_LENGTH)]],
                lastName: [null, [Validators.required, Validators.maxLength(this.Constants.MAX_NAME_LENGTH)]],
                biography: [null, [Validators.maxLength(this.Constants.MAX_BIOGRAPHY_LENGTH)]],
                birthday: [null],
                city: [null, [Validators.required, Validators.maxLength(this.Constants.MAX_CITY_LENGTH)]],
                tags: [null, [maxArrayLength(this.Constants.MAX_TAGS_LENGTH)]],
                freePlay: [false],
                availability: this.formBuilder.group(availabilityControls)
            };

        this.form.addControl(EditPagePart.General, this.formBuilder.group(generalControls));

        this.locale = this.storageService.get<Locale>(CommonConstants.LOCALE_KEY, Locale.English)!;

        this.birtdayLimits = {
            max: getPreviousDate(now),
            min: new Date(now.getUTCFullYear() - this.Constants.MAX_AGE, now.getUTCMonth(), now.getUTCDate())
        };
    }
}