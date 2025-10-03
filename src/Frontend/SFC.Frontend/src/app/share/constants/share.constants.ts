import { IEnumModel } from "@core/types";
import { ShareLocalization } from "@share/localization";

export class ShareConstants {
    static get FOOTBALL_POSITION_EMPTY(): IEnumModel<number> { return { key: null!, value: ShareLocalization.NO_FOOTBALL_POSITION } };
}
