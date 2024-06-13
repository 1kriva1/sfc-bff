import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { StatsTotalComponent } from "./stats-total.component";

describe('Share.Component:StatsTotal', () => {
    let component: StatsTotalComponent;
    let fixture: ComponentFixture<StatsTotalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxSfcCommonModule, NgxSfcComponentsModule],
            declarations: [StatsTotalComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsTotalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create component', () => {
        expect(component).toBeTruthy();
    });

    fit('Should have main element', () => {
        expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        expect(fixture.nativeElement.querySelectorAll('.container .element').length).toEqual(2);
        expect(fixture.nativeElement.querySelectorAll('.container .element sfc-progress-circle').length)
            .toEqual(2);
        expect(fixture.nativeElement.querySelectorAll('.container .element .label').length)
            .toEqual(2);
        expect(fixture.nativeElement.querySelectorAll('.container .element .label h4').length)
            .toEqual(2);
        expect(fixture.nativeElement.querySelectorAll('.container .element .label span').length)
            .toEqual(2);
    });

    fit('Should delimeter not exist', () => {
        component.delimeter = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
    });

    fit('Should delimeter exist', () => {
        component.delimeter = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
    });

    fit('Should percentage progress have appropriate attributes', () => {
        component.progress = 50;
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('.container .element sfc-progress-circle'))[0]
            .componentInstance.progress).toEqual(component.progress);
        expect(fixture.nativeElement.querySelectorAll('.container > .element > .label > h4')[0]
            .innerText).toEqual('Total rating (percentage)');
        expect(fixture.nativeElement.querySelectorAll('.container > .element > .label > span')[0]
            .innerText).toEqual('Average value from your stats');
    });

    fit('Should percentage progress have appropriate attributes', () => {
        component.total = 2900;
        component.value = 1450;
        fixture.detectChanges();

        const progessEl: DebugElement = fixture.debugElement.queryAll(By.css('.container .element sfc-progress-circle'))[1];

        expect(progessEl.componentInstance.progress).toEqual(component.value);
        expect(progessEl.componentInstance.total).toEqual(component.total);
        expect(progessEl.componentInstance.getColor).toBeTruthy();
        expect(fixture.nativeElement.querySelectorAll('.container > .element > .label > h4')[1]
            .innerText).toEqual('Total rating (absolute value)');
        expect(fixture.nativeElement.querySelectorAll('.container > .element > .label > span')[1]
            .innerText).toEqual('Sum of your all stats');
    });
});