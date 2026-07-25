export class InviteGamePlayerCancelModalLocalization {
    static get MODAL() {
        return {
            HEADER: {
                TITLE: $localize`:@@share.components.features.invite.game.player.modals.invite-game-player-cancel.modal.header.title:Cancel player invitation to game?`
            },
            BODY: {
                TEXT: $localize`:@@share.components.features.invite.game.player.modals.invite-game-player-cancel.modal.body.text:Are you sure want to cancel invitation to joining your game for`
            },
            FOOTER: {
                BUTTON: {
                    APPLY: $localize`:@@share.components.features.invite.game.player.modals.invite-game-player-cancel.modal.footer.button.apply.text:Yes, cancel`,
                    CANCEL: $localize`:@@core.no:No`
                }
            }
        }
    };

    static get NOTIFICATION() {
        return {
            CANCELED: {
                VALUE: $localize`:@@share.components.features.invite.game.player.modals.invite-game-player-cancel.notification.canceled.value:Invite to join game was canceled!`
            }
        };
    }
}