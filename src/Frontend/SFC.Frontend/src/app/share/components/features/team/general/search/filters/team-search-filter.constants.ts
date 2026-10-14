import { ITeamSearchFilterModel } from "./team-search-filter.model";

export class TeamSearchFilterConstants {
    static DEFAULT_SEARCH_FILTER_VALUE: ITeamSearchFilterModel = {
        name: null,
        general: {
            city: null,
            availability: {
                days: null,
                from: null,
                to: null
            },
            hasLogo: null,
            locationId: null,
            statuses: [],
            tags: []
        },
        financial: {
            freePlay: null
        },
        inventary: {
            shirts: null
        }
    };
}