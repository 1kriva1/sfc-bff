export class TeamSearchFlterGeneralLocalization {
    static get INPUT() {
        return {
            CITY: {
                LABEL: $localize`:@@core.city:City`,
                PLACEHOLDER: $localize`:@@share.components.features.team.general.search.parts.general.input.city.placeholder:Type city`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.general.input.city.helper-text:City where you planned to find teams`
            },
            TAGS: {
                LABEL: $localize`:@@core.tags:Tags`,
                PLACEHOLDER: $localize`:@@share.components.features.team.general.search.parts.general.input.tags.placeholder:Add tags`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.general.input.tags.helper-text:Maybe, tag can help to find teams`
            },
            AVAILABLE_DAYS: {
                LABEL: $localize`:@@share.components.features.team.general.search.parts.general.input.available-days.label:Choose available days`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.general.input.available-days.helper-text:Find teams that fit your requirements by days`
            },
            AVAILABLE_FROM: {
                LABEL: $localize`:@@share.components.features.team.general.search.parts.general.input.available-from.label:Choose available from time`,
                PLACEHOLDER: $localize`:@@share.components.features.team.general.search.parts.general.input.available-from.placeholder:Available from`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.general.input.available-from.helper-text:Find teams that fit your requirements by time`
            },
            AVAILABLE_TO: {
                LABEL: $localize`:@@share.components.features.team.general.search.parts.general.input.available-to.label:Choose available to time`,
                PLACEHOLDER: $localize`:@@share.components.features.team.general.search.parts.general.input.available-to.placeholder:Available to`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.general.input.available-to.helper-text:Find teams that fit your requirements by time`
            },           
            HAS_LOGO: {
                LABEL: $localize`:@@share.components.features.team.general.search.parts.general.input.has-logo.label:Logo`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.general.input.has-logo.helper-text:Show teams only with own logo`,
                ITEMS: {
                    NO_MATTER: $localize`:@@core.no-matter:No matter`,
                    REQUIRED: $localize`:@@core.required:Required`,
                }
            }
        };
    }
}