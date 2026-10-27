import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { Direction, hasItemBy, ILoadContainerLoaderResultModel, ILoadContainerParameters, skip, where } from "ngx-sfc-common";
import { IAutoCompleteItemModel, IBubbleModel } from "ngx-sfc-inputs";
import { GameSearchFilterGeneralConstants } from "./game-search-filter-general.constants";
import { GameSearchFilterGeneralLocalization } from "./game-search-filter-general.localization";
import { IGameSearchFilterGeneralModel } from "./game-search-filter-general.model";
import { ComponentsConstants, ValidationConstants } from "@share/constants";
import { ShareLocalization, ValidationLocalization } from "@share/localization";
import { mapBubbles } from "@share/utils/inputs";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { CoreConstants } from "@core/constants";
import { InputsLocalization } from "@share/localization/inputs.localization";
import { EnumService } from "@share/services";
import { buildGameSearchFilterGeneralFormControls } from "./game-search-filter-general.utils";
import { GameSearchFilterPart } from "../../game-search-filter-part.enum";
import { GameSearchFilterGeneralPart } from "./game-search-filter-general-part.enum";
import { Observable, of, delay, map } from "rxjs";

@Component({
    selector: 'sfc-game-search-filter-general',
    templateUrl: './game-search-filter-general.component.html',
    styleUrls: ['./game-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameSearchFilterGeneralComponent implements OnInit {

    @Input()
    build: boolean = true;

    @Input()
    parts: GameSearchFilterGeneralPart[] = [];

    // ngx-sfc-common
    Direction = Direction;

    // share
    ValidationConstants = ValidationConstants;
    ComponentsConstants = ComponentsConstants;
    ValidationLocalization = ValidationLocalization;
    InputLocalization = InputsLocalization;
    ShareLocalization = ShareLocalization;

    // component
    Localization = GameSearchFilterGeneralLocalization;
    Constants = GameSearchFilterGeneralConstants;
    GameSearchFilterPart = GameSearchFilterPart;
    GameSearchFilterGeneralPart = GameSearchFilterGeneralPart;

    public statuses: IBubbleModel[];

    public locale: Locale;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private enumService: EnumService
    ) {
        this.locale = this.storageService.getWithDefault<Locale>(CoreConstants.LOCALE_KEY, Locale.English);
        this.statuses = mapBubbles(this.enumService.enums.gameStatuses);
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    public isPartVisible(part: GameSearchFilterGeneralPart): boolean {
        return this.parts.length === 0 || this.parts.includes(part);
    }

    public locationsLoader(parameters: ILoadContainerParameters)
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

    private buildFormGroup(): void {
        const controls: IForm<IGameSearchFilterGeneralModel> = buildGameSearchFilterGeneralFormControls(this.formBuilder);
        this.parent.form.addControl(GameSearchFilterPart.General, this.formBuilder.group(controls));
    }
}