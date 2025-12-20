import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";

export interface IPredicateModel<TFiltersFormModel> {
    value: TFiltersFormModel | empty;
    previous: TFiltersFormModel | empty;
    metadata: IPredicateMetadataModel[];
    changedProperty?: IPredicateMetadataModel | empty;
}

export interface IPredicateMetadataModel {
    key: string;
    value: any;
    mapValue: any;
    label: string;
    image?: string;
    icon?: IconDefinition;
    debounce?: number | empty;
}

export interface IPredicateMapModel {
    label: string;
    value?: any | empty;
    image?: string;
    icon?: IconDefinition;
    debounce?: number | empty;
}