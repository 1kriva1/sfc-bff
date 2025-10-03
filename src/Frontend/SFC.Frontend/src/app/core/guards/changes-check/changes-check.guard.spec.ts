import { RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { ChangesCheckGuard } from "./changes-check.guard";
import { ModalService } from "ngx-sfc-common";
import { IChangesCheck } from "./changes-check.model";
import { buildPath } from "../../utils";
import { TestBed } from "@angular/core/testing";
import { HomeRoute, WelcomeRoute } from "@share/enums";
import { ChangesCheckService } from "./changes-check.service";
import { CoreConstants } from "@core/constants";

describe('Core.Guard:ChangesCheck', () => {
    let modalSpy: jasmine.SpyObj<ModalService>;

    beforeEach(() => {
        modalSpy = jasmine.createSpyObj<ModalService>('Modal', ['open', 'close']);

        TestBed.configureTestingModule({
            providers: [
                { provide: ModalService, useValue: modalSpy }
            ]
        });
    });

    fit('Should allow deactivate when not dirty', (done) => {
        const component: IChangesCheck = {
            changesCheckService: {
                changes$: of({ discardChanges: false, dirty: false })
            } as ChangesCheckService
        };

        TestBed.runInInjectionContext(() =>
            ChangesCheckGuard(component, null!, null!, {} as RouterStateSnapshot) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeTrue();
                expect(modalSpy.open).not.toHaveBeenCalled();
                expect(modalSpy.close).not.toHaveBeenCalled();
                done();
            });
    });

    fit('Should allow deactivate when dirty, but can discardChanges', (done) => {
        const component: IChangesCheck = {
            changesCheckService: {
                changes$: of({ discardChanges: true, dirty: true })
            } as ChangesCheckService
        };

        TestBed.runInInjectionContext(() =>
            ChangesCheckGuard(component, null!, null!, {} as RouterStateSnapshot) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeTrue();
                expect(modalSpy.open).not.toHaveBeenCalled();
                expect(modalSpy.close).toHaveBeenCalledTimes(1);
                done();
            });
    });

    fit('Should allow deactivate when dirty and can not discardChanges, but route is allowed to discard', (done) => {
        const component: IChangesCheck = {
            changesCheckService: {
                changes$: of({ discardChanges: false, dirty: true })
            } as ChangesCheckService
        };

        TestBed.runInInjectionContext(() =>
            ChangesCheckGuard(component, null!, null!, { url: buildPath(WelcomeRoute.Welcome) } as RouterStateSnapshot) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeTrue();
                expect(modalSpy.open).not.toHaveBeenCalled();
                expect(modalSpy.close).toHaveBeenCalledTimes(1);
                done();
            });
    });

    fit('Should not allow deactivate', (done) => {
        const component: IChangesCheck = {
            changesCheckService: {
                changes$: of({ discardChanges: false, dirty: true })
            } as ChangesCheckService
        };

        TestBed.runInInjectionContext(() =>
            ChangesCheckGuard(component, null!, null!, { url: buildPath(HomeRoute.Home) } as RouterStateSnapshot) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeFalse();
                expect(modalSpy.open).toHaveBeenCalledOnceWith(CoreConstants.CHANGES_CHECK_MODAL_ID, buildPath(HomeRoute.Home));
                expect(modalSpy.close).not.toHaveBeenCalled();
                done();
            });
    });
});