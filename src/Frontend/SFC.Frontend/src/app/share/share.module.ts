import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import {
  IconTooltipComponent,
  LogoComponent,
  ThemeTogglerComponent,
  TitleComponent,
  InfoPanelComponent,
  PlayerInfoPanelComponent,
  NoDataComponent,
  BadgeComponent,
  StatsSkillsComponent,
  StatsTotalComponent
} from './components';

@NgModule({
  declarations: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent,
    InfoPanelComponent,
    PlayerInfoPanelComponent,
    NoDataComponent,
    BadgeComponent,
    StatsSkillsComponent,
    StatsTotalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
  ],
  exports: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent,
    InfoPanelComponent,
    PlayerInfoPanelComponent,
    NoDataComponent,
    BadgeComponent,
    StatsSkillsComponent,
    StatsTotalComponent
  ]
})
export class ShareModule { }
