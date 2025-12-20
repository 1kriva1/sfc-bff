import { empty } from "ngx-sfc-common";
import { IPredicateMapModel } from "./predicate.model";

export type MapPredicateModelFunction = (key: string, value: any, enums?: any | empty) => IPredicateMapModel;