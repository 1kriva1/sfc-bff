export class PlayersTableLocalization {
    static get COLUMNS_SHOW_LABEL(): string { return $localize`:@@core.action.show:Show`; }
    static get COLUMNS_HIDE_LABEL(): string { return $localize`:@@core.action.hide:Hide`; }
    static get TOTAL_LABEL(): string { return $localize`:@@core.total:Total`; }
    static get DATA_LIST_LABEL(): string { return $localize`:@@core.list:List`; }
    static get DATA_CARDS_LABEL(): string { return $localize`:@@core.cards:Cards`; }
    static get NOT_FOUND_LABEL(): string { return $localize`:@@core.not-found:Not found`; }
    static get COLUMN() {
        return {
            RAITING: $localize`:@@feature.player.search.page.table.column.raiting:Raiting`,
            NAME: $localize`:@@feature.player.search.page.table.column.name:Name`,
            AVAILABLE: $localize`:@@feature.player.search.page.table.column.available:Available`,
            POSITION: $localize`:@@feature.player.search.page.table.column.position:Position`,
            PHYSICAL_CONDITION: $localize`:@@feature.player.search.page.table.column.physicalCondition:Physical condition`,
            SIZE: $localize`:@@feature.player.search.page.table.column.size:Size`
        }
    }
}