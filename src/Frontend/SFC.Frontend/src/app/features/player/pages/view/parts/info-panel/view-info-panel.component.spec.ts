import { Component, DebugElement, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TitleComponent } from "@share/components";
import { DelimeterComponent } from "ngx-sfc-common";
import { ViewInfoPanelComponent } from "./view-info-panel.component";

@Component({
    template: `<sfc-view-info-panel>
                    <div class="content">{{contentValue}}</div>
               </sfc-view-info-panel>`
})
class TestViewInfoPanelComponent {

    @ViewChild(ViewInfoPanelComponent, { static: false })
    panel?: ViewInfoPanelComponent;

    contentValue?: string;
}

describe('Features.Player.Page:View.Part:ViewInfoPanel', () => {
    let component: TestViewInfoPanelComponent;
    let fixture: ComponentFixture<TestViewInfoPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [
                DelimeterComponent,
                TitleComponent,
                ViewInfoPanelComponent,
                TestViewInfoPanelComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestViewInfoPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create component', () => {
        expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
        expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.header')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('sfc-title')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
    });

    fit('Should title has appropriate attributes', () => {
        const titleEl: DebugElement = fixture.debugElement.query(By.css('sfc-title'));

        expect(titleEl.componentInstance.label).toEqual(component.panel?.label);
        expect(titleEl.componentInstance.description).toEqual(component.panel?.description);
        expect(titleEl.componentInstance.tooltip).toBeNull();
        expect(titleEl.componentInstance.icon).toEqual(component.panel?.icon);
        expect(titleEl.componentInstance.delimeter).toBeTrue();
    });

    fit('Should have content', () => {
        component.contentValue = 'Test';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.content > .content').innerText).toEqual(component.contentValue);
    });
});