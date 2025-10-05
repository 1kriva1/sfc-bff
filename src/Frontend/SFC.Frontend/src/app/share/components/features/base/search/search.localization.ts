export class SearchLocalization {
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

    static get TABLE() {
        return {
            COLUMNS_SHOW_LABEL: $localize`:@@core.action.show:Show`,
            COLUMNS_HIDE_LABEL: $localize`:@@core.action.hide:Hide`,
            TOTAL_LABEL: $localize`:@@core.total:Total`,
            DATA_LIST_LABEL: $localize`:@@core.list:List`,
            DATA_CARDS_LABEL: $localize`:@@core.cards:Cards`,
            NOT_FOUND_LABEL: $localize`:@@core.not-found:Not found`
        }
    }
}