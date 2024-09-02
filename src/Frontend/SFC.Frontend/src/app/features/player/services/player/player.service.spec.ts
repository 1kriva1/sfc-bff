import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LOADER } from '@core/interceptors';
import { IGetPlayerResponse, IPlayerModel } from './models/get';
import { PlayerServiceConstants } from './player.constants';
import { PlayerService } from './player.service';

describe('Features.Player.Service:Player', () => {
    let service: PlayerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PlayerService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Get', () => {
        fit('Should use GET method', (done) => {
            service.get(1).subscribe(() => done());

            const testRequest = httpMock.expectOne(`${PlayerServiceConstants.URI_PART}/1`);

            expect(testRequest.request.method).toEqual('GET');

            testRequest.flush({});
        });

        fit('Should return player', (done) => {
            const response: IGetPlayerResponse = {
                Player: { Id: 1, ...getPlayerModel() },
                Errors: null,
                Success: true,
                Message: 'msg'
            };

            service.get(1).subscribe((resultResponse: IGetPlayerResponse) => {
                expect(resultResponse).toEqual(response);
                done();
            });

            const testRequest = httpMock.expectOne(`${PlayerServiceConstants.URI_PART}/1`);

            expect(testRequest.request.body).toBeNull();
            expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

            testRequest.flush(response);
        });

        fit('Should use loader', (done) => {
            service.get(1).subscribe(() => done());

            const testRequest = httpMock.expectOne(`${PlayerServiceConstants.URI_PART}/1`);

            expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

            testRequest.flush({});
        });
    });

    function getPlayerModel(): IPlayerModel {
        return {
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
                Values: [{ Type: 0, Value: 50 }]
            }
        }
    }
});