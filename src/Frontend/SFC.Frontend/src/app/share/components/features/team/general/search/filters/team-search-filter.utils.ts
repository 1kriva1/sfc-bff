import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getWeekDay, IPredicateMapModel, IPredicateMapParametersModel, toEnglishLocaleTimeString } from "@core/utils";
import { IAvailabilityLimitModel } from "@share/models";
import { nameof } from "ngx-sfc-common";
import { TeamSearchFlterFinancialLocalization } from "./parts/financial/team-search-filter-financial.localization";
import { ITeamSearchFilterFinancialModel } from "./parts/financial/team-search-filter-financial.model";
import { TeamSearchFilterGeneralLocalization } from "./parts/general/team-search-filter-general.localization";
import { ITeamSearchFilterGeneralModel } from "./parts/general/team-search-filter-general.model";
import { TeamSearchFlterInventaryLocalization } from "./parts/inventary/team-search-filter-inventary.localization";
import { ITeamSearchFilterInventaryModel } from "./parts/inventary/team-search-filter-inventary.model";
import { TeamSearchFilterLocalization } from "./team-search-filter.localization";
import { ITeamSearchFilterModel } from "./team-search-filter.model";
import { TableConstants } from "@share/components/extends/components/table/table.constants";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildTeamSearchFilterGeneralFormControls } from "./parts/general/team-search-filter-general.utils";
import { buildTeamSearchFilterFinancialFormControls } from "./parts/financial/team-search-filter-financial.utils";
import { buildTeamSearchFilterInventaryFormControls } from "./parts/inventary/team-search-filter-inventary.utils";

export function mapTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    switch (parameters.path) {
        case nameof<ITeamSearchFilterModel>('name'):
            return { label: TeamSearchFilterLocalization.INPUT.NAME.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('city')):
            return { label: TeamSearchFilterGeneralLocalization.INPUT.CITY.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('statuses')): {
            const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.teamStatuses)!;
            return {
                label: TeamSearchFilterGeneralLocalization.INPUT.STATUSES.LABEL,
                value: statusEnum.value,
                icon: statusEnum.icon
            }
        };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('tags')):
            return { label: TeamSearchFilterGeneralLocalization.INPUT.TAGS.LABEL };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('availability'), nameof<IAvailabilityLimitModel>('days')):
            return { label: TeamSearchFilterGeneralLocalization.INPUT.AVAILABLE_DAYS.LABEL, value: getWeekDay(parameters.value).value };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('availability'), nameof<IAvailabilityLimitModel>('from')):
            return { label: TeamSearchFilterGeneralLocalization.INPUT.AVAILABLE_FROM.LABEL, value: toEnglishLocaleTimeString(parameters.value) };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('availability'), nameof<IAvailabilityLimitModel>('to')):
            return { label: TeamSearchFilterGeneralLocalization.INPUT.AVAILABLE_TO.LABEL, value: toEnglishLocaleTimeString(parameters.value) };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('general'), nameof<ITeamSearchFilterGeneralModel>('hasLogo')):
            return {
                label: TeamSearchFilterGeneralLocalization.INPUT.HAS_LOGO.LABEL,
                value: parameters.value
                    ? TeamSearchFilterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.REQUIRED
                    : TeamSearchFilterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.NO_MATTER
            };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('financial'), nameof<ITeamSearchFilterFinancialModel>('freePlay')):
            return {
                label: TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.LABEL,
                value: parameters.value
                    ? TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.REQUIRED
                    : TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.NO_MATTER
            };
        case buildPropertyPath(nameof<ITeamSearchFilterModel>('inventary'), nameof<ITeamSearchFilterInventaryModel>('shirts')): {
            const shirtEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.shirts)!;
            return {
                label: TeamSearchFlterInventaryLocalization.INPUT.SHIRTS.LABEL,
                value: shirtEnum.value,
                image: shirtEnum.image
            }
        };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const generalControls: IForm<ITeamSearchFilterGeneralModel> = buildTeamSearchFilterGeneralFormControls(formBuilder),
        financialControls: IForm<ITeamSearchFilterFinancialModel> = buildTeamSearchFilterFinancialFormControls(),
        inventaryControls: IForm<ITeamSearchFilterInventaryModel> = buildTeamSearchFilterInventaryFormControls();

    const controls: IForm<ITeamSearchFilterModel> = {
        name: [null],
        general: formBuilder.group(generalControls),
        financial: formBuilder.group(financialControls),
        inventary: formBuilder.group(inventaryControls)
    };

    return formBuilder.group(controls);
}

