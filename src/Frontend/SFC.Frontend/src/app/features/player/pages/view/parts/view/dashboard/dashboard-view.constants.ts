import { ChartOptionModel } from "ngx-sfc-components";

export class DashboardViewConstants {
    static COLORS = {
        GAMES: '#4a89dc',
        GOALS: '#2bbbad',
        ASSISTS: '#967adc',
        RED_CARDS: '#da4453',
        YELLOW_CARDS: '#fcbb42',
        PENALTIES: '#d770ad',
        MVP: '#8cc152',
        CLEAM_SHEETS: '#e9573f',
        FREE_KICKS: '#3bafda',
        TEAMS: '#8cc152',
        POSITIONS: {
            GOALKEEPER: '#ed5565',
            DEFENDER: '#967adc',
            MIDFIELDER: '#37bc9b',
            FORWARD: '#3bafda'
        }
    };

    static CHART_OPTION_MODEL: ChartOptionModel = { defaultColors: false }
}