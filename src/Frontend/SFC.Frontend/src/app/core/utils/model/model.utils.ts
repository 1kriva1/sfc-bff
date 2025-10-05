import { BaseErrorResponse, IResolverModel } from "../../models";
import { ResolverType } from "../../types";
import { all } from "ngx-sfc-common";

export function buildLocalResolverModel<TResult>(success: boolean, result: TResult)
    : IResolverModel<TResult> {
    return {
        success: success,
        result: result
    };
}

export function buildResolverModel<TResult, TResponse extends BaseErrorResponse>(response: TResponse, result: TResult)
    : IResolverModel<TResult> {
    return {
        success: response.Success,
        result: result
    };
}

export function buildResolverModelMultiple<TResult>(responses: ResolverType, result: TResult)
    : IResolverModel<TResult> {
    return {
        success: all(Object.values(responses), response => response.Success),
        result: result
    };
}

export function buildErrorResolverModel<TResult>(response: BaseErrorResponse)
    : IResolverModel<TResult> {
    return { result: null, success: false, message: response.Message };
}

export function buildErrorResolverModelMultiple<TResult>(responses: ResolverType)
    : IResolverModel<TResult> {
    return { result: null, success: false, message: Object.values(responses).map(response => response.Message).join() };
}