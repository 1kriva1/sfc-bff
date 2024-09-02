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
  StatsTotalComponent,
  CarouselSliderComponent
} from './components';
import { GeneralFilterComponent, FootballFilterComponent, StatsFilterComponent } from './components/players/search/filters';
import { PlayerCardComponent, PlayerRowComponent, PlayerRowContentComponent } from './components/players/search/table';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipe, DayPipe } from './pipes';

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
    StatsTotalComponent,
    CarouselSliderComponent,
    GeneralFilterComponent,
    FootballFilterComponent,
    StatsFilterComponent,
    PlayerRowComponent,
    PlayerRowContentComponent,
    PlayerCardComponent,
    // pipes
    TimePipe,
    DayPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    NgxSfcInputsModule
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
    StatsTotalComponent,
    CarouselSliderComponent,
    GeneralFilterComponent,
    FootballFilterComponent,
    StatsFilterComponent,
    PlayerRowComponent,
    PlayerRowContentComponent,
    PlayerCardComponent,
    // pipes
    TimePipe,
    DayPipe
  ]
})
export class ShareModule { }