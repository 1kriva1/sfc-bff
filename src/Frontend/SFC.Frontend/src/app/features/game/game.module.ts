import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ShareModule } from "@share/share.module";
import { GameRoutingModule } from "./game-routing.module";
import {
    GameCreatePageComponent,
    GameGeneralProfileEditComponent,
    GameInventaryProfileEditComponent,
    GameFinancialProfileEditComponent,
    GameTeamsEditComponent,
    GameProfileEditComponent,
    GameFinalEditComponent,
    GameProgressComponent,
    GamePreviewComponent,
    GameEditPageComponent,
    GameEditInvitesComponent,
    GameEditPlayerInvitesComponent,
    GameEditTeamInvitesComponent,
    GameEditTeamRequestsComponent,
    GameEditPlayerRequestsComponent,
    GameEditRequestsComponent,
    GameEditPlayersComponent,
    GameEditTeamsComponent,
    GameMainEditComponent
} from "./parts/general";
import {
    GamePlayerViewPageComponent
} from "./parts/player";
import {
    GameTeamCreatePageComponent,
    GameTeamEditPageComponent,
    GameTeamPlayersComponent,
    GameTeamEditSchemesComponent,
    GameTeamFinalEditComponent,
    GameTeamGeneralProfileEditComponent,
    GameTeamInventaryProfileEditComponent,
    GameTeamPlayersCurrentEditComponent,
    GameTeamPlayersEditComponent,
    GameTeamProfileEditComponent,
    GameTeamViewPageComponent,
    GameTeamEditMainComponent,
    GameTeamPreviewComponent,
    GameTeamEditProgressComponent,
    GameTeamPlayersGameComponent,
    GameTeamPlayersCurrentComponent,
    GameTeamPlayersTeamComponent
} from "./parts/team";

@NgModule({
    declarations: [
        // game/general/components        
        GameProfileEditComponent,
        GameGeneralProfileEditComponent,
        GameInventaryProfileEditComponent,
        GameFinancialProfileEditComponent,        
        // game/general/page/create
        GameCreatePageComponent,
        // game/general/page/create/components
        GamePreviewComponent,
        GameTeamsEditComponent,
        GameFinalEditComponent,
        GameProgressComponent,
        // game/general/page/edit
        GameEditPageComponent,
        // game/general/page/edit/components
        GameMainEditComponent,
        GameEditInvitesComponent,
        GameEditPlayerInvitesComponent,
        GameEditTeamInvitesComponent,
        GameEditRequestsComponent,
        GameEditPlayerRequestsComponent,
        GameEditTeamRequestsComponent,        
        GameEditPlayersComponent,
        GameEditTeamsComponent,
        // game/player/page/view
        GamePlayerViewPageComponent,
        // game/team/components        
        GameTeamProfileEditComponent,
        GameTeamGeneralProfileEditComponent,
        GameTeamInventaryProfileEditComponent,
        GameTeamPlayersGameComponent,           
        // game/team/page/create
        GameTeamCreatePageComponent,
        // game/team/page/create/components
        GameTeamPreviewComponent,
        GameTeamFinalEditComponent,
        GameTeamEditProgressComponent,
        GameTeamPlayersEditComponent,
        GameTeamPlayersCurrentEditComponent,
        // game/team/page/edit
        GameTeamEditPageComponent, 
        // game/team/page/edit/components
        GameTeamEditMainComponent,        
        GameTeamPlayersComponent,        
        GameTeamPlayersCurrentComponent,
        GameTeamPlayersTeamComponent,
        GameTeamEditSchemesComponent,
        // game/team/page/view
        GameTeamViewPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        GameRoutingModule
    ],
    exports: []
})
export class GameModule { }