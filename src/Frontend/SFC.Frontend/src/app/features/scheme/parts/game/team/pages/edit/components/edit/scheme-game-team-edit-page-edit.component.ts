import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { SchemeGameTeamEditPageEditPart } from "./scheme-game-team-edit-page-edit-part.enum";
import { ISchemeGameTeamEditPageFormModel } from "../../models/scheme-game-team-edit-page-form.model";
import { ISchemeGameTeamEditPageModel } from "../../models/scheme-game-team-edit-page.model";
import { getDataFromRouteRecursively } from "@core/utils";
import { ActivatedRoute } from "@angular/router";
import { SchemeGameTeamConstants } from "../../../../constants/scheme-game-team.constants";

@Directive()
export abstract class SchemeGameTeamEditPageEditComponent<TFormValue extends ISchemeGameTeamEditPageFormModel, TResponse extends BaseErrorResponse> {

    // component
    SchemeGameTeamEditPageEditPart = SchemeGameTeamEditPageEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    public get model(): ISchemeGameTeamEditPageModel { return getDataFromRouteRecursively<ISchemeGameTeamEditPageModel>(this.route, SchemeGameTeamConstants.ResolveKey)!; };

    constructor(protected route: ActivatedRoute, protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}