import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { SchemeGameTeamEditPart } from "./enums/scheme-game-team-edit-part.enum";
import { Observable, startWith } from "rxjs";
import { ISchemeGameTeamEditFormModel } from "./scheme-game-team-edit-form.model";
import { ISchemeGameTeamResolveModel } from "../../models/scheme-game-team-resolve.model";
import { getDataFromRouteRecursively } from "@core/utils";
import { SchemeGameTeamConstants } from "../../constants/scheme-game-team.constants";
import { ActivatedRoute } from "@angular/router";
import { empty } from "ngx-sfc-common";

@Directive()
export abstract class SchemeGameTeamEditComponent<TFormValue extends ISchemeGameTeamEditFormModel, TResponse extends BaseErrorResponse> {

    // component
    SchemeGameTeamEditPart = SchemeGameTeamEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    public get model(): ISchemeGameTeamResolveModel | empty { return getDataFromRouteRecursively<ISchemeGameTeamResolveModel>(this.route, SchemeGameTeamConstants.ResolveKey)!; };

    constructor(protected route: ActivatedRoute, protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}