export class RequestGamePlayerAcceptModalLocalization {
    static get MODAL() {
        return {
            HEADER: {
                TITLE: $localize`:@@share.components.features.request.team.player.modals.request-team-player-accept.modal.header.title:Accept player request to team?`
            },
            BODY: {
                TEXT: $localize`:@@share.components.features.request.team.player.modals.request-team-player-accept.modal.body.text:Are you sure want to accept request to joining your team for`
            },
            FOOTER: {
                BUTTON: {
                    APPLY: $localize`:@@share.components.features.request.team.player.modals.request-team-player-accept.modal.footer.button.apply.text:Yes, accept`,
                    CANCEL: $localize`:@@core.no:No`
                }
            }
        }
    };

    static get NOTIFICATION() {
        return {
            ACCEPTED: {
                VALUE: $localize`:@@share.components.features.request.team.player.modals.request-team-player-accept.notification.canceled.value:Request to join team was accepted!`
            }
        }
    };
}