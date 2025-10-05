export class TeamSearchFlterFinancialLocalization {
    static get INPUT() {
        return {
            FREE_PLAY: {
                LABEL: $localize`:@@share.components.features.team.general.search.parts.financial.input.free-play.label:Free play`,
                HELPER_TEXT: $localize`:@@share.components.features.team.general.search.parts.financial.input.free-play.helper-text:Show teams that play only without paying`,
                ITEMS: {
                    NO_MATTER: $localize`:@@core.no-matter:No matter`,
                    REQUIRED: $localize`:@@core.required:Required`,
                }
            }
        };
    }
}