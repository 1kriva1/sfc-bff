import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PlayerViewService } from './player-view.service';

describe('Share.Service:PlayerView', () => {
    let service: PlayerViewService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.inject(PlayerViewService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    // fit('Should get player', (done) => {
    //     const response: IGetPlayerByUserResponse = {
    //         Player: {
    //             Id: 1,
    //             Profile: {
    //                 General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
    //                 Football: { Position: 1 }
    //             }
    //         },
    //         Errors: null,
    //         Success: true,
    //         Message: 'Success'
    //     };

    //     service.get().subscribe((response: IGetPlayerByUserResponse) => {
    //         expect(response).toEqual(response);
    //         done();
    //     });

    //     const testRequest = httpMock.expectOne(`${PlayerServiceConstants.URI_PART}/byuser`);

    //     expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, {show: true}));
    //     expect(testRequest.request.body).toBeNull();

    //     testRequest.flush(response);
    // });

    // fit('Should emit player id on get player', (done) => {
    //     expect(service.playerId.value).toBeNull();

    //     const response: IGetPlayerByUserResponse = callGetPlayer(done);

    //     expect(service.playerId.value).toEqual(response.Player.Id);
    // });

    // fit('Should emit player data on get player', (done) => {
    //     expect(service.player.value).toBeNull();

    //     const response: IGetPlayerByUserResponse = callGetPlayer(done);

    //     expect(service.player.value).toEqual(response.Player.Profile);
    // });

    // fit('Should emit and set player id and player data on update call', (done) => {
    //     const playerId = 100,
    //         model: IPlayerByUserModel = {
    //             Id: playerId,
    //             Profile: {
    //                 General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
    //                 Football: { Position: 1 }
    //             }
    //         };

    //     expect(service.playerId.value).toBeNull();
    //     expect(service.player.value).toBeNull();

    //     service.update(model);

    //     expect(service.playerId.value).toEqual(playerId);
    //     expect(service.player.value).toEqual(model.Profile);

    //     done();
    // });

    // fit('Should player be created', (done) => {
    //     callGetPlayer(done);

    //     expect(service.playerCreated).toBeTrue();
    // });

    // function callGetPlayer(done: any): IGetPlayerByUserResponse {
    //     const playerId = 100, response: IGetPlayerByUserResponse = {
    //         Player: {
    //             Id: playerId,
    //             Profile: {
    //                 General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
    //                 Football: { Position: 1 }
    //             }
    //         },
    //         Errors: null,
    //         Success: true,
    //         Message: 'Success'
    //     };

    //     service.get().subscribe((_: IGetPlayerByUserResponse) => done());

    //     const testRequest = httpMock.expectOne(`${PlayerServiceConstants.URI_PART}/byuser`);
    //     testRequest.flush(response);

    //     return response;
    // }
});