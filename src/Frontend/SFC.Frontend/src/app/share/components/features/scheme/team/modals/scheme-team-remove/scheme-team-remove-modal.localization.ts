export class SchemeTeamRemoveModalLocalization {
    static get MODAL() {
        return {
            HEADER: {
                TITLE: $localize`:@@share.components.features.scheme.team.modals.scheme-team-remove.modal.header.title:Remove team scheme?`
            },
            BODY: {
                TEXT: $localize`:@@share.components.features.scheme.team.modals.scheme-team-remove.modal.body.text:Are you sure want to remove team scheme`
            },
            FOOTER: {
                BUTTON: {
                    APPLY: $localize`:@@share.components.features.scheme.team.modals.scheme-team-remove.modal.footer.button.apply.text:Yes, remove`,
                    CANCEL: $localize`:@@core.no:No`
                }
            }
        }
    };

    static get NOTIFICATION() {
        return {
            REMOVED: {
                VALUE: $localize`:@@share.components.features.scheme.team.modals.scheme-team-remove.notification.canceled.value:Team scheme was removed!`
            }
        }
    };
}