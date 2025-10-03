export class TeamPlayerRemoveModalLocalization {
    static MODAL = {
        HEADER: {
            TITLE: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.modal.header.title:Remove player from team?`
        },
        BODY: {
            TEXT_PART_1: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.modal.body.text-part-1:Are you sure want to remove`,
            TEXT_PART_2: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.modal.body.text-part-2:from the team?`,
            INPUT: {
                EXPLANATION: {
                    LABEL: $localize`:@@core.Explanation:Explanation`,
                    PLACEHOLDER: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.modal.body.input.explanation.placeholder:Please, explaine why`,
                    HELPER_TEXT: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.modal.body.input.explanation.helper-text:A few words about why you remove this player from team`,
                }
            }
        },
        FOOTER: {
            BUTTON: {
                APPLY: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.modal.footer.button.apply.text:Yes, remove`,
                CANCEL: $localize`:@@core.no:No`
            }
        }
    };

    static NOTIFICATION = {
        REMOVED: {
            VALUE: $localize`:@@feature.team.general.pages.edit.components.modals.team-player-remove.notification.removed.value:Player was removed from the team and will get notification about this!`
        }
    };
}