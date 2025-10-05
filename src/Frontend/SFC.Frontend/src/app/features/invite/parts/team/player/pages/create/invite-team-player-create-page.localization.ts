export class InviteTeamPlayerCreatePageLocalization {
    static ROUTE = {
        TITLE: $localize`:@@feature.invite.team.player.pages.create.route.title:Team player invite creation`
    };

    static TITLE = {
        LABEL: $localize`:@@feature.invite.team.player.pages.create.title.label:Create new team player invite`,
        DESCRIPTION: $localize`:@@feature.invite.team.player.pages.create.title.description:At this page you can create new invite to join team for player.`,
        TOOLTIP: $localize`:@@feature.invite.team.player.pages.create.title.tooltip:This step not required a lot of inputs. Just choose player and describe your invitation.`
    };

    static MENU = {
        TITLE: $localize`:@@core.menu:Menu`,
        ITEMS: {
            PROFILE: $localize`:@@core.Profile:Profile`,
            GENERAL: $localize`:@@core.General:General`,
            FOOTBALL: $localize`:@@core.Football:Football`
        }
    };

    static NOTIFICATION = {
        CREATED: {
            TITLE: $localize`:@@feature.invite.team.player.pages.create.notification.created.title:Team player invite successfully created!`,
            VALUE: $localize`:@@feature.invite.team.player.pages.create.notification.created.value:If player accept your invitation, he/she will join your team.`
        }
    };
}