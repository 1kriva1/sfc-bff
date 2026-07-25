import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ShareModule } from "@share/share.module";
import { SchemeFormationEditFieldComponent } from "./components";
import { SchemeRoutingModule } from "./scheme-routing.module";
import {
    SchemeTeamCreatePageComponent,
    SchemeTeamEditPageComponent,
    SchemeTeamFormationEditComponent,
    SchemeTeamFormationProgressComponent,
    SchemeTeamInformationProgressComponent,
    SchemeTeamMainEditComponent,
    SchemeTeamPreviewComponent,
    SchemeTeamProfileEditComponent,
    SchemeTeamProfileGeneralEditComponent,
    SchemeTeamViewGeneralProfileComponent,
    SchemeTeamViewMainComponent,
    SchemeTeamViewPageComponent,
    SchemeTeamViewProfileComponent

} from "./parts/team";
import {
    SchemeGameTeamCreatePageComponent,
    SchemeGameTeamEditMainComponent,
    SchemeGameTeamEditPageComponent,
    SchemeGameTeamEditProgressComponent,
    SchemeGameTeamFinalEditComponent,
    SchemeGameTeamFormationEditComponent,
    SchemeGameTeamGeneralProfileEditComponent,
    SchemeGameTeamPreviewComponent,
    SchemeGameTeamProfileEditComponent,
    SchemeGameTeamViewPageComponent 
} from "./parts/game";

@NgModule({
    declarations: [
        // scheme/team/components
        SchemeTeamFormationEditComponent,
        SchemeFormationEditFieldComponent,
        SchemeTeamFormationProgressComponent,
        SchemeTeamInformationProgressComponent,
        SchemeTeamMainEditComponent,
        SchemeTeamPreviewComponent,
        SchemeTeamProfileEditComponent,
        SchemeTeamProfileGeneralEditComponent,
        // scheme/team/page/create
        SchemeTeamCreatePageComponent,
        // scheme/team/page/edit
        SchemeTeamEditPageComponent,
        // scheme/team/page/view
        SchemeTeamViewPageComponent,
        // scheme/team/page/view/components
        SchemeTeamViewGeneralProfileComponent,
        SchemeTeamViewMainComponent,
        SchemeTeamViewProfileComponent,
        // scheme/game/team/components/edit
        SchemeGameTeamProfileEditComponent,
        SchemeGameTeamGeneralProfileEditComponent,
        SchemeGameTeamFormationEditComponent,
        // scheme/game/team/create 
        SchemeGameTeamCreatePageComponent,
        // scheme/game/team/page/create/components
        SchemeGameTeamFinalEditComponent,
        SchemeGameTeamPreviewComponent,
        SchemeGameTeamEditProgressComponent,
        // scheme/game/team/edit
        SchemeGameTeamEditPageComponent,
        // scheme/game/team/page/edit/components
        SchemeGameTeamEditMainComponent,
        // scheme/game/team/view
        SchemeGameTeamViewPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        SchemeRoutingModule
    ],
    exports: []
})
export class SchemeModule { }