import { Route, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { IdentityService } from "@share/services";
import { RoutKey } from "../../enums";
import { CanMatchOnlyAnonymous } from "./anonymous.guard";
import { buildPath } from "../../utils";
import { TestBed } from "@angular/core/testing";

describe('Core.Guard:CanMatchOnlyAnonymous', () => {
    const dummyRoute = { path: '/home' } as Route;
    let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('Router', ['navigate']);
    let identityServiceStub: Partial<IdentityService> = { getIsAnonymous: () => of(true) };

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: IdentityService, useValue: identityServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        });
    });

    fit('Should allow access for not log in player', (done) => {
        identityServiceStub.getIsAnonymous = () => of(true);

        TestBed.runInInjectionContext(() => CanMatchOnlyAnonymous(dummyRoute, []) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeTrue();
                done();
            });
    });

    fit('Should disallow access and redirect to home page when player is log in', (done) => {
        identityServiceStub.getIsAnonymous = () => of(false);

        TestBed.runInInjectionContext(() => CanMatchOnlyAnonymous(dummyRoute, []) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeFalse();
                expect(routerSpy.navigate).toHaveBeenCalledWith([buildPath(RoutKey.Home)]);
                done();
            });
    });
});