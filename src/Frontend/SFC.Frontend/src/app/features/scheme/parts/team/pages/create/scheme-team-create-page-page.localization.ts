export class SchemeTeamCreatePageLocalization {
    static ROUTE = {
        TITLE: $localize`:@@feature.scheme.team.pages.create.route.title:Team scheme creation`
    };

    static TITLE = {
        LABEL: $localize`:@@feature.scheme.team.pages.create.title.label:Create new team scheme`,
        DESCRIPTION: $localize`:@@feature.scheme.team.pages.create.title.description:At this page you can create new scheme for team.`,
        TOOLTIP: $localize`:@@feature.scheme.team.pages.create.title.tooltip:This step not required a lot of inputs. Just type name of schema and set up formation.`
    };

    static MENU = {
        TITLE: $localize`:@@core.menu:Menu`,
        ITEMS: {
            PROFILE: $localize`:@@core.Profile:Profile`,
            GENERAL: $localize`:@@core.General:General`,
            FORMATION: $localize`:@@core.Formation:Formation`
        }
    };

    static NOTIFICATION = {
        CREATED: {
            TITLE: $localize`:@@feature.scheme.team.pages.create.notification.created.title:Team scheme successfully created!`,
            VALUE: $localize`:@@feature.scheme.team.pages.create.notification.created.value:Now you can use created scheme in games.`
        }
    };
}