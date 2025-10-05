export class TeamCreatePageLocalization {
    static ROUTE = {
        TITLE: $localize`:@@feature.team.general.pages.create.route.title:Team creation`
    };

    static TITLE = {
        LABEL: $localize`:@@feature.team.general.pages.create.title.label:Create new team`,
        DESCRIPTION: $localize`:@@feature.team.general.pages.create.title.description:At this page you can create your own football team.`,
        TOOLTIP: $localize`:@@feature.team.general.pages.create.title.tooltip:Start creating your own football team. If you can organize matches and tournaments with this team.`
    };

    static MENU = {
        TITLE: $localize`:@@core.menu:Menu`,
        ITEMS: {
            PROFILE: $localize`:@@core.Profile:Profile`,
            GENERAL: $localize`:@@core.General:General`,
            AVAILABILITY: $localize`:@@core.Availability:Availability`,
            FINANCIAL: $localize`:@@core.financial:Financial`,
            PLAYERS: $localize`:@@core.Players:Players`,
            INVITES: $localize`:@@core.Invites:Invites`
        }
    };

    static PREVIEW = {
        TITLE: $localize`:@@feature.team.general.pages.create.preview.title:Team player invites`,
        DESCRIPTION: $localize`:@@feature.team.general.pages.create.preview.description:Information about team player invites.`
    };

    static MODAL = {
        CANCEL_INVITE: {
            TEXT: $localize`:@@feature.team.general.pages.create.modal.cancel-invite.text:Are you sure want to cancel invitation to joining your team?`,
            TITLE: $localize`:@@feature.team.general.pages.create.modal.cancel-invite.title:Cancel player invitation to team?`,
            BUTTON: {
                APPLY: $localize`:@@feature.team.general.pages.create.modal.cancel-invite.button.apply:Yes, cancel`
            }
        }
    };

    static NOTIFICATION = {
        CREATED: {
            TITLE: $localize`:@@feature.team.general.pages.create.notification.created.title:Team successfully created!`,
            VALUE: $localize`:@@feature.team.general.pages.create.notification.created.value:You are ready for football.`
        }
    };
}