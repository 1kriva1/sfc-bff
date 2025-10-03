import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { map, Observable, of, delay } from 'rxjs';
import { ILoadContainerParameters, ILoadContainerLoaderResultModel, where, skip, hasItemBy } from 'ngx-sfc-common';
import { IAutoCompleteItemModel } from 'ngx-sfc-inputs';
import { CoreConstants } from '@core/constants';
import { tagMaxLengthValidationMessage } from '@share/utils/validations';
import { ShareLocalization, ValidationLocalization } from '@share/localization';
import { ValidationConstants } from '@share/constants';
import { TeamProfileEditPartComponent } from '../team-profile-edit-part.component';
import { TeamGeneralProfileEditLocalization } from './team-general-profile-edit.localization';
import { InputsLocalization } from '@share/localization/inputs.localization';

@Component({
    selector: 'sfc-team-general-profile-edit',
    templateUrl: './team-general-profile-edit.component.html',
    styleUrls: ['./team-general-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class TeamGeneralProfileEditComponent
    extends TeamProfileEditPartComponent {

    // share
    ValidationConstants = ValidationConstants;
    ShareLocalization = ShareLocalization;
    InputsLocalization = InputsLocalization;
    ValidationLocalization = ValidationLocalization;
    tagMaxLengthValidationMessage = tagMaxLengthValidationMessage;

    // component
    Localization = TeamGeneralProfileEditLocalization;

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    public stadiumsLoader(parameters: ILoadContainerParameters)
        : Observable<ILoadContainerLoaderResultModel<IAutoCompleteItemModel>> {
        return of([
            {
                key: 0,
                value: 'Kyiv',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 1,
                value: 'Konotop',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 2,
                value: 'VDNH',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 3,
                value: 'Bannikova',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 4,
                value: 'University of Shevchenka',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 5,
                value: 'KPI',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 6,
                value: 'Polet',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
            },
            {
                key: 7,
                value: 'Meridian',
                image: CoreConstants.DEFAULT_FIELD_IMAGE_PATH
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