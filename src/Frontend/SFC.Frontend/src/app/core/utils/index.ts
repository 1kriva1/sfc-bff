export {
    buildPath,
    buildTitle,
    getUrlSegment,
    buildFallbackRoute,
    getRouteId,
    buildNavigationExtras,
    addNavigationExtras,
    getValueFromNavigationExtras,
    getRouteData,
    buildBackNavigationExtras,
    getBackNavigationModel
} from './routing/routing.utils';

export {
    getWeekDay,
    getWeekDays,
    getMonths,
    getEnum
} from './enum/enum.utils';

export {
    markFormTouchedAndDirty,
    markControlTouchedAndDirty,
    getControl,
    getFormGroup
} from './form/form.utils';

export {
    calculatePercentage,
    calculatePercentageWithCount,
    isValueModel,
    buildPlaceholder,
    buildPreviewValue,
    getClickObservableFromElementReference,
    getClickObservableFromNativeElement,
    toEnglishLocaleTimeString,
    toEnglishLocaleTimeWithTwoDigitsString,
    convertFileToBase64StringAsync,
    convertFileFromBase64StringAsync
} from './common/common.utils';

export {
    mapPageResponse
} from '../mappers/observable/observable.mapper';

export {
    getShortMonth,
    getLongMonth
} from './localization/localization.utils';

export {
    catchPageError,
    combineWithReload
} from './observable/observable.utils';

export {
    buildLocalResolverModel,
    buildResolverModel,
    buildResolverModelMultiple,
    buildErrorResolverModel,
    buildErrorResolverModelMultiple
} from './model/model.utils';