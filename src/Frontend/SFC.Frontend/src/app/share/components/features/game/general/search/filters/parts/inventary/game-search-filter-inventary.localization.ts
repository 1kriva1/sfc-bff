export class GameSearchFlterInventaryLocalization {
    static get INPUT() {
        return {
            SHIRTS_REQUIRED: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.inventary.input.shirts-required.label:Shirts required`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.inventary.input.shirts-required.helper-text:Show games that that need shirts`,
                ITEMS: {
                    NO_MATTER: $localize`:@@core.no-matter:No matter`,
                    REQUIRED: $localize`:@@core.required:Required`,
                }
            },
            SHIRTS_COUNT: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.inventary.input.shirts-count.label:Shirts count`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.inventary.input.shirts-count.helper-text:The amount of shirts required for the game`
            }
        };
    }
}