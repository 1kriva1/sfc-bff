export class InviteTeamPlayerMainEditLocalization {
    static TITLE = {
        LABEL: $localize`:@@feature.invite.team.player.components.edit.parts.main.title.label:Team player invite`,
        DESCRIPTION: $localize`:@@feature.invite.team.player.components.edit.parts.main.title.description:Choose player and fill other required fields.`
    };

    static INPUT = {
        PLAYER: {
            LABEL: $localize`:@@feature.invite.team.player.components.edit.parts.main.input.player.label:Player for inviting to team`,
            HELPER_TEXT: $localize`:@@feature.invite.team.player.components.edit.parts.main.input.player.helper-text:Choose player for your invitation`,
            VALIDATION: {
                PLAYER_ALREADY_IN_TEAM: $localize`:@@feature.invite.team.player.components.edit.parts.main.input.player.validation.already-in-team:Player already part of the team.`,
                PLAYER_ALREADY_HAD_ACTIVE_TEAM_INVITE: $localize`:@@feature.invite.team.player.components.edit.parts.main.input.player.validation.player-already-had-active-team-invite:Player already had active invite from team.`
            }
        },
        TEAM: {
            LABEL: $localize`:@@feature.invite.team.player.components.edit.parts.main.input.team.label:Team for inviting to player`,
            HELPER_TEXT: $localize`:@@feature.invite.team.player.components.edit.parts.main.input.team.helper-text:Choose team where player will be invited`,
        }
    };

    static ACTION = {
        CANCEL: $localize`:@@feature.invite.team.player.components.edit.parts.main.action.cancel:Cancel invite` 
    }
}