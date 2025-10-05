import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { empty, isEqual } from "ngx-sfc-common";
import { EMPTY, map, Observable, startWith } from "rxjs";
import { IChangesCheckGuardModel } from "./changes-check.model";

@Injectable({
    providedIn: 'root'
})
export class ChangesCheckService {

    private _discard: boolean = false;

    private _previousValue: any | empty = null;

    public changes$: Observable<IChangesCheckGuardModel> = EMPTY;

    public init(form: FormGroup): void {
        this.set(form);

        this.changes$ = form.valueChanges.pipe(
            startWith(form.value),
            map(_ => {
                const isChanged: boolean = !isEqual(this._previousValue, form.value);
                return { dirty: isChanged, discardChanges: this._discard }
            })
        );
    }

    public set(form: FormGroup): void {
        this._previousValue = structuredClone(form.value);
        this._discard = false;
        form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }

    public discard(): void { this._discard = true; }

    public refresh(): void { this._discard = false; }
}