import { IForm } from "@core/types";
import { buildPropertyPath, IPredicateMapModel, IPredicateMapParametersModel, toEnglishLocaleTimeString } from "@core/utils";
import { IAvailabilityDateLimitModel, IAvailabilityLimitModel, IEnumModel } from "@share/models";
import { DateTimeConstants, nameof } from "ngx-sfc-common";
import { GameSearchFlterFinancialLocalization } from "./parts/financial/game-search-filter-financial.localization";
import { IGameSearchFilterFinancialModel } from "./parts/financial/game-search-filter-financial.model";
import { GameSearchFilterGeneralLocalization } from "./parts/general/game-search-filter-general.localization";
import { IGameSearchFilterGeneralModel } from "./parts/general/game-search-filter-general.model";
import { GameSearchFlterInventaryLocalization } from "./parts/inventary/game-search-filter-inventary.localization";
import { IGameSearchFilterInventaryModel } from "./parts/inventary/game-search-filter-inventary.model";
import { IGameSearchFilterModel } from "./game-search-filter.model";
import { TableConstants } from "@share/components/extends/components/table/table.constants";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildGameSearchFilterGeneralFormControls } from "./parts/general/game-search-filter-general.utils";
import { buildGameSearchFilterFinancialFormControls } from "./parts/financial/game-search-filter-financial.utils";
import { buildGameSearchFilterInventaryFormControls } from "./parts/inventary/game-search-filter-inventary.utils";
import { formatDate } from "@angular/common";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";
import { CoreLocalization } from "@core/localization";
import { getEnum } from "@share/utils";

export function buildGamePredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    switch (parameters.path) {
        case nameof<IGameSearchFilterGeneralModel>('name'):
            return { label: GameSearchFilterGeneralLocalization.INPUT.NAME.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('general'), nameof<IGameSearchFilterGeneralModel>('statuses')): {
            const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.gameStatuses)!;
            return {
                label: GameSearchFilterGeneralLocalization.INPUT.STATUSES.LABEL,
                value: statusEnum.value,
                icon: statusEnum.icon
            }
        };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('general'), nameof<IGameSearchFilterGeneralModel>('tags')):
            return { label: GameSearchFilterGeneralLocalization.INPUT.TAGS.LABEL };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('general'), nameof<IGameSearchFilterGeneralModel>('availability'), nameof<IAvailabilityDateLimitModel>('date')):
            return { label: GameSearchFilterGeneralLocalization.INPUT.AVAILABLE_DATE.LABEL, value: formatDate(parameters.value, DateTimeConstants.DEFAULT_DATE_TIME_FORMAT, DateTimeConstants.DEFAULT_LOCALE) };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('general'), nameof<IGameSearchFilterGeneralModel>('availability'), nameof<IAvailabilityLimitModel>('from')):
            return { label: GameSearchFilterGeneralLocalization.INPUT.AVAILABLE_FROM.LABEL, value: toEnglishLocaleTimeString(parameters.value) };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('general'), nameof<IGameSearchFilterGeneralModel>('availability'), nameof<IAvailabilityLimitModel>('to')):
            return { label: GameSearchFilterGeneralLocalization.INPUT.AVAILABLE_TO.LABEL, value: toEnglishLocaleTimeString(parameters.value) };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('general'), nameof<IGameSearchFilterGeneralModel>('location')):
            return { label: GameSearchFilterGeneralLocalization.INPUT.LOCATION.LABEL, value: parameters.value.value };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('financial'), nameof<IGameSearchFilterFinancialModel>('freeGame')):
            return {
                label: GameSearchFlterFinancialLocalization.INPUT.FREE_GAME.LABEL,
                value: parameters.value
                    ? GameSearchFlterFinancialLocalization.INPUT.FREE_GAME.ITEMS.REQUIRED
                    : GameSearchFlterFinancialLocalization.INPUT.FREE_GAME.ITEMS.NO_MATTER
            };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('financial'), nameof<IGameSearchFilterFinancialModel>('payAmount'), nameof<IRangeLimitValueModel>('from')):
            return { label: `${GameSearchFlterFinancialLocalization.INPUT.PAY_AMOUNT.LABEL}, ${CoreLocalization.FROM}`, value: parameters.value };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('financial'), nameof<IGameSearchFilterFinancialModel>('payAmount'), nameof<IRangeLimitValueModel>('to')):
            return { label: `${GameSearchFlterFinancialLocalization.INPUT.PAY_AMOUNT.LABEL}, ${CoreLocalization.TO}`, value: parameters.value };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('inventary'), nameof<IGameSearchFilterInventaryModel>('shirtsRequired')):
            return {
                label: GameSearchFlterInventaryLocalization.INPUT.SHIRTS_REQUIRED.LABEL,
                value: parameters.value
                    ? GameSearchFlterInventaryLocalization.INPUT.SHIRTS_REQUIRED.ITEMS.REQUIRED
                    : GameSearchFlterInventaryLocalization.INPUT.SHIRTS_REQUIRED.ITEMS.NO_MATTER
            };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('inventary'), nameof<IGameSearchFilterInventaryModel>('shirtsCount'), nameof<IRangeLimitValueModel>('from')):
            return { label: `${GameSearchFlterInventaryLocalization.INPUT.SHIRTS_COUNT.LABEL}, ${CoreLocalization.FROM}`, value: parameters.value };
        case buildPropertyPath(nameof<IGameSearchFilterModel>('inventary'), nameof<IGameSearchFilterInventaryModel>('shirtsCount'), nameof<IRangeLimitValueModel>('to')):
            return { label: `${GameSearchFlterInventaryLocalization.INPUT.SHIRTS_COUNT.LABEL}, ${CoreLocalization.TO}`, value: parameters.value };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildGameSearchFilterFormControls(formBuilder: FormBuilder): IForm<IGameSearchFilterModel> {
    const generalControls: IForm<IGameSearchFilterGeneralModel> = buildGameSearchFilterGeneralFormControls(formBuilder),
        financialControls: IForm<IGameSearchFilterFinancialModel> = buildGameSearchFilterFinancialFormControls(),
        inventaryControls: IForm<IGameSearchFilterInventaryModel> = buildGameSearchFilterInventaryFormControls();

    const controls: IForm<IGameSearchFilterModel> = {
        general: formBuilder.group(generalControls),
        financial: formBuilder.group(financialControls),
        inventary: formBuilder.group(inventaryControls)
    };

    return controls;
}

export function buildGameSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const controls: IForm<IGameSearchFilterModel> = buildGameSearchFilterFormControls(formBuilder);
    return formBuilder.group(controls);
}
