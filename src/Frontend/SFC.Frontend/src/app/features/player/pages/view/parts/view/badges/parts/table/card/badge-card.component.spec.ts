import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShareModule } from "@share/share.module";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { BadgeCardComponent } from "./badge-card.component";
import { IBadgeCardModel } from "./badge-card.model";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BadgeCardConstants } from "./badge-card.constants";
import { BadgeStatus } from "../../../enums/badge-status.enum";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Features.Player.Page:View.Part.Table:BadgeCard', () => {
    let component: BadgeCardComponent;
    let fixture: ComponentFixture<BadgeCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                NoopAnimationsModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [BadgeCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BadgeCardComponent);
        component = fixture.componentInstance;
        component.model = buildBadgeCardModel();
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-badge.small')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('span.points')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('span.points > fa-icon')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('span.points > span')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('sfc-badge').length).toEqual(2);
            expect(fixture.nativeElement.querySelector('h2.name')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('p.description')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-progress-line')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('span.progress')).toBeTruthy();
        });
    });

    describe('Status', () => {
        fit('Should have not started class', () => {
            component.model.progress = 0;
            fixture.detectChanges();

            expect(fixture.nativeElement.className)
                .toContain(`${BadgeCardConstants.STATUS_CLASS_PART}${BadgeStatus.NotStarted}`);
        });

        fit('Should have active class', () => {
            component.model.progress = 1;
            fixture.detectChanges();

            expect(fixture.nativeElement.className)
                .toContain(`${BadgeCardConstants.STATUS_CLASS_PART}${BadgeStatus.Active}`);
        });

        fit('Should have completed class', () => {
            component.model.progress = 100;
            fixture.detectChanges();

            expect(fixture.nativeElement.className)
                .toContain(`${BadgeCardConstants.STATUS_CLASS_PART}${BadgeStatus.Completed}`);
        });
    });

    describe('Content', () => {
        fit('Should small badge has appropriate attributes', () => {
            const badgeEl: DebugElement = fixture.debugElement.query(By.css('sfc-badge.small'));

            expect(badgeEl.componentInstance.model).toEqual(component.model.type);
            expect(badgeEl.attributes['ng-reflect-custom-size']).toEqual('0.4');
        });

        fit('Should points has icon and text', () => {
            expect(fixture.nativeElement
                .querySelector('span.points > fa-icon svg')
                .classList)
                .toContain('fa-plus');
            expect(fixture.nativeElement.querySelector('span.points > span').innerText)
                .toEqual(`${component.model.points} EXP`);
        });

        fit('Should large badge has appropriate attributes', () => {
            expect(fixture.debugElement.queryAll(By.css('sfc-badge'))[1].componentInstance.model)
                .toEqual(component.model.type);
        });

        fit('Should name has defined value', () => {
            expect(fixture.nativeElement.querySelector('h2.name').innerText)
                .toEqual(component.model.type.value);
        });

        fit('Should progress line have appropriate attributes', () => {
            const progressEl: DebugElement = fixture.debugElement.query(By.css('sfc-progress-line'));

            expect(progressEl.componentInstance.progress).toEqual(component.model.progress);
            expect(progressEl.componentInstance.hideEnd).toBeTrue();
        });

        fit('Should progress has defined value', () => {
            expect(fixture.nativeElement.querySelector('span.progress').innerText)
                .toEqual(`${component.model.progress}/${component.model.total}`);
        });
    });

    function buildBadgeCardModel(): IBadgeCardModel {
        return {
            points: 22,
            progress: 50,
            total: 100,
            type: { key: 0, value: 'Badge_0', icon: faStar, description: 'Has posted more than 1000 posts on their profile' }
        };
    }
});