export class GameRowLocalization {   
    static COLUMN = {
        DATE_TIME: {
            TIME: $localize`:@@core.time:time`,
            DATE: $localize`:@@core.date:date`,
            FROM: $localize`:@@core.from:From`,
            TO: $localize`:@@core.to:To`
        },
        ACTIONS: {
            PLAY_REQUEST: $localize`:@@feature.player.view.page.part.games.table.row.action.play-request:Send request to play`,
            PLAY_TEAM_REQUEST: $localize`:@@feature.player.view.page.part.games.table.row.action.play-team-request:Send request to play as team`,
            OPEN_GAME: $localize`:@@feature.player.view.page.part.games.table.row.action.open-game:Open game`,
        }
    };
}