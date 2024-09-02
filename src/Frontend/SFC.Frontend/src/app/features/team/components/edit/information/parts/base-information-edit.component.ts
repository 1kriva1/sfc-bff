import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup } from "@angular/forms";
import { EditPagePart } from "../../edit-page-part.enum";

@Directive()
export abstract class BaseInformationEditComponent {

    protected get group(): FormGroup { return this.parent.form.get(EditPagePart.Information) as FormGroup; }

    constructor(
        protected parent: FormGroupDirective,
        protected formBuilder: FormBuilder
    ) { }
}