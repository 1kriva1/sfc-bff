import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoreLocalization } from '@core/localization';
import { IPredicateMetadataModel } from '@core/utils';
import { addItem, any, ITagModel, updatePropertyByPath } from 'ngx-sfc-common';
import { EMPTY, map, Observable } from 'rxjs';

@Component({
    selector: 'sfc-filter-tags',
    templateUrl: './filter-tags.component.html',
    styleUrls: ['./filter-tags.component.scss']
})
export class FilterTagsComponent implements OnInit {

    /* Inputs */

    @Input()
    metadata$: Observable<IPredicateMetadataModel[]> = EMPTY;

    @Input()
    form!: FormGroup;

    /* End Inputs */

    /* Fields */

    public tags$: Observable<ITagModel[]> = EMPTY;

    public resetTag: ITagModel = { label: CoreLocalization.RESET, click: (_: ITagModel) => this.resetFilters() };

    private defaultFilterModel: any;

    /* End Fields */

    ngOnInit(): void {
        this.defaultFilterModel = this.form.value;

        this.tags$ = this.metadata$.pipe(
            map((metadata: IPredicateMetadataModel[]) => {
                const tags: ITagModel[] = metadata.map((item: IPredicateMetadataModel) => ({
                    key: item.path,
                    label: `${item.label}: ${item.mapValue}`,
                    args: item.value,
                    imageSrc: item.image,
                    icon: item.icon,
                    allowRemove: true
                }));

                if (any(tags)) {
                    addItem(tags, this.resetTag);
                }

                return tags;
            })
        );
    }

    public onFilterTagRemove(model: ITagModel): void {
        const newFormValue: any = updatePropertyByPath<any>(this.form.value, model.key, null, model.args);
        this.form.patchValue(newFormValue, { emitEvent: true });
    }

    private resetFilters(): void {
        this.form.patchValue(this.defaultFilterModel, { emitEvent: true });
    }
}
