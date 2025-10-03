import { discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { IResolverModel } from "@core/models";
import { buildPath } from "@core/utils";
import { HomeRoute } from "@share/enums";
import { EnumService } from "@share/services";
import { ENUM_SERVICE } from "@test/stubs";
import { LoaderService } from "ngx-sfc-common";
import { EMPTY, finalize, Observable, of, throwError } from "rxjs";
import { IGetPlayerModel } from "../../../services/player/models";
import { PlayerService } from "../../../services/player/player.service";
import { IProfileModel } from "../mapper/models";
import { EditPageResolver } from "./edit.page.resolver";

describe('Features.Profile.Page:Edit.Resolver', () => {
    let routerSpy: jasmine.SpyObj<Router>;
    let playerServiceStub: Partial<PlayerService> = {
        get: (_: number) => {
            return of({
                Success: true,
                Errors: null,
                Player: getPlayerModel(),
                Message: 'Success'
            })
        }
    };
    let loaderServiceStub: Partial<LoaderService> = {
        show: (_id?: string, _register?: boolean) => { return null; },
        hide: () => { }
    };

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: PlayerService, useValue: playerServiceStub },
                { provide: Router, useValue: routerSpy },
                { provide: LoaderService, useValue: loaderServiceStub },
                { provide: EnumService, useValue: ENUM_SERVICE }
            ]
        });
    });

    fit('Should not load player profile', () => {
        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '' };

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        expect(result$).toEqual(EMPTY);
    });

    fit('Should show loader on profile fetch', fakeAsync(() => {
        spyOn(loaderServiceStub, 'show' as any);

        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.subscribe((_: IResolverModel<IProfileModel>) =>
            expect(loaderServiceStub.show).toHaveBeenCalledTimes(1));
    }));

    fit('Should hide loader on profile fetch finalize', fakeAsync(() => {
        spyOn(loaderServiceStub, 'hide' as any);

        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.pipe(
            finalize(() => expect(loaderServiceStub.hide).toHaveBeenCalledTimes(1))
        ).subscribe();
    }));

    fit('Should call player get', fakeAsync(() => {
        spyOn(playerServiceStub, 'get' as any).and.callThrough();

        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.subscribe((_: IResolverModel<IProfileModel>) =>
            expect(playerServiceStub.get).toHaveBeenCalledOnceWith(1));
    }));

    fit('Should return profile model', fakeAsync(() => {
        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.subscribe((model: IResolverModel<IProfileModel>) => {
            expect(model.success).toBeTrue();
            expect(model.result).toBeDefined();
            expect(model.result?.general.firstName).toEqual('First name');
        });
    }));

    fit('Should return empty profile on error', fakeAsync(() => {
        (playerServiceStub as any).get = () => throwError(() => new Error('Test error'));

        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.subscribe((model: IResolverModel<IProfileModel>) => {
            expect(model.success).toBeFalse();
            expect(model.result).toBeNull();
        });

        flush();
    }));

    fit('Should return empty profile on failed result', fakeAsync(() => {
        (playerServiceStub as any).get = () => {
            return of({
                Success: false,
                Errors: null,
                Player: null,
                Message: 'Failed'
            })
        }

        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.subscribe((model: IResolverModel<IProfileModel>) => {
            expect(model.success).toBeFalse();
            expect(model.result).toBeNull();
        });

        flush();
    }));

    fit('Should navigate to home page on error', fakeAsync(() => {
        (playerServiceStub as any).get = () => throwError(() => new Error('Test error'));

        const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot(),
            routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
        activatedRouteSnapshot.paramMap.get = () => { return '1' };

        tick();

        const result$: Observable<IResolverModel<IProfileModel>> = TestBed.runInInjectionContext(() =>
            EditPageResolver(activatedRouteSnapshot, routerStateSnapshot)
        ) as Observable<IResolverModel<IProfileModel>>;

        result$.subscribe((_: IResolverModel<IProfileModel>) =>
            expect(routerSpy.navigate).toHaveBeenCalledOnceWith([buildPath(HomeRoute.Home)]));

        flush();
    }));

    function getPlayerModel(): IGetPlayerModel {
        return {
            Id: 1,
            Profile: {
                General: {
                    Photo: null,
                    FirstName: 'First name',
                    LastName: 'Last name',
                    Biography: null,
                    Birthday: null,
                    City: 'City',
                    Tags: null,
                    FreePlay: false,
                    Availability: {
                        From: null,
                        To: null,
                        Days: null
                    }
                },
                Football: {
                    Height: null,
                    Weight: null,
                    Position: null,
                    AdditionalPosition: null,
                    WorkingFoot: null,
                    Number: null,
                    GameStyle: null,
                    Skill: null,
                    WeakFoot: null,
                    PhysicalCondition: null,
                }
            },
            Stats: {
                Points: {
                    Available: 2,
                    Used: 1
                },
                Values: [{ Type: 0, Value: 50 }]
            }
        }
    }
});