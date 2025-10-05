export class AvatarInputPlayersModalBodyLocalization {
    static get INPUT() {
        return {
            NAME: {
                PLACEHOLDER: $localize`:@@share.components.extends.inputs.avatar.modal.body.players.input.name.placeholder:Type player name`
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