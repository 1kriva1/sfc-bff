import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, ButtonType, CommonConstants, ComponentSizeDirective } from 'ngx-sfc-common';
import { ImageSliderItemType } from './image-slider-item-type.enum';
import { ImageSliderItemComponent } from './image-slider-item.component';

describe('Features.Welcome.Component: ImageSliderItem', () => {
  let component: ImageSliderItemComponent;
  let fixture: ComponentFixture<ImageSliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ComponentSizeDirective, ButtonComponent, ImageSliderItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1')).toBeTruthy();
    });

    fit('Should have default item value', () => {
      expect(component.item).toEqual({ image: CommonConstants.EMPTY_STRING, title: CommonConstants.EMPTY_STRING });
    });

    fit('Should have default type', () => {
      expect(fixture.nativeElement.className).toEqual(ImageSliderItemType.None);
    });

    fit('Should have defined type', () => {
      component.type = ImageSliderItemType.Next;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toEqual(ImageSliderItemType.Next);
    });

    fit('Should have height style', () => {
      expect(fixture.nativeElement.style.height).toEqual('0px');
    });
  });

  describe('Image', () => {
    fit('Should be defined', () => {
      expect(component.imageEl).toBeTruthy();
    });

    fit('Should have default src value', () => {
      expect(fixture.nativeElement.querySelector('img').src).toBeTruthy();
    });

    fit('Should have defined src value', () => {
      component.item.image = 'app/features/welcome/assets/images/locations/4a.jpg';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img').src).toContain(component.item.image);
    });
  });

  describe('Link', () => {
    fit('Should not exist by default', () => {
      expect(fixture.nativeElement.querySelector('sfc-button')).toBeNull();
    });

    fit('Should exist', () => {
      component.item.link = 'test.com';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-button')).toBeTruthy();
    });

    fit('Should have appropriate attributes', () => {
      component.item.link = 'test.com';
      fixture.detectChanges();

      const linkBtn: DebugElement = fixture.debugElement.query(By.css('sfc-button'));

      expect(linkBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
      expect(linkBtn.componentInstance.text).toEqual('Visit website!');
      expect(linkBtn.componentInstance.iconBefore.iconName).toEqual('link');
      expect(linkBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });
  });

  describe('Title', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('h1').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value', () => {
      component.item.title = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1').innerText).toEqual(component.item.title);
    });
  });

  describe('Raiting', () => {
    fit('Should not exist by default', () => {
      expect(fixture.nativeElement.querySelector('.raiting')).toBeNull();
    });

    fit('Should exist', () => {
      component.item.raiting = '100';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.raiting')).toBeTruthy();
    });

    fit('Should have static icon', () => {
      component.item.raiting = '100';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-heart');
    });

    fit('Should have defined raiting', () => {
      component.item.raiting = '100';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('p').innerText).toEqual(component.item.raiting);
    });
  });
});
