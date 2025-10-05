import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivateFn } from '@angular/router';
import { switchMap, of, Observable } from 'rxjs';
import { hasItem, isDefined, ModalService } from 'ngx-sfc-common';
import { buildPath } from '../../utils';
import { CoreConstants } from '../../constants';
import { IChangesCheck, IChangesCheckGuardModel } from './changes-check.model';
import { WelcomeRoute } from '@share/enums';
import { ChangesCheckService } from './changes-check.service';

@Injectable({
    providedIn: 'root'
})
class ChangesCheckGuardService {

    private readonly ALLOWED_ROUTES_WITHOUT_CHECK: string[] = [buildPath(WelcomeRoute.Welcome)]

    constructor(private changesCheckService: ChangesCheckService, private modalService: ModalService) { }

    public canDeactivate(component: IChangesCheck, nextState: RouterStateSnapshot): Observable<boolean> {
        if (!isDefined(component)) {
            console.error('Page does not implements IChangesCheck interface.')
        }

        return component.changesCheckService.changes$.pipe(
            switchMap((model: IChangesCheckGuardModel) => {
                if (model.discardChanges || hasItem(this.ALLOWED_ROUTES_WITHOUT_CHECK, nextState.url)) {
                    this.modalService.close(CoreConstants.CHANGES_CHECK_MODAL_ID);
                    this.changesCheckService.refresh();
                    return of(true);
                }

                if (model.dirty) {
                    this.modalService.open(CoreConstants.CHANGES_CHECK_MODAL_ID, nextState.url);
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
    inject(ChangesCheckGuardService).canDeactivate(component, nextState);
