export class SchemeTeamEditPageLocalization {
    static ROUTE = {
        TITLE: $localize`:@@feature.scheme.team.pages.edit.route.title:Team scheme edit`
    };

    static TITLE = {
        LABEL: $localize`:@@feature.scheme.team.pages.edit.title.label:Update team scheme`,
        DESCRIPTION: $localize`:@@feature.scheme.team.pages.edit.title.description:At this page you can update scheme for team.`,
        TOOLTIP: $localize`:@@feature.scheme.team.pages.edit.title.tooltip:This step not required a lot of inputs. Just type name of schema and set up formation.`
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
        UPDATED: {
            TITLE: $localize`:@@feature.scheme.team.pages.edit.notification.updated.title:Team scheme successfully updated!`,
            VALUE: $localize`:@@feature.scheme.team.pages.edit.notification.updated.value:Now you can use updated scheme in games.`
        }
    };

    static CHANGES_MODAL_LABEL = $localize`:@@feature.scheme.team.pages.edit.changes-modal.text:Are you sure what leave page without save team scheme changes?`
}