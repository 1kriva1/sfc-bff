export class AvatarInputTeamPlayersModalBodyLocalization {
    static get INPUT() {
        return {
            NAME: {
                PLACEHOLDER: $localize`:@@share.components.extends.inputs.avatar.modal.body.team.player.input.name.placeholder:Type player name`
            },
            STATUSES: {
                HELPER_TEXT: $localize`:@@share.components.extends.inputs.avatar.modal.body.team.player.input.statuses.helper-text:Choose player's status in team`
            }
        }
    };

    static get FILTERS() {
        return {
            GENERAL: $localize`:@@core.General:General`,
            FOOTBALL: $localize`:@@core.Football:Football`,
            STATS: $localize`:@@core.Stats:Stats`
        }
    }
}