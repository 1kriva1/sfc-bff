import { RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { ChangesCheckGuard } from "./changes-check.guard";
import { ModalService } from "ngx-sfc-common";
import { IChangesCheck } from "./changes-check.model";
import { buildPath } from "../../utils";
import { RoutKey } from "../../enums";
import { TestBed } from "@angular/core/testing";

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
            guardChanges$: of({
                discardChanges: false,
                dirty: false
            })
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
            guardChanges$: of({
                discardChanges: true,
                dirty: true
            })
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
            guardChanges$: of({
                discardChanges: false,
                dirty: true
            })
        };

        TestBed.runInInjectionContext(() =>
            ChangesCheckGuard(component, null!, null!, { url: buildPath(RoutKey.Welcome) } as RouterStateSnapshot) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeTrue();
                expect(modalSpy.open).not.toHaveBeenCalled();
                expect(modalSpy.close).toHaveBeenCalledTimes(1);
                done();
            });
    });

    fit('Should not allow deactivate', (done) => {
        const component: IChangesCheck = {
            guardChanges$: of({
                discardChanges: false,
                dirty: true
            })
        };

        TestBed.runInInjectionContext(() =>
            ChangesCheckGuard(component, null!, null!, { url: buildPath(RoutKey.Home) } as RouterStateSnapshot) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeFalse();
                expect(modalSpy.open).toHaveBeenCalledOnceWith(buildPath(RoutKey.Home));
                expect(modalSpy.close).not.toHaveBeenCalled();
                done();
            });
    });
});