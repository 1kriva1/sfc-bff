import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup } from "@angular/forms";
import { PlayersFilterPart } from "../enums/players-filter-part.enum";

@Directive()
export abstract class BaseFilterComponent {

    // component
    PlayersFilterPart = PlayersFilterPart;

    protected get form(): FormGroup { return this.parent.form; }

    constructor(
        protected parent: FormGroupDirective,
        protected formBuilder: FormBuilder
    ) { }
}