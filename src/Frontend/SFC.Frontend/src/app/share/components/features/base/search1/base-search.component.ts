import { Directive } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BaseTableComponent } from "@share/components";
import { CommonConstants } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel, ITabModel, TabsTemplate } from "ngx-sfc-components";
import { BaseSearchConstants } from "./base-search.constants";

@Directive()
export abstract class BaseSearchComponent<TPredicateFormModel, TRequestServiceFiltersModel, TResponseServiceItemModel, TTableModel>
    extends BaseTableComponent<TPredicateFormModel, TRequestServiceFiltersModel, TResponseServiceItemModel, TTableModel>{

    // icons
    faSearch = faSearch;

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // ngx-sfc-components
    TabsTemplate = TabsTemplate;

    // component
    SearchConstants = BaseSearchConstants;

    /* Abstract */

    public abstract columns: ITableColumnExtendedModel[];

    public abstract tabs: ITabModel[];

    protected abstract buildActions(model: TTableModel): IDropdownMenuItemModel[];

    /* End Abstract */
}