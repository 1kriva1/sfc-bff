import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ShareModule } from "@share/share.module";
import {
    RequestTeamPlayerPreviewComponent,
    RequestTeamPlayerViewFootballProfileComponent,
    RequestTeamPlayerViewGeneralProfileComponent,
    RequestTeamPlayerViewMainComponent,
    RequestTeamPlayerViewProfileComponent,
    RequestTeamPlayerViewPageComponent
} from "./parts/team/player";
import { RequestRoutingModule } from "./request-routing.module";
import {
    RequestGameTeamCreatePageComponent,
    RequestGameTeamEditPageComponent,
    RequestGameTeamViewPageComponent
} from "./parts/game/team";
import {
    RequestGamePlayerCreatePageComponent,
    RequestGamePlayerEditPageComponent,
    RequestGamePlayerViewPageComponent
} from "./parts/game/player";

@NgModule({
    declarations: [
        // request/team/player
        RequestTeamPlayerPreviewComponent,
        RequestTeamPlayerViewFootballProfileComponent,
        RequestTeamPlayerViewGeneralProfileComponent,
        RequestTeamPlayerViewMainComponent,
        RequestTeamPlayerViewProfileComponent,
        RequestTeamPlayerViewPageComponent,
        // request/team/player
        RequestGamePlayerCreatePageComponent,
        RequestGamePlayerEditPageComponent,
        RequestGamePlayerViewPageComponent,
        // request/team/team
        RequestGameTeamCreatePageComponent,
        RequestGameTeamEditPageComponent,
        RequestGameTeamViewPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        RequestRoutingModule
    ],
    exports: []
})
export class RequestModule { }