export class InviteTeamPlayerCancelModalLocalization {
    static get MODAL() {
        return {
            HEADER: {
                TITLE: $localize`:@@share.components.features.invite.team.player.modals.invite-team-player-cancel.modal.header.title:Cancel player invitation to team?`
            },
            BODY: {
                TEXT: $localize`:@@share.components.features.invite.team.player.modals.invite-team-player-cancel.modal.body.text:Are you sure want to cancel invitation to joining your team for`
            },
            FOOTER: {
                BUTTON: {
                    APPLY: $localize`:@@share.components.features.invite.team.player.modals.invite-team-player-cancel.modal.footer.button.apply.text:Yes, cancel`,
                    CANCEL: $localize`:@@core.no:No`
                }
            }
        }
    };

    static get NOTIFICATION() {
        return {
            CANCELED: {
                VALUE: $localize`:@@share.components.features.invite.team.player.modals.invite-team-player-cancel.notification.canceled.value:Invite to join team was canceled!`
            }
        };
    }
}