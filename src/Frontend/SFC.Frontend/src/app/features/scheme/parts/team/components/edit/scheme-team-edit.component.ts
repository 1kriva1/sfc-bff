import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { EnumService } from "@share/services";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { Observable } from "rxjs";
import { getFormationControlChanges } from "../../utils/scheme-team-form.utils";
import { ISchemeTeamEditFormModel } from "./scheme-team-edit-form.model";
import { SchemeTeamEditPart } from "./scheme-team-edit-part.enum";

@Directive()
export abstract class SchemeTeamEditComponent<TFormValue extends ISchemeTeamEditFormModel, TResponse extends BaseErrorResponse> {

    SchemeTeamEditPart = SchemeTeamEditPart;

    protected get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    protected get formationChanges$(): Observable<IFormationEnumModel> {
        return getFormationControlChanges(this.controls, this.enumService.enums.formations);
    }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder, protected enumService: EnumService) { }
}