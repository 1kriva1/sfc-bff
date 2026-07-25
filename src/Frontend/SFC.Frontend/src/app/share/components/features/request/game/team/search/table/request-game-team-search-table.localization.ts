export class RequestGameTeamSearchTableLocalization {
    static get COLUMN() {
        return {
            RATING: $localize`:@@core.Rating:Rating`,
            NAME: $localize`:@@core.Nomenclature:Name`,
            STATUS: $localize`:@@core.Status:Status`,
            PLAYERS_COUNT: $localize`:@@share.components.features.team.general.search.table.column.players-count:Players Count`
        }
    };
}