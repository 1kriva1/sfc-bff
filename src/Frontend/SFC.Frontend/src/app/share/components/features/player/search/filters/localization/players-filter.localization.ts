export class PlayersFiltersLocalization {
    static get BUTTON(): string { return $localize`:@@share.components.features.players.search.filters.button.text:Show all available filters`; }

    static get INPUT() {
        return {
            NAME: {
                LABEL: $localize`:@@share.components.features.player.search.filters.input.name.label:Name`,
                PLACEHOLDER: $localize`:@@share.components.features.player.search.filters.input.name.placeholder:Type name...`,
                HELPER_TEXT: $localize`:@@share.components.features.player.search.filters.input.name.helper-text:Search by player name`
            }
        };
    }

    static get MODAL() {
        return {
            HEADER: {
                TITLE: $localize`:@@share.components.features.players.search.filters.modal.header.title:Players filters`
            },
            FOOTER: {
                BUTTON: {
                    APPLY: $localize`:@@core.action.search:Search`,
                    CANCEL: $localize`:@@core.action.cancel:Cancel`
                }
            }
        }
    };

    static get PART() {
        return {
            GENERAL: $localize`:@@core.General:General`,
            FOOTBALL: $localize`:@@core.Football:Football`,
            STATS: $localize`:@@core.Stats:Stats`
        }
    };
}