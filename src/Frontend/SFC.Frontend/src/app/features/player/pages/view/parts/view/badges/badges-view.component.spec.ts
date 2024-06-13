import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpConstants } from "@core/constants";
import { NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import { CommonConstants, ComponentSize, LoadContainerLoadType, NgxSfcCommonModule, Theme } from "ngx-sfc-common";
import { NgxSfcComponentsModule, TableDataType } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { of, throwError } from "rxjs";
import { IGetBadgesItemModel } from "src/app/features/player/services/badge/models/get";
import { BadgeService } from "../../../../../services/badge/badge.service";
import { BadgesViewComponent } from "./badges-view.component";
import { BadgesViewConstants } from "./badges-view.constants";
import { BadgesViewLocalization } from "./badges-view.localization";
import { IBadgesViewModel } from "./badges-view.model";
import { BadgesTableConstants } from "./parts/table/badges-table.constants";
import { BadgesTableLocalization } from "./parts/table/badges-table.localization";
import { BadgeCardComponent } from "./parts/table/card/badge-card.component";

describe('Features.Player.Page:View.Part.View:Badges', () => {
    let component: BadgesViewComponent;
    let fixture: ComponentFixture<BadgesViewComponent>;
    let notificationServiceStub: any = { notify: () => { } };
    let themeServiceMock: Partial<ThemeService> = { theme: Theme.Default };
    let getSpy: jasmine.Spy;
    let badgeServiceStub: Partial<BadgeService> = {
        get: () => (of(getBadgesResponse([])))
    }

    beforeEach(async () => {
        getSpy = spyOn(badgeServiceStub as any, 'get').and.callThrough();

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                NgxSfcCommonModule,
                NgxSfcInputsModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [
                BadgeCardComponent,
                BadgesViewComponent
            ],
            providers: [
                { provide: BadgeService, useValue: badgeServiceStub },
                { provide: NotificationService, useValue: notificationServiceStub },
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: ThemeService, useValue: themeServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BadgesViewComponent);
        component = fixture.componentInstance;
        (themeServiceMock as any).theme = Theme.Default;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create view', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title > sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .filters')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .filters > form')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .filters > form > .form')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .filters > form > .form > .name > sfc-text-input')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .filters > form > .form > .status > sfc-bubbles-input')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .table')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .table > sfc-table')).toBeTruthy();
        });

        fit('Should title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('.title > sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(BadgesViewLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(BadgesViewLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(BadgesViewLocalization.TITLE.TOOLTIP);
            expect(titleEl.componentInstance.delimeter).toBeFalse();
            expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
        });
    });

    describe('Content', () => {
        describe('Filters', () => {
            fit('Should have valid inputs count', () => {
                const formEl = fixture.nativeElement.querySelector('form'),
                    inputs = formEl.querySelectorAll('input');

                expect(inputs.length).toEqual(2);
            });

            fit('Should search form has initial value', () => {
                expect(component.searchForm.value).toEqual(buildSearchFormValue());
            });

            fit('Should search form has valid autocomplete attribute', () => {
                expect(fixture.nativeElement.querySelector('form').attributes['autocomplete'].nodeValue).toEqual('off');
            });

            fit('Should search form be valid', () => {
                expect(component.searchForm.valid).toBeTrue();
            });

            fit('Should name filter has appropriate attributes', () => {
                const nameInput: DebugElement = fixture.debugElement.query(By.css('.content > .filters > form > .form > .name > sfc-text-input#name'));

                expect(nameInput.componentInstance.placeholder).toEqual(BadgesViewLocalization.FILTER.NAME.PLACEHOLDER);
                expect(nameInput.componentInstance.showPlaceholderOnFocus).toBeTrue();
                expect(nameInput.componentInstance.icon).toEqual(faMagnifyingGlass);
                expect(nameInput.componentInstance.bordered).toBeTrue();
                expect(nameInput.attributes['ng-reflect-custom-size']).toEqual('1.3');
                expect(nameInput.attributes['ng-reflect-focus']).toEqual('true');
            });

            fit('Should status filter has appropriate attributes', () => {
                const statusesInput: DebugElement = fixture.debugElement.query(
                    By.css('.content > .filters > form > .form > .status > sfc-bubbles-input#statuses')
                );

                expect(statusesInput.componentInstance.helperText).toEqual(BadgesViewLocalization.FILTER.STATUSES.HELPER_TEXT);
                expect(statusesInput.componentInstance.items).toEqual(BadgesViewConstants.STATUSES);
            });
        });

        describe('Table', () => {
            fit('Should have appropriate attributes', () => {
                const tableEl: DebugElement = fixture.debugElement.query(By.css('.content > .table > sfc-table'));

                expect(tableEl.componentInstance.predicate$).toEqual(component.predicate$);
                expect(tableEl.componentInstance.loader).toBeTruthy();
                expect(tableEl.componentInstance.pagination).toEqual(BadgesTableConstants.PAGINATION);
                expect(tableEl.componentInstance.showColumns).toBeFalse();
                expect(tableEl.componentInstance.dataToggle).toBeFalse();
                expect(tableEl.componentInstance.showTotal).toBeTrue();
                expect(tableEl.componentInstance.showLoading).toBeTrue();
                expect(tableEl.componentInstance.totalLabel).toEqual(BadgesTableLocalization.TOTAL_LABEL);
                expect(tableEl.componentInstance.notFoundLabel).toEqual(BadgesTableLocalization.NOT_FOUND_LABEL);
                expect(tableEl.componentInstance.loadType).toEqual(LoadContainerLoadType.Button);
                expect(tableEl.componentInstance.dataType).toEqual(TableDataType.Cards);
            });

            describe('Cards', () => {
                fit('Should have defined items', fakeAsync(() => {
                    getSpy.and.returnValue(of(getBadgesResponse([
                        buildPlayersItemModel(0),
                        buildPlayersItemModel(1)
                    ])));

                    changeNameInputFilter();

                    tick(BadgesViewConstants.SEARCH_NAME_DEBOUNCE_TIME);
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('.content > .table > sfc-table sfc-badge-card')).length)
                        .toEqual(2);
                }));

                fit('Should every card have defined attributes', fakeAsync(() => {
                    getSpy.and.returnValue(of(getBadgesResponse([
                        buildPlayersItemModel(0),
                        buildPlayersItemModel(1)
                    ])));

                    changeNameInputFilter();

                    tick(BadgesViewConstants.SEARCH_NAME_DEBOUNCE_TIME);
                    fixture.detectChanges();

                    fixture.debugElement.queryAll(By.css('.content > .table > sfc-table sfc-badge-card'))
                        .forEach(row => expect(row.componentInstance.model).toBeTruthy());
                }));
            });
        });
    });

    describe('Search process', () => {
        fit('Should start searching on init', () => {
            expect(badgeServiceStub.get).toHaveBeenCalledTimes(1);
        });

        fit('Should searching on filter changes', fakeAsync(() => {
            changeNameInputFilter();

            tick(BadgesViewConstants.SEARCH_NAME_DEBOUNCE_TIME);

            expect(badgeServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should searching with debounce time on filter changes', fakeAsync(() => {
            changeNameInputFilter();

            expect(badgeServiceStub.get).toHaveBeenCalledTimes(1);

            tick(BadgesViewConstants.SEARCH_NAME_DEBOUNCE_TIME);

            expect(badgeServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should map get request', fakeAsync(() => {
            expect(badgeServiceStub.get).toHaveBeenCalledOnceWith({
                Filter: {
                    Name: CommonConstants.EMPTY_STRING,
                    Statuses: []
                },
                Pagination: { Page: BadgesTableConstants.PAGINATION.page, Size: BadgesTableConstants.PAGINATION_SIZE },
                Sorting: []
            }, !component.showLoading);
        }));

        fit('Should send notification on error', fakeAsync(() => {
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();

            changeNameInputFilter();

            getSpy.and.returnValue(throwError(() => new Error()));

            tick(BadgesViewConstants.SEARCH_NAME_DEBOUNCE_TIME);

            expect(notificationServiceStub.notify).toHaveBeenCalledOnceWith({
                severity: MessageSeverity.ERROR,
                value: 'An error occurred: undefined',
                title: 'Opps, error occured!'
            });
        }));
    });

    function getBadgesResponse(items: IGetBadgesItemModel[], total: number = 0, next: boolean = false): any {
        return {
            body: {
                Errors: null,
                Items: items,
                Message: 'Success',
                Success: true
            },
            headers: new HttpHeaders().set(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
                TotalCount: total,
                HasNextPage: next
            }))
        }
    }

    function buildSearchFormValue(): IBadgesViewModel {
        return {
            name: CommonConstants.EMPTY_STRING,
            statuses: []
        };
    }

    function buildPlayersItemModel(type: number): IGetBadgesItemModel {
        return {
            Points: 22, 
            Progress: 50, 
            Total: 100, 
            Type: type
        };
    }

    function changeNameInputFilter(): void {
        const nameInputEl = fixture.nativeElement.querySelector('.content > .filters > form > .form > .name > sfc-text-input#name .sfc-input#sfc-name');
        nameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }
});