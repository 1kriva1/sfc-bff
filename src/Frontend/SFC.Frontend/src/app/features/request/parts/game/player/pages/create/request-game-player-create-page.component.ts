import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationService } from "@core/services";
import { IRequestGamePlayerCreatePageFormModel } from "./request-game-player-create-page-form.model";
import { FormProgressService, IFormProgressStepModel } from "@share/components";

@Component({
    templateUrl: './request-game-player-create-page.component.html',
    styleUrls: ['./request-game-player-create-page.component.scss']
})
export class RequestGamePlayerCreatePageComponent implements OnInit {

    /* Fields */

    public form!: FormGroup;

    public steps: IFormProgressStepModel[] = [];

    /* End Fields */

    /* Properties */

    public get value(): IRequestGamePlayerCreatePageFormModel { return this.form.value; }

    /* End Properties */

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private formProgressService: FormProgressService) {
    }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.formProgressService.init(this.steps);
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});
        return form;
    }
}