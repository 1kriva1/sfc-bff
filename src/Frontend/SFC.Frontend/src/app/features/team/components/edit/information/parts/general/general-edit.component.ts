import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ILoadContainerParameters, ILoadContainerLoaderResultModel, where, skip, hasItemBy } from 'ngx-sfc-common';
import { maxArrayLength, IAutoCompleteItemModel } from 'ngx-sfc-inputs';
import { IForm } from '@core/types';
import { IGeneralEditModel } from './general-edit.model';
import { map, Observable, of, delay } from 'rxjs';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { InformationEditPart } from '../../information-edit-part.enum';
import { GeneralEditConstants } from './general-edit.constants';
import { BaseInformationEditComponent } from '../base-information-edit.component';

@Component({
    selector: 'sfc-general-edit',
    templateUrl: './general-edit.component.html',
    styleUrls: ['../base-information-edit.component.scss'],
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class GeneralEditComponent
    extends BaseInformationEditComponent
    implements OnInit {

    InformationEditPart = InformationEditPart;

    Constants = GeneralEditConstants;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const controls: IForm<IGeneralEditModel> = {
            name: [null, [Validators.required, Validators.maxLength(GeneralEditConstants.MAX_NAME_LENGTH)]],
            city: [null, [Validators.required, Validators.maxLength(GeneralEditConstants.MAX_CITY_LENGTH)]],
            stadium: [null],
            description: [null, [Validators.maxLength(GeneralEditConstants.MAX_DESCRIPTION_LENGTH)]],
            tags: [null, [maxArrayLength(GeneralEditConstants.MAX_TAGS_LENGTH)]],
        };

        this.group.addControl(InformationEditPart.General, this.formBuilder.group(controls));
    }

    public stadiumsLoader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<IAutoCompleteItemModel>> {
        return of([
            {
                key: 0,
                value: 'Kyiv',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 1,
                value: 'Konotop',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 2,
                value: 'VDNH',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 3,
                value: 'Bannikova',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 4,
                value: 'University of Shevchenka',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 5,
                value: 'KPI',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 6,
                value: 'Polet',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 7,
                value: 'Meridian',
                image: ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH
            }
        ]).pipe(
            delay(1000),
            map((items: any) => {
                const filtered = where(items, (item: IAutoCompleteItemModel) => {
                    const itemParts = item.value.trim().split(' ');
                    return item.value.includes(parameters.params.value) || hasItemBy(itemParts, part => part.includes(parameters.params.value));
                });

                const data: ILoadContainerLoaderResultModel<any> = filtered
                    ? {
                        items: skip(filtered, parameters.page, 3),
                        next: parameters.page < Math.ceil(filtered.length / 3),
                        total: items.length
                    }
                    : { items: [], next: false, total: items.length };

                return data;
            })
        );
    }
}