import { HttpResponse } from "@angular/common/http";
import { map, OperatorFunction, pipe } from "rxjs";
import { HttpConstants } from "../../constants";
import { BaseListResponse, IPageMetadataModel, IPageModel } from "../../models";

export function mapPaginationResponse<R, I>(mapItems: (item: R) => I)
    : OperatorFunction<HttpResponse<BaseListResponse<R>>, IPageModel<I>> {
    return pipe(
        map((response: HttpResponse<BaseListResponse<R>>) => {
            const paginationHeader = response.headers.get(HttpConstants.PAGINATION_HEADER_KEY)!,
                pagination: IPageMetadataModel = JSON.parse(paginationHeader),
                items: I[] = response.body!.Items.map(mapItems);

            return { items: items, total: pagination.TotalCount, next: pagination.HasNextPage };
        })
    );
}