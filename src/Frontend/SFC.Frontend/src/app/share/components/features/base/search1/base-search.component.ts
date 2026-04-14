import { Directive } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BaseTableComponent } from "../../../extends/components/table/base-table.component";
import { CommonConstants } from "ngx-sfc-common";
import { ITabModel, TabsTemplate } from "ngx-sfc-components";

@Directive()
export abstract class BaseSearchComponent<TPredicateFormModel, TRequestServiceFiltersModel, TResponseServiceItemModel, TTableModel>
    extends BaseTableComponent<TPredicateFormModel, TRequestServiceFiltersModel, TResponseServiceItemModel, TTableModel>{

    // icons
    faSearch = faSearch;

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // ngx-sfc-components
    TabsTemplate = TabsTemplate;

    /* Abstract */    

    public abstract tabs: ITabModel[];    

    /* End Abstract */
}