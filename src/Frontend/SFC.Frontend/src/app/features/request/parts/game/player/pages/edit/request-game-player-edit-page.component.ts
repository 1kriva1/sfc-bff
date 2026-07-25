import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, startWith, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestGamePlayerEditPageConstants } from "./request-game-player-edit-page.constants";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { GameService, GameTeamService } from "@share/services";
import { RequestGamePlayerEditPageLocalization } from "./request-game-player-edit-page.localization";
import { NotificationService } from "@core/services";
import { buildPropertyPath, buildTitle, getUrlSegments } from "@core/utils";
import { Title } from "@angular/platform-browser";
import { IRequestGamePlayerEditPageModel } from "./models/request-game-player-edit-page.model";
import { RequestGamePlayerEditPageFormModel } from "./models/request-game-player-edit-page-form.model";
import { ISideMenuModel } from "ngx-sfc-components";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem } from "@share/utils";

@Component({
    templateUrl: './request-game-player-edit-page.component.html',
    styleUrls: ['./request-game-player-edit-page.component.scss']
})
export class RequestGamePlayerEditPageComponent implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Localization = RequestGamePlayerEditPageLocalization;

    public form!: FormGroup;

    public get value(): RequestGamePlayerEditPageFormModel { return this.form.value; }

    public get value$(): Observable<RequestGamePlayerEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public get model(): IRequestGamePlayerEditPageModel { return this.route.snapshot.data[RequestGamePlayerEditPageConstants.RESOLVE_KEY].result; };

    public menu: ISideMenuModel = {
        label: RequestGamePlayerEditPageLocalization.MENU.TITLE,
        open: true,
        switch: true,
        items: []
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public changesCheckService: ChangesCheckService,
        private notificationService: NotificationService,
        private titleService: Title,
        private gameService: GameService,
        private gameTeamService: GameTeamService
    ) {
    }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.changesCheckService.init(this.form);
        this.setPageTitle();
        this.setMenuActiveItem();
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        return form;
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle('Name');
        this.titleService.setTitle(pageTitle);
    }    

    private setMenuActiveItem(): void {
        const segments: string[] = getUrlSegments(this.router.url, -2);
        setMenuActiveItem(this.menu, buildPropertyPath(segments));
    }
}