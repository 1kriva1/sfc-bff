export class TeamViewStatisticPlayersLocalization {
    static PANEL = {
        TOTALS: {
            LABEL: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.totals.label:Totals`,
            DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.totals.description:Information about players count in team (all the time and active).`,
            TOOLTIP: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.totals.tooltip:Total count of team players and only active players`
        },
        STATUSES: {
            LABEL: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.statuses.label:Statuses`,
            DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.statuses.description:Information about team players statuses grouped by month period.`,
            TOOLTIP: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.statuses.tooltip:How many players with different status were in team every month`
        },
        POSITIONS: {
            LABEL: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.positions.label:Positions`,
            DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.positions.description:Information about team players positions.`,
            TOOLTIP: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.positions.tooltip:How many players with different positions`
        },
        TOP: {
            LABEL: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.top.label:Top`,
            DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.top.description:Information about team players top statistic (games, goals, assists and more).`,
            TOOLTIP: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.panel.top.tooltip:Describe who is the most team player`
        }
    };

    static PROGRESS = {
        TOTAL: {
            ALL: {
                LABEL: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.progress.total.all.label: Total players in team`,
                DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.progress.total.all.description: All team players count, no matter what status they have now.`
            },
            ACTIVE: {
                LABEL: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.progress.total.active.label: Active players in team`,
                DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.progress.total.active.description: All active team players count in current period of time.`
            }
        }
    };

    static CHART = {
        STATUSES: {
            DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.chart.statuses.description:This chart describe how many players with such status currently in team.`
        },
        POSITIONS: {
            DESCRIPTION: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.chart.positions.description:This chart describe how many players with such position currently in team.`
        }
    };

    static INPUT = {
        ACTIVITY: {
            HELPER_TEXT: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.input.activity.helper-text:Choose activity`
        }
    };

    static ACTIVITY = {
        GAMES: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.activity.games:Games`,
        GOALS: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.activity.goals:Goals`,
        ASSISTS: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.activity.assists:Assists`,
        YELLOW_CARDS: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.activity.yellow-cards:Yellow cards`,
        RED_CARDS: $localize`:@@feature.team.general.pages.view.components.statistic.part.players.activity.red-cards:Red cards`
    };
}