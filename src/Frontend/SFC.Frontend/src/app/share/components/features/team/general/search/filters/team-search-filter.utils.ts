import { IEnumModel, IForm } from "@core/types";
import { getEnum, getWeekDay, IPredicateMapModel, toEnglishLocaleTimeString } from "@core/utils";
import { IAvailabilityLimitModel } from "@share/models";
import { IEnumsModel } from "@share/services/enum";
import { empty, nameof } from "ngx-sfc-common";
import { TeamSearchFlterFinancialLocalization } from "./parts/financial/team-search-filter-financial.localization";
import { ITeamSearchFilterFinancialModel } from "./parts/financial/team-search-filter-financial.model";
import { TeamSearchFlterGeneralLocalization } from "./parts/general/team-search-filter-general.localization";
import { ITeamSearchFilterGeneralModel } from "./parts/general/team-search-filter-general.model";
import { TeamSearchFlterInventaryLocalization } from "./parts/inventary/team-search-filter-inventary.localization";
import { ITeamSearchFilterInventaryModel } from "./parts/inventary/team-search-filter-inventary.model";
import { TeamSearchFlterLocalization } from "./team-search-filter.localization";
import { ITeamSearchFilterModel } from "./team-search-filter.model";
import { TableConstants } from "@share/components/extends/components/table/table.constants";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildTeamSearchFilterGeneralFormGroup } from "./parts/general/team-search-filter-general.utils";
import { buildTeamSearchFilterFinancialFormGroup } from "./parts/financial/team-search-filter-financial.utils";
import { buildTeamSearchFilterInventaryFormGroup } from "./parts/inventary/team-search-filter-inventary.utils";

export function mapTeamPredicateMapModel(key: string, value: any, enums?: IEnumsModel | empty): IPredicateMapModel {
    switch (key) {
        case nameof<ITeamSearchFilterModel>('name'): return { label: TeamSearchFlterLocalization.INPUT.NAME.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case nameof<ITeamSearchFilterGeneralModel>('city'): return { label: TeamSearchFlterGeneralLocalization.INPUT.CITY.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case nameof<ITeamSearchFilterGeneralModel>('statuses'): {
            const statusEnum: IEnumModel<number> = getEnum(value, enums!.teamStatuses)!;
            return {
                label: TeamSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                value: statusEnum.value,
                icon: statusEnum.icon
            }
        };
        case nameof<ITeamSearchFilterGeneralModel>('tags'): return { label: TeamSearchFlterGeneralLocalization.INPUT.TAGS.LABEL };
        case nameof<IAvailabilityLimitModel>('days'): return { label: TeamSearchFlterGeneralLocalization.INPUT.AVAILABLE_DAYS.LABEL, value: getWeekDay(value).value };
        case nameof<IAvailabilityLimitModel>('from'): return { label: TeamSearchFlterGeneralLocalization.INPUT.AVAILABLE_FROM.LABEL, value: toEnglishLocaleTimeString(value) };
        case nameof<IAvailabilityLimitModel>('to'): return { label: TeamSearchFlterGeneralLocalization.INPUT.AVAILABLE_TO.LABEL, value: toEnglishLocaleTimeString(value) };
        case nameof<ITeamSearchFilterGeneralModel>('hasLogo'): return {
            label: TeamSearchFlterGeneralLocalization.INPUT.HAS_LOGO.LABEL,
            value: value
                ? TeamSearchFlterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.REQUIRED
                : TeamSearchFlterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.NO_MATTER
        };
        case nameof<ITeamSearchFilterFinancialModel>('freePlay'): return {
            label: TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.LABEL,
            value: value
                ? TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.REQUIRED
                : TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.NO_MATTER
        };
        case nameof<ITeamSearchFilterInventaryModel>('shirts'): {
            const shirtEnum: IEnumModel<number> = getEnum(value, enums!.shirts)!;
            return {
                label: TeamSearchFlterInventaryLocalization.INPUT.SHIRTS.LABEL,
                value: shirtEnum.value,
                image: shirtEnum.image
            }
        };
        default: return { label: key, value: value, debounce: null }
    }
}

export function buildTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const generalControls: IForm<ITeamSearchFilterGeneralModel> = buildTeamSearchFilterGeneralFormGroup(formBuilder),
        financialControls: IForm<ITeamSearchFilterFinancialModel> = buildTeamSearchFilterFinancialFormGroup(),
        inventaryControls: IForm<ITeamSearchFilterInventaryModel> = buildTeamSearchFilterInventaryFormGroup();

    const controls: IForm<ITeamSearchFilterModel> = {
        name: [null],
        general: formBuilder.group(generalControls),
        financial: formBuilder.group(financialControls),
        inventary: formBuilder.group(inventaryControls)
    };

    return formBuilder.group(controls);
}

