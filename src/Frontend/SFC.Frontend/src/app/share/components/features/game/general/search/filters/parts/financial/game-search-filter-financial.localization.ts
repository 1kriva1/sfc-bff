export class GameSearchFlterFinancialLocalization {
    static get INPUT() {
        return {
            FREE_GAME: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.financial.input.free-game.label:Free game`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.financial.input.free-game.helper-text:Show games that play only without paying`,
                ITEMS: {
                    NO_MATTER: $localize`:@@core.no-matter:No matter`,
                    REQUIRED: $localize`:@@core.required:Required`,
                }
            },
            PAY_AMOUNT: {
                LABEL: $localize`:@@share.components.features.game.general.search.filters.parts.financial.input.pay-amount.label:Pay amount`,
                HELPER_TEXT: $localize`:@@share.components.features.game.general.search.filters.parts.financial.input.pay-amount.helper-text:The amount you need to pay for the game`
            }
        };
    }
}