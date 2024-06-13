import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpConstants } from "@core/constants";
import { NotificationService } from "@core/services";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import { CommonConstants, ComponentSize, NgxSfcCommonModule, Position, Theme } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { IGetTeamsItemModel } from "../../../../../services/team/models/get";
import { TeamService } from "../../../../../services/team/team.service";
import { TeamRowComponent } from "./parts/table/row/team-row.component";
import { TeamsViewComponent } from "./teams-view.component";
import { of, throwError } from "rxjs";
import { ITeamsViewModel } from "./teams-view.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TeamsViewLocalization } from "./teams-view.localization";
import { faCrown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TeamsTableConstants } from "./parts/table/teams-table.constants";
import { TeamsTableLocalization } from "./parts/table/teams-table.localization";
import { TeamsViewConstants } from "./teams-view.constants";
import { MessageSeverity } from "@core/services/message/message-severity.enum";

describe('Features.Player.Page:View.Part.View:Teams', () => {
    let component: TeamsViewComponent;
    let fixture: ComponentFixture<TeamsViewComponent>;
    let notificationServiceStub: any = { notify: () => { } };
    let themeServiceMock: Partial<ThemeService> = { theme: Theme.Default };
    let getSpy: jasmine.Spy;
    let teamServiceStub: Partial<TeamService> = {
        get: () => (of(getTeamsResponse([])))
    }

    beforeEach(async () => {
        getSpy = spyOn(teamServiceStub as any, 'get').and.callThrough();

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
                TeamRowComponent,
                TeamsViewComponent
            ],
            providers: [
                { provide: TeamService, useValue: teamServiceStub },
                { provide: NotificationService, useValue: notificationServiceStub },
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: ThemeService, useValue: themeServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TeamsViewComponent);
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

            expect(titleEl.componentInstance.label).toEqual(TeamsViewLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(TeamsViewLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(TeamsViewLocalization.TITLE.TOOLTIP);
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

                expect(nameInput.componentInstance.placeholder).toEqual(TeamsViewLocalization.FILTER.NAME.PLACEHOLDER);
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

                expect(statusesInput.componentInstance.helperText).toEqual(TeamsViewLocalization.FILTER.STATUSES.HELPER_TEXT);
                expect(statusesInput.componentInstance.items).toEqual(component.statuses);
            });

            fit('Should have today status', () => {
                expect(component.statuses[component.statuses.length - 1])
                    .toEqual({ key: 5, label: TeamsViewLocalization.FILTER.STATUSES.OPTION.CREATED_BY_ME, icon: faCrown });
            });
        });

        describe('Table', () => {
            fit('Should have appropriate attributes', () => {
                const tableEl: DebugElement = fixture.debugElement.query(By.css('.content > .table > sfc-table'));

                expect(tableEl.componentInstance.predicate$).toEqual(component.predicate$);
                expect(tableEl.componentInstance.loader).toBeTruthy();
                expect(tableEl.componentInstance.columns).toEqual(TeamsTableConstants.COLUMNS);
                expect(tableEl.componentInstance.pagination).toEqual(TeamsTableConstants.PAGINATION);
                expect(tableEl.componentInstance.paginationCount).toEqual(TeamsTableConstants.PAGINATION_COUNT);
                expect(tableEl.componentInstance.position).toEqual(Position.Center);
                expect(tableEl.componentInstance.showColumns).toBeTrue();
                expect(tableEl.componentInstance.dataToggle).toBeTrue();
                expect(tableEl.componentInstance.columnsToggle).toBeTrue();
                expect(tableEl.componentInstance.showTotal).toBeTrue();
                expect(tableEl.componentInstance.showLoading).toBeTrue();
                expect(tableEl.componentInstance.paginationLimits).toBeTrue();
                expect(tableEl.componentInstance.totalLabel).toEqual(TeamsTableLocalization.TOTAL_LABEL);
                expect(tableEl.componentInstance.notFoundLabel).toEqual(TeamsTableLocalization.NOT_FOUND_LABEL);
                expect(tableEl.componentInstance.showColumnsLabel).toEqual(TeamsTableLocalization.COLUMNS_SHOW_LABEL);
                expect(tableEl.componentInstance.hideColumnsLabel).toEqual(TeamsTableLocalization.COLUMNS_HIDE_LABEL);
                expect(tableEl.componentInstance.dataListLabel).toEqual(TeamsTableLocalization.DATA_LIST_LABEL);
                expect(tableEl.componentInstance.dataCardsLabel).toEqual(TeamsTableLocalization.DATA_CARDS_LABEL);
            });

            describe('Rows', () => {
                fit('Should have defined items', fakeAsync(() => {
                    getSpy.and.returnValue(of(getTeamsResponse([
                        buildTeamsItemModel(),
                        buildTeamsItemModel()
                    ])));

                    changeNameInputFilter();

                    tick(TeamsViewConstants.SEARCH_NAME_DEBOUNCE_TIME);
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('.content > .table > sfc-table sfc-team-row')).length)
                        .toEqual(2);
                }));

                fit('Should every card have defined attributes', fakeAsync(() => {
                    getSpy.and.returnValue(of(getTeamsResponse([
                        buildTeamsItemModel(),
                        buildTeamsItemModel()
                    ])));

                    changeNameInputFilter();

                    tick(TeamsViewConstants.SEARCH_NAME_DEBOUNCE_TIME);
                    fixture.detectChanges();

                    fixture.debugElement.queryAll(By.css('.content > .table > sfc-table sfc-team-row'))
                        .forEach(row => {
                            expect(row.componentInstance.model).toBeTruthy();
                            expect(row.componentInstance.columns.length).toEqual(TeamsTableConstants.COLUMNS.length);
                        });
                }));
            });
        });
    });

    describe('Search process', () => {
        fit('Should start searching on init', () => {
            expect(teamServiceStub.get).toHaveBeenCalledTimes(1);
        });

        fit('Should searching on filter changes', fakeAsync(() => {
            changeNameInputFilter();

            tick(TeamsViewConstants.SEARCH_NAME_DEBOUNCE_TIME);

            expect(teamServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should searching with debounce time on filter changes', fakeAsync(() => {
            changeNameInputFilter();

            expect(teamServiceStub.get).toHaveBeenCalledTimes(1);

            tick(TeamsViewConstants.SEARCH_NAME_DEBOUNCE_TIME);

            expect(teamServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should map get request', fakeAsync(() => {
            expect(teamServiceStub.get).toHaveBeenCalledOnceWith({
                Filter: {
                    Name: CommonConstants.EMPTY_STRING,
                    Statuses: []
                },
                Pagination: { Page: TeamsTableConstants.PAGINATION.page, Size: TeamsTableConstants.PAGINATION_SIZE },
                Sorting: []
            }, !component.showLoading);
        }));

        fit('Should send notification on error', fakeAsync(() => {
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();

            changeNameInputFilter();

            getSpy.and.returnValue(throwError(() => new Error()));

            tick(TeamsViewConstants.SEARCH_NAME_DEBOUNCE_TIME);

            expect(notificationServiceStub.notify).toHaveBeenCalledOnceWith({
                severity: MessageSeverity.ERROR,
                value: 'An error occurred: undefined',
                title: 'Opps, error occured!'
            });
        }));
    });

    function getTeamsResponse(items: IGetTeamsItemModel[], total: number = 0, next: boolean = false): any {
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

    function buildSearchFormValue(): ITeamsViewModel {
        return {
            name: CommonConstants.EMPTY_STRING,
            statuses: []
        };
    }

    function buildTeamsItemModel(): IGetTeamsItemModel {
        return {
            Id: 0,
            City: 'City',
            Coach: null,
            CreatedDate: new Date(),
            FullName: 'Name',
            Logo: null,
            Raiting: 3,
            Schema: '4-4-2',
            ShortName: 'NAM',
            Status: 0
        };
    }

    function changeNameInputFilter(): void {
        const nameInputEl = fixture.nativeElement.querySelector('.content > .filters > form > .form > .name > sfc-text-input#name .sfc-input#sfc-name');
        nameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }
});