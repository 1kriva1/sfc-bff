import { Route, Router } from "@angular/router";
import { CanMatchOnlyNewProfile } from "./only-new-profile.guard";
import { PlayerViewService } from "@share/services";
import { RouteKey } from "@core/enums";
import { TestBed } from "@angular/core/testing";
import { ProfileRoute } from "@share/enums";

describe('Features.Profile.Guard:CanMatchOnlyNewProfile', () => {
    const dummyRoute = { path: `${ProfileRoute.Profiles}/2/${RouteKey.Edit}` } as Route;
    let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('Router', ['navigate']);
    let playerViewServiceStub: Partial<PlayerViewService> = {};

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: PlayerViewService, useValue: playerViewServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        });
    });

    fit('Should allow access for not created profile', () => {
        (playerViewServiceStub as any).playerCreated = false;

        const result: boolean = TestBed.runInInjectionContext(() =>
            CanMatchOnlyNewProfile(dummyRoute, []) as boolean);

        expect(result).toBeTrue();
    });

    fit('Should not allow access for already created profile', () => {
        (playerViewServiceStub as any).playerCreated = true;
        (playerViewServiceStub as any).playerId = { value: 1 };

        const result: boolean = TestBed.runInInjectionContext(() =>
            CanMatchOnlyNewProfile(dummyRoute, []) as boolean);

        expect(result).toBeFalse();
    });

    fit('Should redirect to already created profile page', () => {
        (playerViewServiceStub as any).playerCreated = true;
        (playerViewServiceStub as any).playerId = { value: 1 };

        const result: boolean = TestBed.runInInjectionContext(() =>
            CanMatchOnlyNewProfile(dummyRoute, []) as boolean);

        expect(result).toBeFalse();
        expect(routerSpy.navigate)
            .toHaveBeenCalledWith([`${ProfileRoute.Profiles}/${playerViewServiceStub.playerId!.value}/${RouteKey.Edit}`]);
    });
});