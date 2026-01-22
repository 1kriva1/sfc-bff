import { IPredicateMapModel, IPredicateMapParametersModel } from "./predicate.model";

export type MapPredicateModelFunction = (parameters: IPredicateMapParametersModel) => IPredicateMapModel;