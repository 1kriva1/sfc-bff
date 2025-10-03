import { FootballFilterConstants } from "../parts/football/football-filter.constants";
import { GeneralFilterConstants } from '../parts/general/general-filter.constants';
import { IPlayersFilterModel } from "../models";
import { StatsFilterConstants } from "../parts/stats/stats-filter.contants";

export class PlayersFiltersConstants {
    static SEARCH_DEBOUNCE_TIME: number = 1000;
    static DEFAULT_FILTER_MODEL: IPlayersFilterModel = {
        name: null,
        general: {
            availability: {
                days: null,
                from: null,
                to: null
            },
            city: null,
            freePlay: null,
            hasPhoto: null,
            tags: null,
            years: { from: GeneralFilterConstants.FROM_YEARS_DEFAULT, to: GeneralFilterConstants.TO_YEARS_DEFAULT }
        },
        football: {
            positions: null,
            workingFoot: null,
            gameStyles: null,
            physicalCondition: null,
            skill: null,
            height: { from: FootballFilterConstants.FROM_HEIGHT_DEFAULT, to: FootballFilterConstants.TO_HEIGHT_DEFAULT },
            weight: { from: FootballFilterConstants.FROM_WEIGHT_DEFAULT, to: FootballFilterConstants.TO_WEIGHT_DEFAULT }
        },
        stats: {
            total: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
            physical: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
            mental: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
            skill: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
            raiting: null
        }
    };
    static PLAYERS_FILTERS_MODAL_ID: string = 'players-filters'
}