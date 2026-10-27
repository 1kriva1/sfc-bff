import { IEnumModel } from "@share/models";
import { ShareLocalization } from "@share/localization";

export class ShareConstants {
    static get FOOTBALL_POSITION_EMPTY(): IEnumModel<number> { return { key: null!, value: ShareLocalization.NO_FOOTBALL_POSITION } };
}
