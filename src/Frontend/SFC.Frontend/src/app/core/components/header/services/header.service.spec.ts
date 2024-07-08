import { TestBed } from '@angular/core/testing';
import { DOCUMENT, UIConstants } from 'ngx-sfc-common';
import { HeaderService } from './header.service';

describe('Core.Component:Header.Service:Header', () => {
    let service: HeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DOCUMENT, useValue: window.document },
            ]
        });
        service = TestBed.inject(HeaderService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should open observable be defined', () => {
        expect(service.open$).toBeDefined();
    });

    fit('Should open has default value', () => {
        expect(service.open).toBeFalse();
    });

    fit('Should toggle open value', () => {
        service.toggle();

        expect(service.open).toBeTrue();
    });

    fit('Should set open value', () => {
        service.set(true);

        expect(service.open).toBeTrue();

        service.set(false);

        expect(service.open).toBeFalse();
    });

    fit('Should emit on toggle', (done) => {
        service.toggle();

        service.open$.subscribe((value: boolean) => {
            expect(value).toBeTrue();
            done();
        });
    });

    fit('Should emit on set', (done) => {
        service.set(true);

        service.open$.subscribe((value: boolean) => {
            expect(value).toBeTrue();
            done();
        });
    });

    fit('Should set document body overflow as initial', (done) => {
        service.set(false);

        service.open$.subscribe(() => {
            expect(document.body.style.overflow).toEqual(UIConstants.CSS_INITIAL);
            done();
        });
    });

    fit('Should set document body overflow as hidden', (done) => {
        service.toggle();

        service.open$.subscribe(() => {
            expect(document.body.style.overflow).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            done();
        });
    });
});