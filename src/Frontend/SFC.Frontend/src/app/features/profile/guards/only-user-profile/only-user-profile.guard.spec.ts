import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { RoutKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { PlayerService } from "@share/services";
import { Observable } from "rxjs";
import { CanActivateOnlyUserProfile } from "./only-user-profile.guard";

describe('Features.Profile.Guard:CanActivateOnlyUserProfile', () => {
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

    fit('Should not allow access for not created profile', () => {
        (playerServiceStub as any).playerCreated = false;
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        const result = TestBed.runInInjectionContext(() =>
            CanActivateOnlyUserProfile(snapshot, null!) as Observable<boolean>);

        expect(result).toBeFalse();
    });

    fit('Should redirect to create profile page for not created profile', () => {
        (playerServiceStub as any).playerCreated = false;
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        TestBed.runInInjectionContext(() =>
            CanActivateOnlyUserProfile(snapshot, null!) as Observable<boolean>);

        expect(routerSpy.navigate)
            .toHaveBeenCalledWith([buildPath(`${RoutKey.Profiles}/${RoutKey.Create}`)]);
    });

    fit('Should redirect to player profile page, when player id is not provided', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return null };

        const result = TestBed.runInInjectionContext(() =>
            CanActivateOnlyUserProfile(snapshot, null!) as Observable<boolean>);

        expect(result).toBeFalse();
        expect(routerSpy.navigate)
            .toHaveBeenCalledWith([`${RoutKey.Profiles}/${playerServiceStub.playerId!.value}/${RoutKey.Edit}`]);
    });

    fit('Should redirect to correct player profile page, when player id is not match user player id', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '2' };

        const result = TestBed.runInInjectionContext(() =>
            CanActivateOnlyUserProfile(snapshot, null!) as Observable<boolean>);

        expect(result).toBeFalse();
        expect(routerSpy.navigate)
            .toHaveBeenCalledWith([`${RoutKey.Profiles}/${playerServiceStub.playerId!.value}/${RoutKey.Edit}`]);
    });

    fit('Should allow access', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        const result = TestBed.runInInjectionContext(() =>
            CanActivateOnlyUserProfile(snapshot, null!) as Observable<boolean>);

        expect(result).toBeTrue();
    });
});