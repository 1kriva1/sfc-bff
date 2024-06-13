import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { remove, nameof, CheckmarkType } from 'ngx-sfc-common';
import { SelectItemModel } from 'ngx-sfc-inputs';
import { map, Observable, startWith } from 'rxjs';
import { IForm, IValueModel } from '@core/types';
import { EditPagePart } from '../../enums/edit-page-part.enum';
import { BaseEditComponent } from '../base-edit.component';
import { FootballEditConstants } from './football-edit.constants';
import { FootballEditLocalization } from './football-edit.localization';
import { EnumService } from '@share/services';
import { IFootballEditModel } from './football-edit.model';
import { IEditModel } from '../../models/edit.page.model';

@Component({
    selector: 'sfc-football-edit',
    templateUrl: './football-edit.component.html',
    styleUrls: ['../base-edit.component.scss', './football-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FootballEditComponent
    extends BaseEditComponent
    implements OnInit {

    CheckmarkType = CheckmarkType;
    EditPagePart = EditPagePart;
    Localization = FootballEditLocalization;
    Constants = FootballEditConstants;

    public readonly MAX_HEIGHT_VALUE_VALIDATION: string =
        `${this.Localization.INPUT.HEIGHT.VALIDATIONS.MAX} ${this.Constants.MAX_SIZE_VALUE} ${this.Localization.CENTIMETERS}.`;

    public readonly MAX_WEIGHT_VALUE_VALIDATION: string =
        `${this.Localization.INPUT.WEIGHT.VALIDATIONS.MAX} ${this.Constants.MAX_SIZE_VALUE} ${this.Localization.KILOGRAMS}.`;

    public additionalPositions$!: Observable<SelectItemModel[]>;

    private get positionControl(): AbstractControl | null | undefined {
        return this.form.get(nameof<IEditModel>(EditPagePart.Football))
            ?.get(nameof<IFootballEditModel>('position'));
    }

    private get additionalPositionControl(): AbstractControl | null | undefined {
        return this.form.get(nameof<IEditModel>(EditPagePart.Football))
            ?.get(nameof<IFootballEditModel>('additionalPosition'));
    }
    constructor(
        public enumService: EnumService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder
    ) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const footballControls: IForm<IFootballEditModel> = {
            height: [null, [
                Validators.min(this.Constants.MIN_SIZE_VALUE),
                Validators.max(this.Constants.MAX_SIZE_VALUE)
            ]],
            weight: [null, [
                Validators.min(this.Constants.MIN_SIZE_VALUE),
                Validators.max(this.Constants.MAX_SIZE_VALUE)
            ]],
            number: [null, [
                Validators.min(this.Constants.MIN_NUMBER_VALUE),
                Validators.max(this.Constants.MAX_NUMBER_VALUE)
            ]],
            position: [null],
            additionalPosition: [null],
            workingFoot: [null],
            gameStyle: [null],
            physicalCondition: [null, [
                Validators.min(this.Constants.MIN_RAITING_VALUE),
                Validators.max(this.Constants.MAX_RAITING_VALUE)
            ]],
            skill: [null, [
                Validators.min(this.Constants.MIN_RAITING_VALUE),
                Validators.max(this.Constants.MAX_RAITING_VALUE)
            ]],
            weakFoot: [null, [
                Validators.min(this.Constants.MIN_RAITING_VALUE),
                Validators.max(this.Constants.MAX_RAITING_VALUE)
            ]]
        };

        this.form.addControl(EditPagePart.Football, this.formBuilder.group(footballControls));

        this.initAdditionalPositions();
    }

    private initAdditionalPositions(): void {
        this.additionalPositions$ = this.positionControl?.valueChanges.pipe(
            startWith(this.positionControl?.value),
            map((value: IValueModel<number> | null) => {
                if (!value)
                    return this.enumService.enums.footballPositions;

                const newAdditionalPositions: SelectItemModel[] = Array.from(this.enumService.enums.footballPositions);

                remove(newAdditionalPositions, (item: SelectItemModel) => item.key === value.key);

                if (this.additionalPositionControl?.value?.key === value.key)
                    this.additionalPositionControl.setValue(null, { emitEvent: false });

                return newAdditionalPositions;
            })
        )!;
    }
}
