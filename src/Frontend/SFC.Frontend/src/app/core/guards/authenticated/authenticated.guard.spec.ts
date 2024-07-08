import { Route, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { IdentityService } from "@share/services";
import { RoutKey } from "../../enums";
import { CanMatchOnlyAuthenticated } from "./authenticated.guard";
import { TestBed } from "@angular/core/testing";
import { buildPath } from "../../utils";

describe('Core.Guard:CanMatchAuthorized', () => {
    const dummyRoute = { path: '/home' } as Route;
    let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('Router', ['navigate']);
    let identityServiceStub: Partial<IdentityService> = {
        getIsAnonymous: () => of(true),
        authenticate: () => { }
    };

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: IdentityService, useValue: identityServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        });
    });

    fit('Should allow access for log in player', (done) => {
        identityServiceStub.getIsAuthenticated = () => of(true);

        TestBed.runInInjectionContext(() => CanMatchOnlyAuthenticated(dummyRoute, []) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeTrue();
                done();
            });
    });

    fit('Should disallow access and redirect to welcome page', (done) => {
        identityServiceStub.getIsAuthenticated = () => of(false);

        TestBed.runInInjectionContext(() => CanMatchOnlyAuthenticated(dummyRoute, []) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeFalse();
                expect(routerSpy.navigate).toHaveBeenCalledWith([buildPath(RoutKey.Welcome)]);
                done();
            });
    });

    fit('Should disallow access and start authenticate process', (done) => {
        spyOn(identityServiceStub, 'authenticate' as any);
        identityServiceStub.getIsAuthenticated = () => of(false);

        TestBed.runInInjectionContext(() => CanMatchOnlyAuthenticated(dummyRoute, []) as Observable<boolean>)
            .subscribe((result: boolean) => {
                expect(result).toBeFalse();
                expect(identityServiceStub.authenticate).toHaveBeenCalledTimes(1);
                done();
            });
    });
});