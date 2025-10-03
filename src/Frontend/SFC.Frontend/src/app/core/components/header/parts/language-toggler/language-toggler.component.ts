import { Component, Inject, OnInit } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { firstOrDefault, WINDOW } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';
import { LanguageTogglerConstants } from './language-toggler.constants';
import { Locale } from '../../../../enums';
import { CookieService, StorageService } from '../../../../services';
import { CoreConstants } from '../../../../constants';

@Component({
  selector: 'sfc-language-toggler',
  templateUrl: './language-toggler.component.html'
})
export class LanguageTogglerComponent implements OnInit {

  faGlobe = faGlobe;

  languages = LanguageTogglerConstants.LANGUAGES;

  public get language(): string {
    return firstOrDefault(this.languages, language => { return language.active || false; })?.label
      || LanguageTogglerConstants.DEFAULT_LANGUAGE;
  }

  constructor(
    @Inject(WINDOW) private window: Window,
    private cookieService: CookieService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const userLocale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY)
      || this.cookieService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English);
    this.languages.forEach(item => item.active = userLocale === item.value);
  }

  public changeLocale(model: IDropdownMenuItemModel): void {
    this.storageService.set(CoreConstants.LOCALE_KEY, model.value);
    this.cookieService.set(CoreConstants.LOCALE_KEY, model.value);    
    this.window.location.reload();
  }
}
