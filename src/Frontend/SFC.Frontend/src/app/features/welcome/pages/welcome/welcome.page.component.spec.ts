import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, ComponentSizeDirective } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { ImageSliderComponent, ImageSliderItemComponent } from '../../components';
import { WelcomePageComponent } from './welcome.page.component';
import { By, Title } from '@angular/platform-browser';
import { buildTitle } from '@core/utils';
import { IdentityConstants } from '@share/services/identity/identity.constants';

describe('Features.Welcome.Page:Welcome', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, NgxSfcComponentsModule],
      declarations: [
        ComponentSizeDirective,
        ButtonComponent,
        ImageSliderItemComponent,
        ImageSliderComponent,
        WelcomePageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create page', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section.hero')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#about.about')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section.categories')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#locations.locations')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#process.process')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#contact.contact')).toBeTruthy();
    });

    fit('Should have page title', () => {
      const titleService = TestBed.inject(Title);

      expect(titleService.getTitle()).toBe(buildTitle('Welcome'));
    });
  });

  describe('Sections', () => {
    describe('Hero', () => {
      fit('Should navigate to sign in', () => {
        expect(fixture.debugElement.query(By.css('section.hero > div.title > a')).attributes['href'])
          .toEqual(IdentityConstants.LOGIN_URL);
      });
    });

    describe('Locations', () => {
      fit('Should exist image slider', () => {
        expect(fixture.nativeElement.querySelector('section#locations.locations sfc-image-slider')).toBeTruthy();
      });
    });

    describe('Process', () => {
      fit('Should exist image slider', () => {
        expect(fixture.nativeElement.querySelectorAll('section#process.process sfc-timeline').length).toEqual(2);
      });
    });
  });
});