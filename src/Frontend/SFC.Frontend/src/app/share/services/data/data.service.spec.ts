import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpMethod } from '@core/enums';
import { CACHE, LOADER } from '@core/interceptors';
import { DataServiceConstants } from './data-service.constants';
import { DataService } from './data.service';
import { IGetDataResponse } from './models/get/get-data.response';

describe('Share.Service:Data', () => {
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should get data', (done) => {
        const assertResponse: IGetDataResponse = {
            FootballPositions: [],
            GameStyles: [],
            StatCategories: [],
            StatSkills: [],
            StatTypes: [],
            WorkingFoots: [],
            Shirts:[],
            Errors: null,
            Success: true,
            Message: 'Success'
        };

        service.get().subscribe((response: IGetDataResponse) => {
            expect(response).toEqual(assertResponse);
            done();
        });

        const testRequest = httpMock.expectOne(DataServiceConstants.URI_PART);

        expect(testRequest.request.method).toEqual(HttpMethod.GET);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, {show: true}).set(CACHE, true));
        expect(testRequest.request.body).toBeNull();

        testRequest.flush(assertResponse);
    });
});