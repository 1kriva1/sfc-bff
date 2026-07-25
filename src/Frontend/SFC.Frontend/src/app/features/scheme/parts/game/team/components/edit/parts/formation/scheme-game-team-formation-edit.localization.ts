export class SchemeGameTeamFormationEditLocalization {
    static TITLE = {
        LABEL: $localize`:@@feature.game.general.components.edit.parts.final.title.label:Final step`,
        DESCRIPTION: $localize`:@@feature.game.general.components.edit.parts.final.title.description:Final step before game creation.`,
        TOOLTIP: $localize`:@@feature.game.general.components.edit.parts.final.title.tooltip:Please check all information before create new game`
    };

    static HEADER = {
        FORMATION: {
            TITLE: $localize`:@@feature.scheme.team.components.edit.formation.header.formation.title:Formation`
        }
    };

    static INPUT = {
        TYPE: {
            LABEL: $localize`:@@feature.scheme.team.components.edit.formation.input.type.label:Choose formation type`
        },
        FORMATION: {
            HELPER_TEXT: $localize`:@@feature.scheme.team.components.edit.formation.input.formation.helper-text:Choose scheme formation`
        }
    };

    static MODAL = {
        FORMATION_CHANGE: {
            TEXT: $localize`:@@feature.scheme.team.components.edit.formation.modal.formation-change.text:You have already had selected players for previous formation. Do you want to change formation?`,
            TITLE: $localize`:@@feature.scheme.team.components.edit.formation.modal.formation-change.title:Are you sure want to change formation?`,
            BUTTON: {
                APPLY: $localize`:@@feature.scheme.team.components.edit.formation.modal.formation-change.button.apply:Yes, change`
            }
        }
    };
}