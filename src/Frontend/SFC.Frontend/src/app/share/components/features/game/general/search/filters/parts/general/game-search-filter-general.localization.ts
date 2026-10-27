export class GameSearchFilterGeneralLocalization {
    static get INPUT() { 
        return {
            NAME: {
                LABEL: $localize`:@@core.Nomenclature:Name`,
                PLACEHOLDER: $localize`:@@share.components.features.game.general.search.filters.input.name.placeholder:Type game name...`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.input.name.helper-text:Search every game by its name`
            },   
            STATUSES: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.statuses.label:Statuses`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.statuses.helper-text:Find games by their status`
            },         
            TAGS: {
                LABEL: $localize`:@@core.tags:Tags`,
                PLACEHOLDER: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.tags.placeholder:Add tags`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.tags.helper-text:Maybe, tag can help to find games`
            },
            AVAILABLE_DATE: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-date.label:Date`,
                PLACEHOLDER: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-date.placeholder:Available date`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-date.helper-text:Find games by date`
            },
            AVAILABLE_FROM: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-from.label:Available from time`,
                PLACEHOLDER: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-from.placeholder:Available from`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-from.helper-text:Find games that fit your requirements by time`
            },
            AVAILABLE_TO: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-to.label:Available to time`,
                PLACEHOLDER: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-to.placeholder:Available to`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.available-to.helper-text:Find games that fit your requirements by time`
            },
            LOCATION: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.location.label:Location`,
                PLACEHOLDER: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.location.placeholder:Type location name...`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.general.input.location.helper-text:Search game by its location`
            }
        };
    }
}