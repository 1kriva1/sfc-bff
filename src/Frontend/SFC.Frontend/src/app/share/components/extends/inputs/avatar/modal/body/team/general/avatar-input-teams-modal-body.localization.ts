export class AvatarInputPlayersModalBodyLocalization {
    static get INPUT() {
        return {
            NAME: {
                PLACEHOLDER: $localize`:@@share.components.extends.inputs.avatar.modal.body.teams.input.name.placeholder:Type team name`
            }
        }
    };

    static get FILTERS() {
        return {
            GENERAL: $localize`:@@core.General:General`,
            FINANCIAL: $localize`:@@core.Financial:Financial`,
            INVENTARY: $localize`:@@core.Inventary:Inventary`
        }
    }
}