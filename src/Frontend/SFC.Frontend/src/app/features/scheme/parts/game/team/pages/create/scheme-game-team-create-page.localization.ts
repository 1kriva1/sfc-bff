export class SchemeGameTeamCreatePageLocalization {
    static ROUTE = {
        TITLE: $localize`:@@feature.game.general.pages.create.route.title:Game creation`
    };

    static PROGRESS = {
        STEP: {
            GENERAL: {
                NAME: $localize`:@@core.General:General`
            },
            FORMATION: {
                NAME: $localize`:@@core.Formation:Formation`
            },
            FINAL: {
                NAME: $localize`:@@core.Final:Final`,
                ACTION: {
                    NEXT: {
                        TEXT: $localize`:@@feature.game.general.pages.create.progress.step.final.action.next.text:Create scheme`
                    }
                }
            }
        }
    };

    static NOTIFICATION = {
        CREATED: {
            TITLE: $localize`:@@feature.game.general.pages.create.notification.created.title:Game successfully created!`,
            VALUE: $localize`:@@feature.game.general.pages.create.notification.created.value:You are ready for game.`
        }
    };
}