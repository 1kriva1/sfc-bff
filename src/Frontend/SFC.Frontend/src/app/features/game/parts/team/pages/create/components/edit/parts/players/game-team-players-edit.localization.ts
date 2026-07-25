export class GameTeamPlayersEditLocalization {
    static TITLE = {
        LABEL: $localize`:@@feature.game.general.components.edit.parts.teams.title.label:Teams for game creation`,
        DESCRIPTION: $localize`:@@feature.game.general.components.edit.parts.teams.title.description:Here you can choose teams which will be oponents in game.`,
        TOOLTIP: $localize`:@@feature.game.general.components.edit.parts.teams.title.tooltip:After game creation these teams will receive invites and can accept them`
    };

    static INPUT = {
        TEAM: {
            A: {
                LABEL: $localize`:@@feature.game.general.components.edit.parts.teams.input.team.a.label:Team A`,
                HELPER_TEXT: $localize`:@@feature.game.general.components.edit.parts.teams.input.team.a.helper-text:Choose first team for this game.`,
            },
            B: {
                LABEL: $localize`:@@feature.game.general.components.edit.parts.teams.input.team.b.label:Team B`,
                HELPER_TEXT: $localize`:@@feature.game.general.components.edit.parts.teams.input.team.b.helper-text:Choose second team for this game.`,
            }
        }
    };

    static TIP = $localize`:@@feature.game.general.components.edit.parts.teams.tip:You can skip team selection for now. And proceed with this after game
                    will be created. If you choose teams now, than they will receive invites and
                    can accept or decline it.`;
}