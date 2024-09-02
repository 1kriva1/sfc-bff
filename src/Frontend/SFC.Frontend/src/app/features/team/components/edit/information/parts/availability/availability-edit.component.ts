import { Component, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { nameof, Compare, ButtonType, removeItem, SortingDirection, ComponentSize } from 'ngx-sfc-common';
import { IDateTimeModalButtonsModel, compareThan, IBubbleModel } from 'ngx-sfc-inputs';
import { IEnumModel, IForm } from '@core/types';
import { getWeekDays, markControlTouchedAndDirty } from '@core/utils';
import { StorageService } from '@core/services';
import { Locale } from '@core/enums';
import { InformationEditPart } from '../../information-edit-part.enum';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { faCalendarDay, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AvailabilityEditConstants } from './availability-edit.constants';
import { AvailabilityEditLocalization } from './availability-edit.localization';
import { BaseInformationEditComponent } from '../base-information-edit.component';
import { IAvailabilityEditModel } from './models/availability-edit.model';
import { IAvailabilityFormModel } from './models/availability-form.model';

@Component({
    selector: 'sfc-availability-edit',
    templateUrl: './availability-edit.component.html',
    styleUrls: ['../base-information-edit.component.scss', './availability-edit.component.scss'],
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class AvailabilityEditComponent
    extends BaseInformationEditComponent
    implements OnInit {

    faPlus = faPlus;
    faCalendarDay = faCalendarDay;
    faTimes = faTimes;

    ButtonType = ButtonType;
    SortingDirection = SortingDirection;
    ComponentSize = ComponentSize;

    InformationEditPart = InformationEditPart;

    Constants = AvailabilityEditConstants;
    Localization = AvailabilityEditLocalization;

    public availabilityForm!: FormGroup;
    public weekDays!: IEnumModel<number>[];
    public daysBubbles!: IBubbleModel[];
    public locale!: Locale;
    public dateTimeInputModalButtonsModel: IDateTimeModalButtonsModel = {
        okLabel: 'Ok',
        cancelLabel: 'Cancel'
    };
    public sortingPath: string = nameof<IAvailabilityEditModel>('day');

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private storageService: StorageService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.initForm();
        this.initAvailabilityForm();
        this.locale = this.storageService.get<Locale>(ApplicationCommonConstants.LOCALE_KEY, Locale.English)!;
        this.weekDays = getWeekDays() as IEnumModel<number>[];
        this.daysBubbles = this.weekDays.map(d => ({ key: d.key, label: d.value }));
    }

    public add(): void {
        const days: AbstractControl = markControlTouchedAndDirty(this.availabilityForm, nameof<IAvailabilityFormModel>('days'))!,
            from: AbstractControl = markControlTouchedAndDirty(this.availabilityForm, nameof<IAvailabilityFormModel>('from'))!,
            to: AbstractControl = markControlTouchedAndDirty(this.availabilityForm, nameof<IAvailabilityFormModel>('to'))!;

        if (this.availabilityForm.valid) {
            this.availabilityForm.value.days.forEach((day: number) => {
                this.group.value.availability.push({
                    day: day,
                    from: this.availabilityForm.value.from,
                    to: this.availabilityForm.value.to
                });
            });

            this.group.updateValueAndValidity();

            days.markAsPristine();
            from.markAsPristine();
            to.markAsPristine();
            this.availabilityForm.setValue({ days: [], from: null, to: null });
        }
    }

    public remove(model: IAvailabilityEditModel): void {
        removeItem(this.group.value.availability, model);
        this.group.updateValueAndValidity();
    }

    private initForm(): void {
        this.group.addControl(InformationEditPart.Availability, this.formBuilder.array([]));
    }

    private initAvailabilityForm(): void {
        const controls: IForm<IAvailabilityFormModel> = {
            days: [null, [Validators.required]],
            from: [null, [Validators.required, compareThan(nameof<IAvailabilityFormModel>('to'), Compare.Less)]],
            to: [null, [Validators.required, compareThan(nameof<IAvailabilityFormModel>('from'), Compare.More, true)]],
        };

        this.availabilityForm = this.formBuilder.group(controls);
    }
}