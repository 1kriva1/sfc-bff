import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { EnumService } from "@share/services";
import { ENUM_SERVICE, STATS } from "@test/stubs";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { StatsSkillsComponent } from "./stats-skills.component";

describe('Share.Component:StatsSkills', () => {
    let component: StatsSkillsComponent;
    let fixture: ComponentFixture<StatsSkillsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxSfcCommonModule, NgxSfcComponentsModule],
            declarations: [StatsSkillsComponent],
            providers: [
                { provide: EnumService, useValue: ENUM_SERVICE }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsSkillsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create component', () => {
        expect(component).toBeTruthy();
    });

    fit('Should have main element', () => {
        expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
    });

    fit('Should exist 3 type of skills', () => {
        component.value = STATS;
        component.ngOnChanges({});
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('.type').length).toEqual(3);
    });

    fit('Should physical type has appropriate attributes', () => {
        component.value = STATS;
        component.ngOnChanges({});
        fixture.detectChanges();

        const skillEl: DebugElement = fixture.debugElement.queryAll(By.css('.type'))[0],
            progressEl = skillEl.query(By.css('sfc-progress-semi-circle'));

        expect(skillEl.query(By.css('h3')).nativeElement.innerText)
            .toEqual(ENUM_SERVICE.enums?.statSkills[0].value);
        expect(progressEl.componentInstance.progress).toEqual(400);
        expect(progressEl.componentInstance.max).toEqual(800);
        expect(progressEl.componentInstance.getColor).toBeDefined();
        expect(progressEl.attributes['ng-reflect-custom-size']).toEqual('1.5');
    });

    fit('Should mental type has appropriate attributes', () => {
        component.value = STATS;
        component.ngOnChanges({});
        fixture.detectChanges();

        const skillEl: DebugElement = fixture.debugElement.queryAll(By.css('.type'))[1],
            progressEl = skillEl.query(By.css('sfc-progress-semi-circle'));

        expect(skillEl.query(By.css('h3')).nativeElement.innerText)
            .toEqual(ENUM_SERVICE.enums?.statSkills[1].value);
        expect(progressEl.componentInstance.progress).toEqual(100);
        expect(progressEl.componentInstance.max).toEqual(200);
        expect(progressEl.componentInstance.getColor).toBeDefined();
        expect(progressEl.attributes['ng-reflect-custom-size']).toEqual('1.5');
    });

    fit('Should skill type has appropriate attributes', () => {
        component.value = STATS;
        component.ngOnChanges({});
        fixture.detectChanges();

        const skillEl: DebugElement = fixture.debugElement.queryAll(By.css('.type'))[2],
            progressEl = skillEl.query(By.css('sfc-progress-semi-circle'));

        expect(skillEl.query(By.css('h3')).nativeElement.innerText)
            .toEqual(ENUM_SERVICE.enums?.statSkills[2].value);
        expect(progressEl.componentInstance.progress).toEqual(950);
        expect(progressEl.componentInstance.max).toEqual(1900);
        expect(progressEl.componentInstance.getColor).toBeDefined();
        expect(progressEl.attributes['ng-reflect-custom-size']).toEqual('1.5');
    });
});