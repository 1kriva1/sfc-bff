export class StatsFilterLocalization {
    static get FROM() { return $localize`:@@core.from:From`; }
    static get TO() { return $localize`:@@core.to:To`; }
    static get RESET_LABEL() { return $localize`:@@core.action.reset:Reset`; }
    static get INPUT() {
        return {
            TOTAL: {
                LABEL: $localize`:@@feature.player.search.page.filter.stats.input.total.label:Total`,
                HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.total.helper-text:Find players by stats total rating range value`,
                FILTERS_FROM_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.total.filters-from:Total from`,
                FILTERS_TO_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.total.filters-to:Total to`
            },
            RAITING: {
                LABEL: $localize`:@@feature.player.search.page.filter.stats.input.raiting.label:Or use rating stars`,
                HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.raiting.helper-text:Find players by rating stars`
            },
            PHYSICAL: {
                LABEL: $localize`:@@feature.player.search.page.filter.stats.input.physical.label:Physical`,
                HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.physical.helper-text:Find players by physical stats rating range value`,
                FILTERS_FROM_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.physical.filters-from:Physical from`,
                FILTERS_TO_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.physical.filters-to:Physical to`
            },
            MENTAL: {
                LABEL: $localize`:@@feature.player.search.page.filter.stats.input.mental.label:Mental`,
                HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.mental.helper-text:Find players by mental stats rating range value`,
                FILTERS_FROM_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.mental.filters-from:Mental from`,
                FILTERS_TO_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.mental.filters-to:Mental to`
            },
            SKILL: {
                LABEL: $localize`:@@feature.player.search.page.filter.stats.input.skill.label:Skill`,
                HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.skill.helper-text:Find players by skill stats rating range value`,
                FILTERS_FROM_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.skill.filters-from:Skill from`,
                FILTERS_TO_LABEL: $localize`:@@share.components.features.player.search.filter.stats.input.skill.filters-to:Skill to`
            }
        };
    }
}