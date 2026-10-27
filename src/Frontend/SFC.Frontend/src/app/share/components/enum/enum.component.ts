import { Component, Input } from '@angular/core';
import { IEnumModel } from "@share/models";
import { CommonConstants } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.scss']
})
export class EnumComponent {

  /* Inputs */

  @Input()
  enum: IEnumModel<number> = { key: 0, value: CommonConstants.EMPTY_STRING };

  /* End Inputs */
}
