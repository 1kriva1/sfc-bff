export class AvailabilityFormLocalization {
    static get VALIDATION() {
        return {
            ALREADY_EXIST_PART_1: $localize`:@@share.validation.availability.part-1:You already have a scheduled time at`
        }
    };

    static get INPUT() {
        return {
            DAYS: {
                LABEL: $localize`:@@core.Days:Days`,
                HELPER_TEXT: $localize`:@@share.components.availability-edit.parts.form.input.days.helper-text:Choose available days of week`
            },
            FROM: {
                LABEL: $localize`:@@core.From:From`,
                PLACEHOLDER: $localize`:@@share.components.availability-edit.parts.form.input.from.placeholder:Choose from time`,
                HELPER_TEXT: $localize`:@@share.components.availability-edit.parts.form.input.from.helper-text:Choose available from time`
            },
            TO: {
                LABEL: $localize`:@@core.To:To`,
                PLACEHOLDER: $localize`:@@share.components.availability-edit.parts.form.input.to.placeholder:Choose to time`,
                HELPER_TEXT: $localize`:@@share.components.availability-edit.parts.form.input.to.helper-text:Choose available to time`
            }
        }
    };
}