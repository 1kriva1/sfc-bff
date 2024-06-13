import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BadgeComponent } from "./badge.component";

describe('Share.Component:Badge', () => {
    let component: BadgeComponent;
    let fixture: ComponentFixture<BadgeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [BadgeComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create component', () => {
        expect(component).toBeTruthy();
    });

    fit('Should have main element', () => {
        expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.circle')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.ribbon')).toBeTruthy();
    });

    fit('Should icon not exist', () => {
        component.model.icon = undefined;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.circle > fa-icon')).toBeNull();
    });

    fit('Should icon exist', () => {
        component.model.icon = faStar;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.circle > fa-icon')).toBeTruthy();
    });

    fit('Should icon has defined value', () => {
        component.model.icon = faStar;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.circle > fa-icon svg').classList)
            .toContain('fa-star');
    });

    fit('Should ribbon has defined value', () => {
        component.model.value = 'Test label';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.ribbon').innerText)
            .toEqual(component.model.value.toUpperCase());
    });
});