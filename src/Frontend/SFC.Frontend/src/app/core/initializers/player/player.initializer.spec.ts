import { EMPTY, Observable, of, throwError } from "rxjs";
import { PlayerInitializer } from "./player.initializer";
import {
    IGetPlayerByUserResponse,
    PlayerService,
    IdentityService
} from "@share/services";

describe('Core.Initializer:Player', () => {
    let initializer: PlayerInitializer;
    let identityServiceStub: Partial<IdentityService> = {
        logout: () => of(undefined)
    };
    let playerServiceStub: Partial<PlayerService> = {};

    beforeEach(() => {
        initializer = new PlayerInitializer(
            identityServiceStub as IdentityService,
            playerServiceStub as PlayerService);
    });

    fit('Should return empty observable', () => {
        identityServiceStub.getIsAuthenticated = () => of(false);

        const result: Observable<any> = initializer.init();

        expect(result).not.toBeNull();
    });

    fit('Should return player response', (done) => {
        identityServiceStub.getIsAuthenticated = () => of(true);
        (playerServiceStub as any).get = () => of({
            Success: true,
            Errors: null,
            Message: 'Success',
            Player: {}
        } as IGetPlayerByUserResponse);

        initializer.init().subscribe(response => {
            expect(response).toBeDefined();
            expect(response.Success).toBeTrue();
            expect(response.Player).toBeDefined();
            done();
        });
    });

    fit('Should logout on error', () => {
        spyOn(identityServiceStub, 'logout' as any).and.returnValue(of(undefined));
        identityServiceStub.getIsAuthenticated = () => of(true);
        (playerServiceStub as any).get = () => throwError(() => new Error());

        initializer.init().subscribe(_ => {
            expect(identityServiceStub.logout).toHaveBeenCalled();
        });
    });
});