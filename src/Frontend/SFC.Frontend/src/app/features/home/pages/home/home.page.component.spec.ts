import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { buildTitle } from '@core/utils';
import { IdentityService } from '@share/services';
import { ShareModule } from '@share/share.module';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { HomePageComponent } from './home.page.component';
import { of } from 'rxjs';

describe('Features.Home.Page:Home', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let identityServiceStub: Partial<IdentityService> = {
    getUserName: () => of('user_name')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
      declarations: [HomePageComponent],
      providers: [
        Title,
        { provide: IdentityService, useValue: identityServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create page', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have page title', () => {
      const titleService = TestBed.inject(Title);

      expect(titleService.getTitle()).toBe(buildTitle('Home'));
    });
  });
});