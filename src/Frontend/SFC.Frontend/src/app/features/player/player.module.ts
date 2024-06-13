import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayerRoutingModule } from './player-routing.module';
import { ShareModule } from '@share/share.module';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import {
    ViewPageComponent,
    ViewInfoPanelComponent,
    GeneralViewComponent,
    StatsViewComponent,
    DashboardViewComponent,
    GamesViewComponent,
    GameRowComponent,
    TeamRowComponent,
    TeamsViewComponent,
    BadgesViewComponent,
    BadgeCardComponent
} from './pages/view';
import {
    FootballFilterComponent,
    GeneralFilterComponent,
    PlayerRecommendationComponent,
    PlayerCardComponent,
    PlayersRecommendationComponent,
    PlayerRowComponent,
    PlayerRowContentComponent,
    SearchPageComponent,
    StatsFilterComponent
} from './pages/search';

@NgModule({
    declarations: [
        SearchPageComponent,
        GeneralFilterComponent,
        FootballFilterComponent,
        StatsFilterComponent,
        PlayersRecommendationComponent,
        PlayerRecommendationComponent,
        PlayerRowComponent,
        PlayerRowContentComponent,
        PlayerCardComponent,
        ViewPageComponent,
        ViewInfoPanelComponent,
        GeneralViewComponent,
        StatsViewComponent,
        DashboardViewComponent,
        GamesViewComponent,
        GameRowComponent,
        TeamsViewComponent,
        TeamRowComponent,
        BadgesViewComponent,
        BadgeCardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        PlayerRoutingModule
    ],
    exports: []
})
export class PlayerModule { }
