import { empty, findChangedPropertyKey, firstOrDefault } from 'ngx-sfc-common';
import { Observable } from 'rxjs';
import { mapPredicateMetadataModels } from './predicate.mapper';
import { IPredicateMetadataModel, IPredicateModel } from './predicate.model';
import { MapPredicateModelFunction } from './predicate.type';

export function mapPredicateModel<TPredicateFormModel>(map: MapPredicateModelFunction, enums?: any | empty) {
    return (source: Observable<[TPredicateFormModel | empty, TPredicateFormModel | empty]>): Observable<IPredicateModel<TPredicateFormModel>> => {
        return new Observable<IPredicateModel<TPredicateFormModel>>((subscriber) => {
            return source.subscribe({
                next([previous, current]) {
                    try {
                        const key: string | empty = findChangedPropertyKey(previous, current),
                            metadata: IPredicateMetadataModel[] = mapPredicateMetadataModels(current, map, enums),
                            property: IPredicateMetadataModel | empty = firstOrDefault(metadata, (item: IPredicateMetadataModel) => item.key === key),
                            result: IPredicateModel<TPredicateFormModel> = {
                                value: current,
                                previous: previous,
                                metadata: metadata,
                                changedProperty: property
                            }

                        subscriber.next(result);
                    } catch (err) {
                        subscriber.error(err);
                    }
                },
                error(err) {
                    subscriber.error(err);
                },
                complete() {
                    subscriber.complete();
                }
            });
        });
    };
}