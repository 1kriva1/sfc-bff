import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreviewType } from '../../preview-data-type.enum';
import { IPlayersByPositionModel } from './players-by-position-preview.model';

@Component({
    selector: 'sfc-players-by-position-preview',
    templateUrl: './players-by-position-preview.component.html',
    styleUrls: ['./players-by-position-preview.component.scss']
})
export class PlayersByPositionPreviewComponent {

    PreviewType = PreviewType;

    @Input()
    model!: IPlayersByPositionModel;

    @Input()
    type: PreviewType = PreviewType.List;

    @Output()
    remove: EventEmitter<number> = new EventEmitter<number>();
}