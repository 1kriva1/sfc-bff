import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EnumService } from '@share/services';
import { ShareModule } from '@share/share.module';
import { ENUM_SERVICE, STATS } from '@test/stubs';
import { NgxSfcCommonModule, Sequence, where } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { StatsService } from './services/stats.service';
import { StatsEditComponent } from './stats-edit.component';
import { StatsEditLocalization } from './stats-edit.localization';

describe('Features.Profile.Page:Edit.Part:StatsEdit', () => {
    let component: StatsEditComponent;
    let fixture: ComponentFixture<StatsEditComponent>;
    let formGroupDirective: FormGroupDirective;
    let statsServiceStub: Partial<StatsService> = {
        stats: { difference: 0, available: 0, percentage: 0, used: 0 },
        initial: { available: 0, used: 0 },
        toggle: () => { }
    };

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NgxSfcCommonModule, NgxSfcComponentsModule, NgxSfcInputsModule, ShareModule],
            declarations: [StatsEditComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective },
                { provide: StatsService, useValue: statsServiceStub },
                { provide: EnumService, useValue: ENUM_SERVICE }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        statsServiceStub.stats!.difference = 0;
        statsServiceStub.stats!.used = 0;
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.part').length).toEqual(6);
            expect(fixture.nativeElement.querySelectorAll('sfc-progress-semi-circle').length).toEqual(3);
            expect(fixture.nativeElement.querySelector('.header')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-progress-line')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.line').length).toEqual(29);
            expect(fixture.nativeElement.querySelectorAll('sfc-number-input').length).toEqual(29);
        });

        fit('Should call unsubscribe for all stat inputs', () => {
            const subscriptions: any[] = (component as any)._statsControlsSubscriptions,
                subscriptionsSpy: any[] = [];

            expect(subscriptions.length).toEqual(29);

            subscriptions.forEach(subscription =>
                subscriptionsSpy.push(spyOn(subscription, 'unsubscribe').and.callThrough()));

            component.ngOnDestroy();

            subscriptionsSpy.every(subscription => expect(subscription).toHaveBeenCalledTimes(1));
        });

        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(29);
        });

        fit('Should have form initial value', () => {
            expect((component as any).form.value).toEqual({ stats: STATS });
        });
    });

    describe('Titles', () => {
        fit('Should have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(StatsEditLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(StatsEditLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(StatsEditLocalization.TITLE.TOOLTIP);
        });
    });

    describe('Avarage', () => {
        fit('Should stat skills have appropriate attributes', () => {
            expect(fixture.debugElement.query(By.css('.container > sfc-stats-skills'))
                .componentInstance.value).toEqual(STATS);
        });
    });

    describe('Stats', () => {
        describe('Number inputs', () => {
            describe('Increase', () => {
                fit('Should next button be disabled for all inputs', () => {
                    statsServiceStub.stats!.difference = 0;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disableNext)).toBeTrue();
                });

                fit('Should next button be enabled for all inputs', () => {
                    statsServiceStub.stats!.difference = 1;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disableNext)).toBeFalse();
                });

                fit('Should toggle stat on next call', () => {
                    spyOn(statsServiceStub as any, 'toggle').and.callThrough();
                    statsServiceStub.stats!.difference = 1;
                    fixture.detectChanges();

                    fixture.nativeElement.querySelector('sfc-number-input sfc-number-spinner .lever.next')
                        .dispatchEvent(new MouseEvent('click', {}));
                    fixture.detectChanges();

                    expect(statsServiceStub.toggle).toHaveBeenCalledOnceWith(Sequence.Next);
                });
            });

            describe('Decrease', () => {
                fit('Should previous button be disabled for all inputs', () => {
                    statsServiceStub.stats!.difference = 0;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disablePrevious)).toBeTrue();
                });

                fit('Should previous button be enabled for all inputs', () => {
                    statsServiceStub.stats!.used = 1;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disablePrevious)).toBeFalse();
                });

                fit('Should toggle stat on previous call', () => {
                    spyOn(statsServiceStub as any, 'toggle').and.callThrough();
                    statsServiceStub.stats!.used = 1;
                    fixture.detectChanges();

                    fixture.nativeElement.querySelector('sfc-number-input sfc-number-spinner .lever.previous')
                        .dispatchEvent(new MouseEvent('click', {}));
                    fixture.detectChanges();

                    expect(statsServiceStub.toggle).toHaveBeenCalledOnceWith(Sequence.Previous);
                });
            });
        });

        describe('Pace', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(0);
            });

            fit('Should have appropriate contents', () => {
                expectStat(0);
            });
        });

        describe('Shooting', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(1);
            });

            fit('Should have appropriate contents', () => {
                expectStat(1);
            });
        });

        describe('Passing', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(2);
            });

            fit('Should have appropriate contents', () => {
                expectStat(2);
            });
        });

        describe('Dribbling', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(3);
            });

            fit('Should have appropriate contents', () => {
                expectStat(3);
            });
        });

        describe('Defending', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(4);
            });

            fit('Should have appropriate contents', () => {
                expectStat(4);
            });
        });

        describe('Physicalfity', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(5);
            });

            fit('Should have appropriate contents', () => {
                expectStat(5);
            });
        });

        function expectStatHeader(index: number): void {
            const partEl: DebugElement = fixture.debugElement.queryAll(By.css('.items .part'))[index],
                titleEl = partEl.query(By.css('.header .title span')),
                progressEl = partEl.query(By.css('.header sfc-progress-line'));

            expect(partEl.query(By.css('.header .title h3')).nativeElement.innerText)
                .toEqual(ENUM_SERVICE.enums?.statCategories[index].value);
            expect(titleEl.nativeElement.innerText).toEqual('50');
            expect(titleEl.nativeElement.style['color']).toEqual('rgb(255, 206, 84)');
            expect(progressEl.componentInstance.progress).toEqual(50);
            expect(progressEl.componentInstance.hideEnd).toBeTrue();
        }

        function expectStat(index: number): void {
            const partEl: DebugElement = fixture.debugElement.queryAll(By.css('.items .part'))[index],
                statsEls: DebugElement[] = partEl.queryAll(By.css('.content .line')),
                contentEl = partEl.query(By.css('.content')),
                categoryTypes = where(ENUM_SERVICE.enums?.statTypes!, type => type.category === index);

            expect(contentEl.attributes['ng-reflect-name'])
                .toEqual(`${ENUM_SERVICE.enums?.statCategories[index].key}`);
            expect(statsEls.length).toEqual(categoryTypes!.length);

            statsEls.forEach((el: DebugElement, statIndex: number) => {
                const stat = categoryTypes![statIndex],
                    input: DebugElement = el.query(By.css('sfc-number-input'));

                expect(el.query(By.css('.label')).nativeElement.innerText)
                    .toEqual(stat.value);
                expect(input.componentInstance.edit).toBeFalse();
                expect(input.componentInstance.disableNext).toBeTrue();
                expect(input.componentInstance.disablePrevious).toBeTrue();
                expect(input.componentInstance.min).toEqual(0);
                expect(input.componentInstance.max).toEqual(100);
            });
        }
    });
});
