import { HttpClient, HttpContext, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpConstants } from "../../constants/http.constants";
import { CSRF, CsrfInterceptor } from "./csrf.interceptor";

describe('Core.Interceptor:Csrf', () => {
    const url = '/test';
    let client: HttpClient;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CsrfInterceptor,
                    multi: true
                }
            ]
        })

        client = TestBed.inject(HttpClient)
        controller = TestBed.inject(HttpTestingController)
    });

    afterEach(() => {
        controller.verify();
    });

    fit('Should not add csrf value if it already defined', (done) => {
        const csrfValue = 'csrf_value';

        client.get(url, { headers: { [HttpConstants.CSRF]: csrfValue } })
            .subscribe(_ => done());

        const testRequest = controller.expectOne(url);

        expect(testRequest.request.headers.has(HttpConstants.CSRF)).toBeTrue();
        expect(testRequest.request.headers.get(HttpConstants.CSRF)).toEqual(csrfValue);

        testRequest.flush({});
    });

    fit('Should add default csrf value', (done) => {
        client.get(url).subscribe(_ => done());

        const testRequest = controller.expectOne(url);

        expect(testRequest.request.headers.has(HttpConstants.CSRF)).toBeTrue();
        expect(testRequest.request.headers.get(HttpConstants.CSRF))
            .toEqual(CSRF.defaultValue());

        testRequest.flush({});
    });

    fit('Should add defined csrf value', (done) => {
        const csrfValue = 'csrf_value';

        client.get(url, { context: new HttpContext().set(CSRF, csrfValue) })
            .subscribe(_ => done());

        const testRequest = controller.expectOne(url);

        expect(testRequest.request.headers.has(HttpConstants.CSRF)).toBeTrue();
        expect(testRequest.request.headers.get(HttpConstants.CSRF)).toEqual(csrfValue);

        testRequest.flush({});
    });
})