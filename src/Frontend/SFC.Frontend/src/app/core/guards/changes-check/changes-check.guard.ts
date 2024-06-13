import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivateFn } from '@angular/router';
import { hasItem, ModalService } from 'ngx-sfc-common';
import { switchMap, of, Observable } from 'rxjs';
import { RoutKey } from '../../enums';
import { buildPath } from '../../utils';
import { IChangesCheck, IChangesCheckGuardModel } from './changes-check.model';

@Injectable({
    providedIn: 'root'
})
class ChangesCheckService {

    private readonly ALLOWED_ROUTES_WITHOUT_CHECK: string[] = [buildPath(RoutKey.Welcome)]

    constructor(private modalService: ModalService) { }

    public canDeactivate(component: IChangesCheck, nextState: RouterStateSnapshot): Observable<boolean> {
        return component?.guardChanges$.pipe(
            switchMap((model: IChangesCheckGuardModel) => {
                if (model.discardChanges || hasItem(this.ALLOWED_ROUTES_WITHOUT_CHECK, nextState.url)) {
                    this.modalService.close();
                    return of(true);
                }

                if (model.dirty) {
                    this.modalService.open(nextState.url);
                    return of(false);
                }

                return of(true);
            }));
    }
}

export const ChangesCheckGuard: CanDeactivateFn<IChangesCheck> = (
    component: IChangesCheck,
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot,
    nextState: RouterStateSnapshot): Observable<boolean> =>
    inject(ChangesCheckService).canDeactivate(component, nextState);
