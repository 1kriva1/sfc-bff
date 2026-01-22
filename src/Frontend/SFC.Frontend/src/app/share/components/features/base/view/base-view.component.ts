import { Directive, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { getPartUrlSegments } from "@core/utils";
import { setTabsSelectedItemByIds } from "@share/utils";
import { Direction } from "ngx-sfc-common";
import { ITabModel, TabsTemplate } from "ngx-sfc-components";

@Directive()
export abstract class BaseViewComponent<TModel, TInfoModel> implements OnInit {

    // ngx-sfc-common
    Direction = Direction;

    // ngx-sfc-components
    TabsTemplate = TabsTemplate;

    /* Abstract */

    // properties
    protected abstract get model(): TModel;

    // fields
    public abstract tabs: ITabModel[];

    // methods
    protected abstract buildInfoModel(): TInfoModel;

    protected abstract buildPageTitle(): string;

    /* End Abstract */    

    /* Fields */

    public infoModel!: TInfoModel;

    /* End Fields */

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected titleService: Title
    ) { }

    ngOnInit(): void {
        // set page title
        this.setPageTitle();

        // set selected tab
        this.setTabsSelectedItem();

        // build info model
        this.infoModel = this.buildInfoModel();
    }

    public onTabSelected(model: ITabModel): void {
        this.navigate(model.data);
    }

    private setTabsSelectedItem(): void {
        const segments: string[] = getPartUrlSegments(this.router.url);
        setTabsSelectedItemByIds(this.tabs, segments);
    }

    private setPageTitle(): void {
        const pageTitle = this.buildPageTitle();
        this.titleService.setTitle(pageTitle);
    }    

    private navigate(command: string): void {
        this.router.navigate([command], { relativeTo: this.route });
    }
}