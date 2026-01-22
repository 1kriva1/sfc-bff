export class SchemeTeamSearchFilterFormationLocalization {
    static get INPUT() {
        return {
            RAITING: {
                LABEL: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.raiting.label:Raiting`,
                HELPER_TEXT: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.raiting.helper-text:Find schemes by total stats of it selected players`,
                FILTERS_FROM_LABEL: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.raiting.filters-from:Raiting from`,
                FILTERS_TO_LABEL: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.raiting.filters-to:Raiting to`,
                MULTIPLE_LABEL_PART_1: $localize`:@@core.From:From`,
                MULTIPLE_LABEL_PART_2: $localize`:@@core.to:To`
            },
            FORMATION: {
                LABEL: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.formation.label:Formation`,
                PLACEHOLDER: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.formation.placeholder:Choose scheme formation`,
                HELPER_TEXT: $localize`:@@share.components.features.scheme.team.search.filters.parts.formation.input.formation.helper-text:Select scheme with desire formation`
            },
        };
    }
}