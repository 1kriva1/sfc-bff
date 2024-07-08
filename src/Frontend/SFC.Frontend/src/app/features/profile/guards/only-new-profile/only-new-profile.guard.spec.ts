import { Route, Router } from "@angular/router";
import { CanMatchOnlyNewProfile } from "./only-new-profile.guard";
import { PlayerService } from "@share/services";
import { RoutKey } from "@core/enums";
import { TestBed } from "@angular/core/testing";

describe('Features.Profile.Guard:CanMatchOnlyNewProfile', () => {
    const dummyRoute = { path: `${RoutKey.Profiles}/2/${RoutKey.Edit}` } as Route;
    let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('Router', ['navigate']);
    let playerServiceStub: Partial<PlayerService> = {};

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: PlayerService, useValue: playerServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        });
    });

    fit('Should allow access for not created profile', () => {
        (playerServiceStub as any).playerCreated = false;

        const result: boolean = TestBed.runInInjectionContext(() =>
            CanMatchOnlyNewProfile(dummyRoute, []) as boolean);

        expect(result).toBeTrue();
    });

    fit('Should not allow access for already created profile', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };

        const result: boolean = TestBed.runInInjectionContext(() =>
            CanMatchOnlyNewProfile(dummyRoute, []) as boolean);

        expect(result).toBeFalse();
    });

    fit('Should redirect to already created profile page', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };

        const result: boolean = TestBed.runInInjectionContext(() =>
            CanMatchOnlyNewProfile(dummyRoute, []) as boolean);

        expect(result).toBeFalse();
        expect(routerSpy.navigate)
            .toHaveBeenCalledWith([`${RoutKey.Profiles}/${playerServiceStub.playerId!.value}/${RoutKey.Edit}`]);
    });
});