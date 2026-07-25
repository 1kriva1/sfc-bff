export class RequestGameTeamDeclineModalLocalization {
    static get MODAL() {
        return {
            HEADER: {
                TITLE: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.modal.header.title:Decline player request to team?`
            },
            BODY: {
                TEXT_PART_1: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.modal.body.text-part-1:Are you sure want to decline request from`,
                TEXT_PART_2: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.modal.body.text-part-2:to the team?`,
                INPUT: {
                    EXPLANATION: {
                        LABEL: $localize`:@@core.Explanation:Explanation`,
                        PLACEHOLDER: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.modal.body.input.explanation.placeholder:Please, explaine why`,
                        HELPER_TEXT: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.modal.body.input.explanation.helper-text:A few words about why you decline player request to join team`,
                    }
                }
            },
            FOOTER: {
                BUTTON: {
                    APPLY: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.modal.footer.button.apply.text:Yes, decline`,
                    CANCEL: $localize`:@@core.no:No`
                }
            }
        }
    };

    static get NOTIFICATION() {
        return {
            DECLINED: {
                VALUE: $localize`:@@share.components.features.request.team.player.modals.request-team-player-decline.notification.declined.value: Player request to join team was declined!`
            }
        }
    };
}