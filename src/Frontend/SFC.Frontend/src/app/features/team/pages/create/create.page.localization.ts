export class CreatePageLocalization {
    static BUTTON_OK_LABEL = $localize`:@@core.action.ok:Ok`;
    static BUTTON_CANCEL_LABEL = $localize`:@@core.action.cancel:Cancel`;
    static BUTTON_CREATE_TEXT = $localize`:@@core.action.create:Create`;
    static BUTTON_UPDATE_TEXT = $localize`:@@core.action.update:Update`;
    static ERROR = {
        FETCH: $localize`:@@feature.player.search.page.error.fetch:Can't fetch players`
    };
    static TITLE = {
        CREATE: {
            LABEL: $localize`:@@feature.team.edit.page.title-create.label:Create team`,
            DESCRIPTION: $localize`:@@feature.team.edit.page.title-create.description:Please create team`,
            TOOLTIP: $localize`:@@feature.team.edit.page.title-create.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        },
        UPDATE: {
            LABEL: $localize`:@@feature.team.edit.page.title-update.label:Your team`,
            DESCRIPTION: $localize`:@@feature.team.edit.page.title-update.description:Here you can change your personal information`,
            TOOLTIP: $localize`:@@feature.team.edit.page.title-update.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        }
    };
    static ROUTER = {
        TITLE: {
            CREATE: $localize`:@@feature.team.edit.page.router.title.create:Create Team`,
            UPDATE: $localize`:@@feature.team.edit.page.router.title.update:Update Team`
        }
    };
    static INPUT = {
        LOGO: {
            LABEL: $localize`:@@feature.team.edit.page.logo-input.label:Logo`,
            HELPER_TEXT: $localize`:@@feature.team.edit.page.logo-input.placeholder:Please add your logo(emblem)`,
            VALIDATIONS: {
                INVALID_FORMAT: $localize`:@@core.validation.file-format:Invalid file format.`,
                MAX_SIZE_PART_1: $localize`:@@feature.team.edit.page.logo-input.validation.max-size-1:Max allowed size`,
                MAX_SIZE_PART_2: $localize`:@@feature.team.edit.page.logo-input.validation.max-size-2:your file size is`
            }
        }
    };
    static STARS_TOOLTIP = $localize`:@@feature.team.edit.page.stars.tooltip:This stars define your team stats rating as a sum of all players stats`;
    static VIEW_MODEL = {
        NAME: $localize`:@@core.name:Name`,
        CITY: $localize`:@@core.city:City`
    };
    static PROGRESS = {
        FILLED_LABEL: $localize`:@@feature.team.edit.page.progress.filled.label:Filled`,
        OF: $localize`:@@core.of: of`,
        FILLED: $localize`:@@feature.team.edit.page.progress.filled:fields are filled.`,
    };
}