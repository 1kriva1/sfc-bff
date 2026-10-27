import { IGameSearchFilterModel } from "./game-search-filter.model";

export class GameSearchFilterConstants {
    static DEFAULT_SEARCH_FILTER_VALUE: IGameSearchFilterModel = {
        general: {
            name: null,
            availability: {
                date: null,
                from: null,
                to: null
            },
            location: null,
            statuses: [],
            tags: []
        },
        financial: {
            freeGame: null,
            payAmount: null
        },
        inventary: {
            shirtsCount: null,
            shirtsRequired: null
        }
    };
}