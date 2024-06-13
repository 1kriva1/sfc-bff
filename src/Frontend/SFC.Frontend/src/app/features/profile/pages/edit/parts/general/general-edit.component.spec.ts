import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Locale } from '@core/enums';
import { StorageService } from '@core/services';
import { ShareModule } from '@share/share.module';
import { CheckmarkType, nameof, NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { EditPagePart } from '../../enums/edit-page-part.enum';
import { GeneralEditComponent } from './general-edit.component';
import { GeneralEditConstants } from './general-edit.constants';
import { GeneralEditLocalization } from './general-edit.localization';
import { IGeneralEditAvailabilityModel, IGeneralEditModel, } from './general-edit.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Features.Profile.Page:Edit.Part:GeneralEdit', () => {
    let component: GeneralEditComponent;
    let fixture: ComponentFixture<GeneralEditComponent>;
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        get: () => Locale.Ukraine as any
    };
    let formGroupDirective: FormGroupDirective;

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcInputsModule, ShareModule],
            declarations: [GeneralEditComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GeneralEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('sfc-title').length).toEqual(3);
            expect(fixture.nativeElement.querySelectorAll('.row').length).toEqual(5);
            expect(fixture.nativeElement.querySelectorAll('.column').length).toEqual(10);
            expect(fixture.nativeElement.querySelector('.column.full')).toBeTruthy();
        });
    });

    describe('Titles', () => {
        fit('Should general title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-title'))[0];

            expect(titleEl.componentInstance.label).toEqual(GeneralEditLocalization.TITLE.GENERAL.LABEL);
            expect(titleEl.componentInstance.description).toEqual(GeneralEditLocalization.TITLE.GENERAL.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(GeneralEditLocalization.TITLE.GENERAL.TOOLTIP);
        });

        fit('Should availability title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-title'))[1];

            expect(titleEl.componentInstance.label).toEqual(GeneralEditLocalization.TITLE.AVAILABILITY.LABEL);
            expect(titleEl.componentInstance.description).toEqual(GeneralEditLocalization.TITLE.AVAILABILITY.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(GeneralEditLocalization.TITLE.AVAILABILITY.TOOLTIP);
        });

        fit('Should financial title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-title'))[2];

            expect(titleEl.componentInstance.label).toEqual(GeneralEditLocalization.TITLE.FINANCIAL.LABEL);
            expect(titleEl.componentInstance.description).toEqual(GeneralEditLocalization.TITLE.FINANCIAL.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(GeneralEditLocalization.TITLE.FINANCIAL.TOOLTIP);
        });
    });

    describe('Form', () => {
        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(9);
        });

        fit('Should have initial value', () => {
            expect((component as any).form.value)
                .toEqual({
                    general: {
                        firstName: null,
                        lastName: null,
                        biography: null,
                        birthday: null,
                        city: null,
                        tags: null,
                        freePlay: false,
                        availability: { days: null, from: null, to: null }
                    }
                });
        });

        fit('Should be invalid', () => {
            expect(formGroupDirective.form.valid).toBeFalse();
        });

        fit('Should be valid', () => {
            makeFormValid();

            expect(formGroupDirective.form.valid).toBeTrue();
        });

        describe('Inputs', () => {
            describe('First name', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#first-name'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.FIRST_NAME.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.FIRST_NAME.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.validations).toEqual({
                        required: GeneralEditLocalization.INPUT.FIRST_NAME.VALIDATIONS.REQUIRED,
                        maxlength: GeneralEditLocalization.INPUT.FIRST_NAME.VALIDATIONS.MAX_LENGTH
                    });
                });
    
                fit('Should be invalid if empty', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('firstName'))!;
    
                    inputEl.value = '';
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['required']).toBeTrue();
                });
    
                fit('Should be invalid if size is exceed limit', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('firstName'))!;
    
                    inputEl.value = new Array(GeneralEditConstants.MAX_NAME_LENGTH + 2).join('a');
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['maxlength']).toEqual({
                        actualLength: 151,
                        requiredLength: GeneralEditConstants.MAX_NAME_LENGTH
                    });
                });
            });
    
            describe('Last name', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#last-name'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.LAST_NAME.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.LAST_NAME.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.validations).toEqual({
                        required: GeneralEditLocalization.INPUT.LAST_NAME.VALIDATIONS.REQUIRED,
                        maxlength: GeneralEditLocalization.INPUT.LAST_NAME.VALIDATIONS.MAX_LENGTH
                    });
                });
    
                fit('Should be invalid if empty', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-last-name'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('lastName'))!;
    
                    inputEl.value = '';
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['required']).toBeTrue();
                });
    
                fit('Should be invalid if size is exceed limit', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-last-name'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('lastName'))!;
    
                    inputEl.value = new Array(GeneralEditConstants.MAX_NAME_LENGTH + 2).join('a');
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['maxlength']).toEqual({
                        actualLength: 151,
                        requiredLength: GeneralEditConstants.MAX_NAME_LENGTH
                    });
                });
            });
    
            describe('Birthday', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#birthday'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.BIRTHDAY.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.BIRTHDAY.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.time).toBeFalse();
                    expect(input.componentInstance.switchOnClick).toBeTrue();
                    expect(input.componentInstance.fullSize).toBeTrue();
                    expect(input.componentInstance.hideOnClickOutside).toBeTrue();
                    expect(input.componentInstance.locale).toEqual(Locale.Ukraine);
                    expect(input.componentInstance.modalButtonsModel).toEqual(component.DATE_INPUT_MODAL_BUTTONS_MODEL);
                    expect(input.componentInstance.minDate.getDate()).toEqual(component.birtdayLimits.min.getDate());
                    expect(input.componentInstance.maxDate.getDate()).toEqual(component.birtdayLimits.max.getDate());
                });
            });
    
            describe('City', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#city'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.CITY.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.CITY.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.CITY.HELPER_TEXT);
                    expect(input.componentInstance.validations).toEqual({
                        required: GeneralEditLocalization.INPUT.CITY.VALIDATIONS.REQUIRED,
                        maxlength: GeneralEditLocalization.INPUT.CITY.VALIDATIONS.MAX_LENGTH
                    });
                });
    
                fit('Should be invalid if empty', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-city'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('city'))!;
    
                    inputEl.value = '';
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['required']).toBeTrue();
                });
    
                fit('Should be invalid if size is exceed limit', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-city'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('city'))!;
    
                    inputEl.value = new Array(GeneralEditConstants.MAX_CITY_LENGTH + 2).join('a');
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['maxlength']).toEqual({
                        actualLength: 101,
                        requiredLength: GeneralEditConstants.MAX_CITY_LENGTH
                    });
                });
            });
    
            describe('Biography', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-text-area-input#biography'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.BIOGRAPHY.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.BIOGRAPHY.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.BIOGRAPHY.HELPER_TEXT);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.validations).toEqual({
                        maxlength: GeneralEditLocalization.INPUT.BIOGRAPHY.VALIDATIONS.MAX_LENGTH
                    });
                });
    
                fit('Should be invalid if size is exceed limit', () => {
                    const inputEl = fixture.nativeElement.querySelector('sfc-text-area-input .sfc-input#sfc-biography'),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('biography'))!;
    
                    inputEl.value = new Array(GeneralEditConstants.MAX_BIOGRAPHY_LENGTH + 2).join('a');
                    inputEl.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
    
                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['maxlength']).toEqual({
                        actualLength: 1051,
                        requiredLength: GeneralEditConstants.MAX_BIOGRAPHY_LENGTH
                    });
                });
            });
    
            describe('Tags', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-tags-input#tags'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.TAGS.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.TAGS.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.TAGS.HELPER_TEXT);
                    expect(input.componentInstance.newTagPlaceholder).toEqual('+ ' + GeneralEditLocalization.INPUT.TAGS.NEW_TAG_PLACEHOLDER);
                    expect(input.componentInstance.maxTagLength).toEqual(GeneralEditConstants.MAX_TAG_VALUE_LENGTH);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.validations).toEqual({
                        'sfc-empty': GeneralEditLocalization.INPUT.TAGS.VALIDATIONS.EMPTY,
                        'sfc-duplicate': GeneralEditLocalization.INPUT.TAGS.VALIDATIONS.DUPLICATE,
                        'sfc-tags-length': component.MAX_TAG_VALUE_VALIDATION,
                        'sfc-max-array-length': GeneralEditLocalization.INPUT.TAGS.VALIDATIONS.TAGS_LENGTH
                    });
                });
    
                fit('Should be invalid, when try add empty value', () => {
                    const input = fixture.debugElement.query(By.css('sfc-tags-input'));
    
                    addTag('');
    
                    expect(input.componentInstance.innerErrors['sfc-empty']).toBeTrue();
                });
    
                fit('Should be invalid, when try add duplicate value', () => {
                    const input = fixture.debugElement.query(By.css('sfc-tags-input'));
    
                    addTag('test');
    
                    addTag('test');
    
                    expect(input.componentInstance.innerErrors['sfc-duplicate']).toBeTrue();
                });
    
                fit('Should be invalid, when try add value which exceed limit', () => {
                    const input = fixture.debugElement.query(By.css('sfc-tags-input'));
    
                    addTag(new Array(GeneralEditConstants.MAX_TAG_VALUE_LENGTH + 2).join('a'));
    
                    expect(input.componentInstance.innerErrors['sfc-tags-length']).toBeTrue();
                });
    
                fit('Should be invalid, when try add too many tags', () => {
                    const inputControl = formGroupDirective.form
                        .get(EditPagePart.General)
                        ?.get(nameof<IGeneralEditModel>('tags'))!;
    
                    for (let index = 0; index < GeneralEditConstants.MAX_TAGS_LENGTH + 1; index++) {
                        addTag('test' + index);
                    }
    
                    expect(inputControl?.errors).not.toBeNull();
    
                    const lengthError = (inputControl?.errors as any)['sfc-max-array-length'];
                    expect(lengthError.actualLength).toEqual(GeneralEditConstants.MAX_TAGS_LENGTH + 1);
                    expect(lengthError.requiredLength).toEqual(GeneralEditConstants.MAX_TAGS_LENGTH);
                });
            });
    
            describe('From time', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#from-time'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_FROM.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_FROM.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_FROM.HELPER_TEXT);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.time).toBeTrue();
                    expect(input.componentInstance.date).toBeFalse();
                    expect(input.componentInstance.switchOnClick).toBeTrue();
                    expect(input.componentInstance.fullSize).toBeTrue();
                    expect(input.componentInstance.hideOnClickOutside).toBeTrue();
                    expect(input.componentInstance.locale).toEqual(component.locale);
                    expect(input.componentInstance.modalButtonsModel).toEqual(component.DATE_INPUT_MODAL_BUTTONS_MODEL);
                    expect(input.componentInstance.validations).toEqual({
                        'sfc-compare-than': GeneralEditLocalization.INPUT.AVAILABLE_FROM.VALIDATIONS.COMPARE
                    });
                });
    
                fit('Should be invalid, when to time input is less', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#from-time')),
                        toTimeinput: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#to-time')),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('availability'))
                            ?.get(nameof<IGeneralEditAvailabilityModel>('from'))!;
                    component.locale = Locale.English;
    
                    input.componentInstance.update(new Date(2033, 8, 29, 11, 16));
                    fixture.detectChanges();
    
                    toTimeinput.componentInstance.update(new Date(2033, 8, 29, 11, 15));
                    fixture.detectChanges();
    
                    expect(inputControl.errors!['sfc-compare-than']).toBeTrue();
                });
            });
    
            describe('To time', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#to-time'));
    
                    expect(input.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_TO.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_TO.LABEL_PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_TO.HELPER_TEXT);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.time).toBeTrue();
                    expect(input.componentInstance.date).toBeFalse();
                    expect(input.componentInstance.switchOnClick).toBeTrue();
                    expect(input.componentInstance.fullSize).toBeTrue();
                    expect(input.componentInstance.hideOnClickOutside).toBeTrue();
                    expect(input.componentInstance.locale).toEqual(component.locale);
                    expect(input.componentInstance.modalButtonsModel).toEqual(component.DATE_INPUT_MODAL_BUTTONS_MODEL);
                    expect(input.componentInstance.validations).toEqual({
                        'sfc-compare-than': GeneralEditLocalization.INPUT.AVAILABLE_TO.VALIDATIONS.COMPARE
                    });
                });
    
                fit('Should be invalid, when to time input is less', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#to-time')),
                        fromTimeinput: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#from-time')),
                        inputControl = formGroupDirective.form
                            .get(EditPagePart.General)
                            ?.get(nameof<IGeneralEditModel>('availability'))
                            ?.get(nameof<IGeneralEditAvailabilityModel>('from'))!;
                    component.locale = Locale.English;
    
                    fromTimeinput.componentInstance.update(new Date(2033, 8, 29, 11, 17));
                    fixture.detectChanges();
    
                    input.componentInstance.update(new Date(2033, 8, 29, 11, 16));
                    fixture.detectChanges();
    
                    expect(inputControl.errors!['sfc-compare-than']).toBeTrue();
                });
            });
    
            describe('Available days', () => {
                fit('Should have appropriate attributes', () => {
                    const additionalPositionInput: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#available-days'));
    
                    expect(additionalPositionInput.componentInstance.label).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_DAYS.LABEL_PLACEHOLDER);
                    expect(additionalPositionInput.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_DAYS.HELPER_TEXT);
                    expect(additionalPositionInput.componentInstance.placeholder).toEqual(GeneralEditLocalization.INPUT.AVAILABLE_DAYS.LABEL_PLACEHOLDER);
                    expect(additionalPositionInput.componentInstance.multiple).toBeTrue();
                    expect(additionalPositionInput.componentInstance.showDefaultItem).toBeFalse();
                    expect(additionalPositionInput.componentInstance.bordered).toBeTrue();
                    expect(additionalPositionInput.componentInstance.size).toEqual(7);
                    expect(additionalPositionInput.componentInstance.data).toEqual(component.WEEK_DAYS);
                });
            });
    
            describe('Free play', () => {
                fit('Should have appropriate attributes', () => {
                    const inputEl: DebugElement = fixture.debugElement.query(By.css('sfc-checkbox-input#free-play'));
    
                    expect(inputEl.componentInstance.sideLabel).toEqual(GeneralEditLocalization.INPUT.FREE_PLAY.LABEL);
                    expect(inputEl.componentInstance.helperText).toEqual(GeneralEditLocalization.INPUT.FREE_PLAY.HELPER_TEXT);
                    expect(inputEl.componentInstance.checkmarkType).toEqual(CheckmarkType.Rounded);
                    expect(inputEl.componentInstance.value).toBeFalse();
                });
            });
        });        
    });

    function makeFormValid(firstname: string = 'First name'): void {
        const firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name'),
            lastNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-last-name'),
            cityInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-city');

        firstNameInputEl.value = firstname;
        firstNameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        lastNameInputEl.value = 'Last name';
        lastNameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        cityInputEl.value = 'City';
        cityInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }

    function addTag(value: string): void {
        const inputEl = fixture.debugElement
            .query(By.css('sfc-tags-input'))
            .query(By.css('input'));

        inputEl.triggerEventHandler('input', { target: { value: value } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();
    }
});
