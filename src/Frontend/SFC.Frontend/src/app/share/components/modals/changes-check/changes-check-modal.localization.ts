export class ChangesCheckModalLocalization {
    static get BUTTONS(): any {
        return {
            NO: $localize`:@@core.no:No`,
            YES_DISCARD_CHANGES: $localize`:@@core.action.discard-changes:Yes, discard changes`
        }
    };
    static get TITLE(): string { return $localize`:@@core.unsaved-changes:Unsaved changes!`; }
    static get LABEL(): string { return $localize`:@@share.components.modals.changes-check.text:Are you sure what leave page without save changes?`; }
}