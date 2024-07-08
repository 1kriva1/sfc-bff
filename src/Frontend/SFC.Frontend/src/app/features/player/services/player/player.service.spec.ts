import { HttpContext, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpConstants } from '@core/constants';
import { LOADER } from '@core/interceptors';
import { SortingDirection } from 'ngx-sfc-common';
import { IGetPlayerResponse, IPlayerModel } from './models/get';
import { IFindPlayersRequest, IFindPlayersResponse, IFindPlayersFilterModel } from './models/find';
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

    describe('Find', () => {
        fit('Should have valid url', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.find(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));

            expect(testRequest.request.url).toEqual(`${PlayerServiceConstants.URI_PART}/find`);

            testRequest.flush({});
        });

        fit('Should use GET method', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.find(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));

            expect(testRequest.request.method).toEqual('GET');

            testRequest.flush({});
        });

        fit('Should have defined params', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.find(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));
            expect(testRequest.request.params.get('Pagination.Page')).toEqual('1');
            expect(testRequest.request.params.get('Pagination.Size')).toEqual('10');
            expect(testRequest.request.params.get('Sorting[0].Name')).toEqual('City');
            expect(testRequest.request.params.get('Sorting[0].Direction')).toEqual(SortingDirection.Descending);
            expect(testRequest.request.params.get('Filter.Profile.Football.Weight.From')).toEqual('30');
            expect(testRequest.request.params.get('Filter.Profile.Football.Weight.To')).toEqual('300');

            testRequest.flush({});
        });

        fit('Should return players', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            }, body: IFindPlayersResponse = {
                Items: [
                    { Id: 1, Profile: {} as any, Stats: [] as any },
                    { Id: 2, Profile: {} as any, Stats: [] as any }
                ],
                Errors: null,
                Success: true,
                Message: 'msg'
            };

            service.find(request).subscribe((resultResponse: HttpResponse<IFindPlayersResponse>) => {
                expect(resultResponse.body).toEqual(body);
                expect(resultResponse.body?.Items.length).toEqual(2);
                done();
            });

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));

            testRequest.flush(body);
        });

        fit('Should return pagination metadata in headers', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            }, headers: HttpHeaders = new HttpHeaders().append(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
                TotalCount: 10,
                HasNextPage: true
            }));

            service.find(request).subscribe((resultResponse: HttpResponse<IFindPlayersResponse>) => {
                expect(JSON.parse(resultResponse.headers.get(HttpConstants.PAGINATION_HEADER_KEY)!)).toEqual({
                    TotalCount: 10,
                    HasNextPage: true
                });
                done();
            });

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));

            testRequest.flush({}, { headers });
        });

        fit('Should return players without loader', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.find(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));

            expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, false));

            testRequest.flush({});
        });

        fit('Should return players with loader', (done) => {
            const request: IFindPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.find(request, true).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${PlayerServiceConstants.URI_PART}/find`));

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

    function getPlayerFilterModel(): IFindPlayersFilterModel {
        return {
            Profile: {
                General: ({
                    Availability: {
                        Days: [],
                        From: null!,
                        To: null!,
                    },
                    City: null,
                    Name: null,
                    FreePlay: false,
                    Tags: null,
                    HasPhoto: false,
                    Years: { From: 16, To: 55 }
                }),
                Football: {
                    GameStyles: null,
                    Height: { From: 100, To: 200 },
                    Weight: { From: 30, To: 300 },
                    PhysicalCondition: null,
                    Skill: null,
                    Positions: null,
                    WorkingFoot: null
                }
            },
            Stats: {
                Total: { From: 0, To: 100 },
                Mental: {
                    From: 0,
                    To: 100,
                    Skill: 1
                },
                Physical: {
                    From: 0,
                    To: 100,
                    Skill: 0
                },
                Skill: {
                    From: 0,
                    To: 100,
                    Skill: 2
                },
                Raiting: null
            }
        }
    }
});