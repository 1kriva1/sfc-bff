import { FormBuilder, FormGroup } from "@angular/forms";
import { CoreLocalization } from "@core/localization";
import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getWeekDay, IPredicateMapModel, IPredicateMapParametersModel, toEnglishLocaleTimeString } from "@core/utils";
import { TableConstants } from "@share/components/extends/components/table/table.constants";
import { nameof } from "ngx-sfc-common";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";
import { PlayersFiltersLocalization } from "./localization/players-filter.localization";
import { IPlayersFilterModel } from "./models/players-filter.model";
import { FootballFilterLocalization } from "./parts/football/football-filter.localization";
import { IFootballFilterModel } from "./parts/football/football-filter.model";
import { buildPlayerSearchFilterFootballFormControls } from "./parts/football/football-filter.utils";
import { GeneralFilterLocalization } from "./parts/general/general-filter.localization";
import { IGeneralFilterAvailabilityModel, IGeneralFilterModel } from "./parts/general/general-filter.model";
import { buildPlayerSearchFilterGeneralFormControls } from "./parts/general/general-filter.utils";
import { StatsFilterLocalization } from "./parts/stats/stats-filter.localization";
import { IStatsFilterModel } from "./parts/stats/stats-filter.model";
import { buildPlayerSearchFilterStatsFormControls } from "./parts/stats/stats-filter.utils";

export function mapPlayerPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    switch (parameters.path) {
        case nameof<IPlayersFilterModel>('name'):
            return { label: PlayersFiltersLocalization.INPUT.NAME.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<IPlayersFilterModel>('general'), nameof<IGeneralFilterModel>('city')):
            return { label: GeneralFilterLocalization.INPUT.CITY.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<IPlayersFilterModel>('general'), nameof<IGeneralFilterModel>('tags')):
            return { label: GeneralFilterLocalization.INPUT.TAGS.LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('general'),
            nameof<IGeneralFilterModel>('years'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: GeneralFilterLocalization.INPUT.YEARS.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('general'),
            nameof<IGeneralFilterModel>('years'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: GeneralFilterLocalization.INPUT.YEARS.FILTERS_TO_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('general'),
            nameof<IGeneralFilterModel>('availability'),
            nameof<IGeneralFilterAvailabilityModel>('days')
        ):
            return { label: GeneralFilterLocalization.INPUT.AVAILABLE_DAYS.LABEL, value: getWeekDay(parameters.value).value };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('general'),
            nameof<IGeneralFilterModel>('availability'),
            nameof<IGeneralFilterAvailabilityModel>('from')
        ):
            return { label: GeneralFilterLocalization.INPUT.AVAILABLE_FROM.LABEL, value: toEnglishLocaleTimeString(parameters.value) };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('general'),
            nameof<IGeneralFilterModel>('availability'),
            nameof<IGeneralFilterAvailabilityModel>('to')
        ):
            return { label: GeneralFilterLocalization.INPUT.AVAILABLE_TO.LABEL, value: toEnglishLocaleTimeString(parameters.value) };
        case buildPropertyPath(nameof<IPlayersFilterModel>('general'), nameof<IGeneralFilterModel>('hasPhoto')):
            return {
                label: GeneralFilterLocalization.INPUT.HAS_PHOTO.LABEL,
                value: parameters.value
                    ? GeneralFilterLocalization.INPUT.HAS_PHOTO.ITEMS.REQUIRED
                    : GeneralFilterLocalization.INPUT.HAS_PHOTO.ITEMS.NO_MATTER
            };
        case buildPropertyPath(nameof<IPlayersFilterModel>('general'), nameof<IGeneralFilterModel>('freePlay')):
            return {
                label: GeneralFilterLocalization.INPUT.FREE_PLAY.LABEL,
                value: parameters.value
                    ? GeneralFilterLocalization.INPUT.FREE_PLAY.ITEMS.ONLY
                    : GeneralFilterLocalization.INPUT.FREE_PLAY.ITEMS.NO_MATTER
            };
        case buildPropertyPath(nameof<IPlayersFilterModel>('football'), nameof<IFootballFilterModel>('positions')): {
            const positionEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.footballPositions)!;
            return {
                label: FootballFilterLocalization.INPUT.POSITIONS.LABEL,
                value: positionEnum.value,
                icon: positionEnum.icon,
                image: positionEnum.image
            }
        };
        case buildPropertyPath(nameof<IPlayersFilterModel>('football'), nameof<IFootballFilterModel>('physicalCondition')): {
            return {
                label: FootballFilterLocalization.INPUT.PHYSICAL_CONDITION.LABEL,
                value: `${parameters.value} ${CoreLocalization.STARS}`,
            }
        };
        case buildPropertyPath(nameof<IPlayersFilterModel>('football'), nameof<IFootballFilterModel>('gameStyles')): {
            const gameStyleEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.gameStyles)!;
            return {
                label: FootballFilterLocalization.INPUT.GAME_STYLES.LABEL,
                value: gameStyleEnum.value,
                icon: gameStyleEnum.icon,
                image: gameStyleEnum.image
            }
        };
        case buildPropertyPath(nameof<IPlayersFilterModel>('football'), nameof<IFootballFilterModel>('workingFoot')): {
            const workingFootEnum: IEnumModel<number> = getEnum(parameters.value.key, parameters.enums!.workingFoots)!;

            return {
                label: FootballFilterLocalization.INPUT.WORKING_FOOT.LABEL,
                value: workingFootEnum?.value,
                icon: workingFootEnum?.icon,
                image: workingFootEnum?.image
            }
        };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('football'),
            nameof<IFootballFilterModel>('height'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: FootballFilterLocalization.INPUT.HEIGHT.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('football'),
            nameof<IFootballFilterModel>('height'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: FootballFilterLocalization.INPUT.HEIGHT.FILTERS_TO_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('football'),
            nameof<IFootballFilterModel>('weight'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: FootballFilterLocalization.INPUT.WEIGHT.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('football'),
            nameof<IFootballFilterModel>('weight'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: FootballFilterLocalization.INPUT.WEIGHT.FILTERS_TO_LABEL };
        case buildPropertyPath(nameof<IPlayersFilterModel>('football'), nameof<IFootballFilterModel>('skill')): {
            return {
                label: FootballFilterLocalization.INPUT.SKILL.LABEL,
                value: `${parameters.value} ${CoreLocalization.STARS}`,
            }
        };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('total'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: StatsFilterLocalization.INPUT.TOTAL.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('total'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: StatsFilterLocalization.INPUT.TOTAL.FILTERS_TO_LABEL };
        case buildPropertyPath(nameof<IPlayersFilterModel>('stats'), nameof<IStatsFilterModel>('raiting')): {
            return {
                label: StatsFilterLocalization.INPUT.RAITING.LABEL,
                value: `${parameters.value} ${CoreLocalization.STARS}`,
            }
        };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('physical'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: StatsFilterLocalization.INPUT.PHYSICAL.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('physical'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: StatsFilterLocalization.INPUT.PHYSICAL.FILTERS_TO_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('mental'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: StatsFilterLocalization.INPUT.MENTAL.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('mental'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: StatsFilterLocalization.INPUT.MENTAL.FILTERS_TO_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('skill'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: StatsFilterLocalization.INPUT.SKILL.FILTERS_FROM_LABEL };
        case buildPropertyPath(
            nameof<IPlayersFilterModel>('stats'),
            nameof<IStatsFilterModel>('skill'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: StatsFilterLocalization.INPUT.SKILL.FILTERS_TO_LABEL };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildPlayerSearchFilterFormControls(formBuilder: FormBuilder): IForm<IPlayersFilterModel> {
    const generalControls: IForm<IGeneralFilterModel> = buildPlayerSearchFilterGeneralFormControls(formBuilder),
        footballControls: IForm<IFootballFilterModel> = buildPlayerSearchFilterFootballFormControls(),
        statsControls: IForm<IStatsFilterModel> = buildPlayerSearchFilterStatsFormControls();

    const controls: IForm<IPlayersFilterModel> = {
        name: [null],
        general: formBuilder.group(generalControls),
        football: formBuilder.group(footballControls),
        stats: formBuilder.group(statsControls)
    };

    return controls;
}

export function buildPlayerSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const controls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);
    return formBuilder.group(controls);
}

