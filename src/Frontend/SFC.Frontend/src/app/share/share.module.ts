import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import {
  IconTooltipComponent,
  LogoComponent,
  ThemeTogglerComponent,
  TitleComponent,
  InfoPanelComponent,
  NoDataComponent,
  BadgeComponent,
  StatsSkillsComponent,
  StatsTotalComponent,
  CarouselSliderComponent,
  AvailabilityEditComponent,
  AvailabilityFormComponent,
  AvailabilityListComponent,
  TabLabelCommonComponent,
  ShirtCarouselSliderContentComponent,
  ChangesCheckModalComponent,
  AvatarInputPlayersModalBodyComponent,
  AvatarInputPlayersModalBodyTableRowComponent,
  TeamSearchFilterGeneralComponent,
  TeamInfoComponent,
  StatusComponent,
  EnumComponent,
  BackComponent,
  TeamPreviewComponent,
  PlayerPreviewComponent,
  PanelComponent,
  CircleComponent,
  FormationCarouselSliderContentComponent,
  ExclamationModalComponent,
  SchemeInfoComponent,
  InviteTeamPlayerCancelModalComponent,
  RequestTeamPlayerAcceptModalComponent,
  RequestTeamPlayerDeclineModalComponent,
  SchemeTeamRemoveModalComponent,
  PlayerInfoComponent,
  GeneralFilterComponent,
  FootballFilterComponent,
  StatsFilterComponent,
  PlayerRowComponent,
  PlayerRowContentComponent,
  PlayerCardComponent,
  AvatarInputTeamsModalBodyComponent,
  AvatarInputTeamsModalBodyTableRowComponent,
  AvatarInputTeamPlayersModalBodyComponent,
  AvatarInputTeamPlayersModalBodyTableRowComponent,
  TeamSearchFilterFinancialComponent,
  TeamSearchFilterInventaryComponent
} from './components';
import { TimePipe, DayPipe } from './pipes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LogoComponent,
    ThemeTogglerComponent,
    IconTooltipComponent,
    TitleComponent,
    InfoPanelComponent,
    NoDataComponent,
    BadgeComponent,
    StatsSkillsComponent,
    StatsTotalComponent,
    AvailabilityEditComponent,
    AvailabilityFormComponent,
    AvailabilityListComponent,
    ChangesCheckModalComponent,
    ExclamationModalComponent,
    StatusComponent,
    EnumComponent,
    BackComponent,
    PanelComponent,
    CircleComponent,
    // extends
    ShirtCarouselSliderContentComponent,
    FormationCarouselSliderContentComponent,
    CarouselSliderComponent,
    TabLabelCommonComponent,
    AvatarInputPlayersModalBodyComponent,
    AvatarInputPlayersModalBodyTableRowComponent,
    AvatarInputTeamsModalBodyComponent,
    AvatarInputTeamsModalBodyTableRowComponent,
    AvatarInputTeamPlayersModalBodyComponent,
    AvatarInputTeamPlayersModalBodyTableRowComponent,
    // feature/player
    PlayerInfoComponent,
    PlayerPreviewComponent,
    GeneralFilterComponent,
    FootballFilterComponent,
    StatsFilterComponent,
    PlayerRowComponent,
    PlayerRowContentComponent,
    PlayerCardComponent,
    // feature/team
    TeamSearchFilterGeneralComponent,
    TeamSearchFilterFinancialComponent,
    TeamSearchFilterInventaryComponent,
    TeamInfoComponent,
    TeamPreviewComponent,
    // feature/scheme
    SchemeInfoComponent,
    SchemeTeamRemoveModalComponent,
    // feature/invite
    InviteTeamPlayerCancelModalComponent,
    // feature/request
    RequestTeamPlayerAcceptModalComponent,
    RequestTeamPlayerDeclineModalComponent,
    // pipes
    TimePipe,
    DayPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    StatusComponent,
    EnumComponent,
    BackComponent,
    PanelComponent,
    CircleComponent,
    NoDataComponent,
    BadgeComponent,
    StatsSkillsComponent,
    StatsTotalComponent,
    AvailabilityEditComponent,
    AvailabilityFormComponent,
    AvailabilityListComponent,
    ChangesCheckModalComponent,
    ExclamationModalComponent,
    // extends
    CarouselSliderComponent,
    ShirtCarouselSliderContentComponent,
    FormationCarouselSliderContentComponent,
    TabLabelCommonComponent,
    AvatarInputPlayersModalBodyComponent,
    AvatarInputTeamsModalBodyComponent,
    AvatarInputTeamPlayersModalBodyComponent,
    // feature/player
    PlayerInfoComponent,
    PlayerPreviewComponent,
    GeneralFilterComponent,
    FootballFilterComponent,
    StatsFilterComponent,
    PlayerRowComponent,
    PlayerRowContentComponent,
    PlayerCardComponent,
    // feature/team
    TeamSearchFilterGeneralComponent,
    TeamInfoComponent,
    TeamPreviewComponent,
    // feature/scheme
    SchemeInfoComponent,
    SchemeTeamRemoveModalComponent,
    // feature/invite
    InviteTeamPlayerCancelModalComponent,
    // feature/request
    RequestTeamPlayerAcceptModalComponent,
    RequestTeamPlayerDeclineModalComponent,
    // pipes
    TimePipe,
    DayPipe
  ]
})
export class ShareModule { }