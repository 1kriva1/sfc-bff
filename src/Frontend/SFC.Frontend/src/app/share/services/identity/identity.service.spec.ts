import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpMethod } from "@core/enums";
import { WINDOW } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { IdentityConstants } from "./identity.constants";
import { IdentityService } from "./identity.service";
import { Session } from "./session.type";

describe('Share.Service:Identity', () => {
    let service: IdentityService;
    let httpMock: HttpTestingController;
    let windowMock: any = <any>{
        location: {
            set href(_: string) { }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: WINDOW, useFactory: (() => { return windowMock; }) }]
        });

        service = TestBed.inject(IdentityService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Get session', () => {
        fit('Should return value', (done) => {
            const assertResponse: Session = [{ type: 'claim_type', value: 'claim_value' }];

            service.getSession().subscribe((response: Session) => {
                expect(response).toEqual(assertResponse);
                done();
            });

            const testRequest = httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL);

            expect(testRequest.request.method).toEqual(HttpMethod.GET);

            testRequest.flush(assertResponse);
        });

        fit('Should return value from cache', () => {
            const assertResponse: Session = [{ type: 'claim_type', value: 'claim_value' }];

            const sessionOne$: Observable<Session> = service.getSession();
            sessionOne$.subscribe();

            const sessionTwo$: Observable<Session> = service.getSession();
            sessionTwo$.subscribe();

            const testRequests = httpMock.match(IdentityConstants.IDENTITY_USER_URL);

            testRequests.forEach(request => request.flush(assertResponse));

            expect(testRequests.length).toBe(1);
            expect(sessionOne$).not.toBeNull();
            expect(sessionTwo$).not.toBeNull();
            expect(sessionOne$).toEqual(sessionTwo$);
        });

        fit('Should not return value from cache', () => {
            const assertResponse: Session = [{ type: 'claim_type', value: 'claim_value' }];

            const sessionOne$: Observable<Session> = service.getSession();
            sessionOne$.subscribe();

            const sessionTwo$: Observable<Session> = service.getSession(true);
            sessionTwo$.subscribe();

            const testRequests = httpMock.match(IdentityConstants.IDENTITY_USER_URL);

            testRequests.forEach(request => request.flush(assertResponse));

            expect(testRequests.length).toBe(2);
            expect(sessionOne$).not.toBeNull();
            expect(sessionTwo$).not.toBeNull();
            expect(sessionOne$).not.toEqual(sessionTwo$);
        });

        fit('Should return anonymous session when error happened', (done) => {
            const errorEvent = new ProgressEvent('Error');

            service.getSession().subscribe(result => {
                expect(result).toEqual(IdentityConstants.ANONYMOUS);
                done()
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .error(errorEvent);
        });
    });

    describe('Get IsAuthenticated', () => {
        fit('Should return true', (done) => {
            const assertResponse: Session = [{ type: 'claim_type', value: 'claim_value' }];

            service.getIsAuthenticated().subscribe((result: boolean) => {
                expect(result).toBeTrue();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should return false', (done) => {
            const assertResponse: Session = null;

            service.getIsAuthenticated().subscribe((result: boolean) => {
                expect(result).toBeFalse();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });
    });

    describe('Get IsAnonymous', () => {
        fit('Should return true', (done) => {
            const assertResponse: Session = [{ type: 'claim_type', value: 'claim_value' }];

            service.getIsAnonymous().subscribe((result: boolean) => {
                expect(result).toBeFalse();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should return false', (done) => {
            const assertResponse: Session = null;

            service.getIsAnonymous().subscribe((result: boolean) => {
                expect(result).toBeTrue();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });
    });

    describe('Get UserName', () => {
        fit('Should return value', (done) => {
            const assertUserName = 'user_name',
                assertResponse: Session = [{ type: IdentityConstants.USERNAME_CLAIM_NAME, value: assertUserName }];

            service.getUserName().subscribe((result: string | undefined) => {
                expect(result).toEqual(assertUserName);
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should return undefined when missing claim', (done) => {
            const assertResponse: Session = [{ type: 'test', value: 'test_value' }];

            service.getUserName().subscribe((result: string | undefined) => {
                expect(result).toBeUndefined();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should return undefined when not authenticated', fakeAsync(() => {
            const assertResponse: Session = null;
            let dataEmitted;

            service.getUserName().subscribe((result: string | undefined) => dataEmitted = result);

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);

            tick(1000);

            expect(dataEmitted).toBeUndefined();
        }));
    });

    describe('Get LogoutUrl', () => {
        fit('Should return value', (done) => {
            const assertLogoutUrl = 'https:\\localhost:4200',
                assertResponse: Session = [{ type: IdentityConstants.LOGOUT_URL_CLAIM_NAME, value: assertLogoutUrl }];

            service.getLogoutUrl().subscribe((result: string | undefined) => {
                expect(result).toEqual(assertLogoutUrl);
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should return undefined when missing claim', (done) => {
            const assertResponse: Session = [{ type: 'test', value: 'test_value' }];

            service.getLogoutUrl().subscribe((result: string | undefined) => {
                expect(result).toBeUndefined();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should return undefined when not authenticated', fakeAsync(() => {
            const assertResponse: Session = null;
            let dataEmitted;

            service.getLogoutUrl()
                .subscribe((result: string | undefined) => dataEmitted = result);

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);

            tick(1000);

            expect(dataEmitted).toBeUndefined();
        }));
    });

    describe('Authenticate', () => {
        fit('Should redirect to login url', () => {
            const windowsLocationHref = spyOnProperty(windowMock.location, 'href', 'set');

            service.authenticate();

            expect(windowsLocationHref).toHaveBeenCalledOnceWith(IdentityConstants.LOGIN_URL);
        });
    });

    describe('Logout', () => {
        fit('Should redirect to logout url', (done) => {
            const windowsLocationHref = spyOnProperty(windowMock.location, 'href', 'set'),
                assertLogoutUrl = 'https:\\localhost:4200',
                assertResponse: Session = [{ type: IdentityConstants.LOGOUT_URL_CLAIM_NAME, value: assertLogoutUrl }];

            service.logout().subscribe((result: string | undefined) => {
                expect(result).toEqual(assertLogoutUrl);
                expect(windowsLocationHref).toHaveBeenCalledOnceWith(result);
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });

        fit('Should not redirect to logout url', (done) => {
            const windowsLocationHref = spyOnProperty(windowMock.location, 'href', 'set'),
                assertResponse: Session = [{ type: 'test', value: 'test_value' }];
            service.logout().subscribe((result: string | undefined) => {
                expect(result).toBeUndefined();
                expect(windowsLocationHref).not.toHaveBeenCalled();
                done();
            });

            httpMock.expectOne(IdentityConstants.IDENTITY_USER_URL)
                .flush(assertResponse);
        });
    });
});