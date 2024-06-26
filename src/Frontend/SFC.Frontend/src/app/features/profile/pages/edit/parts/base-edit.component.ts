import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup } from "@angular/forms";

@Directive()
export abstract class BaseEditComponent {

    protected get form(): FormGroup { return this.parent.form; }

    constructor(
        protected parent: FormGroupDirective,
        protected formBuilder: FormBuilder
    ) { }
}