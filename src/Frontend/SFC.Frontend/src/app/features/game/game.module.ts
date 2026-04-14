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
    GameEditProgressComponent,
    GamePreviewMainComponent
} from "./parts/general";

@NgModule({
    declarations: [
        // components
        // edit
        GameTeamsEditComponent,
        GameProfileEditComponent,
        GameGeneralProfileEditComponent,
        GameInventaryProfileEditComponent,
        GameFinancialProfileEditComponent,
        GameFinalEditComponent,
        // progress
        GameEditProgressComponent,
        // preview
        GamePreviewMainComponent,
        // page/create
        GameCreatePageComponent,
        // page/edit
        // page/search
        // page/view
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