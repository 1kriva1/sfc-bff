import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { map, Observable, of, delay } from 'rxjs';
import { ILoadContainerParameters, ILoadContainerLoaderResultModel, where, skip, hasItemBy, nameof } from 'ngx-sfc-common';
import { IAutoCompleteItemModel } from 'ngx-sfc-inputs';
import { CoreConstants } from '@core/constants';
import { tagMaxLengthValidationMessage } from '@share/utils/validations';
import { ValidationLocalization } from '@share/localization';
import { ComponentsConstants, ValidationConstants } from '@share/constants';
import { InputsLocalization } from '@share/localization/inputs.localization';
import { GameGeneralProfileEditLocalization } from './game-general-profile-edit.localization';
import { GameProfileEditPartComponent } from '../game-profile-edit-part.component';
import { Locale } from '@core/enums';
import { StorageService } from '@core/services';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { IGameProfileEditFormModel } from '../../game-profile-edit-form.model';
import { GameGeneralProfileEditConstants } from './game-general-profile-edit.constants';
import { getFormGroup } from '@core/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-game-general-profile-edit',
    templateUrl: './game-general-profile-edit.component.html',
    styleUrls: ['./game-general-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameGeneralProfileEditComponent
    extends GameProfileEditPartComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // share
    ValidationConstants = ValidationConstants;
    InputsLocalization = InputsLocalization;
    ValidationLocalization = ValidationLocalization;
    ComponentsConstants = ComponentsConstants;
    tagMaxLengthValidationMessage = tagMaxLengthValidationMessage;

    // component
    Constants = GameGeneralProfileEditConstants;
    Localization = GameGeneralProfileEditLocalization;

    /* Fields */

    public locale!: Locale;

    public generalForm!: FormGroup;

    /* End Fields */

    constructor(
        private storageService: StorageService,
        route: ActivatedRoute,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        this.generalForm = getFormGroup(nameof<IGameProfileEditFormModel>('general'), this.form.controls)!;
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