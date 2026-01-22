export class StatsTotalLocalization {
    static get AVERAGE() {
        return {
            LABEL: $localize`:@@share.components.stats.total.average.label:Total rating (percentage)`,
            DESCRIPTION: $localize`:@@share.components.stats.total.average.description:Average value from your stats`,
        }
    };

    static get TOTAL() {
        return {
            LABEL: $localize`:@@share.components.stats.total.total.label:Total rating (absolute value)`,
            DESCRIPTION: $localize`:@@share.components.stats.total.total.description:Sum of your all stats`,
        }
    };
}