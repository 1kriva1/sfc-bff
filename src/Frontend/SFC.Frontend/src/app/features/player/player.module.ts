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
} from './pages/view/parts';
import {
    PlayerRecommendationComponent,
    PlayersRecommendationComponent
} from './pages/search/parts';
import { ViewPageComponent } from './pages/view/view.page.component';
import { SearchPageComponent } from './pages/search/search.page.component';

@NgModule({
    declarations: [
        SearchPageComponent,
        PlayersRecommendationComponent,
        PlayerRecommendationComponent,
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