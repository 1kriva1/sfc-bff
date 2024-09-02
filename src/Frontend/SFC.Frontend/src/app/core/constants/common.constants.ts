import { IEnumModel } from "../types";

export class CommonConstants {
    static LOCALE_KEY: string = 'locale';
    static THEME_KEY: string = 'theme';
    static APPLICATION_PREFIX: string = 'sfc';
    static DEFAULT_AVATAR_PATH: string = 'app/core/assets/images/default/avatar.png';
    static DEFAULT_FIELD_IMAGE_PATH: string = 'app/core/assets/images/default/field.png';
    static DEFAULT_TEAM_A_IMAGE_PATH: string = 'app/core/assets/images/default/team_a.png';
    static DEFAULT_TEAM_B_IMAGE_PATH: string = 'app/core/assets/images/default/team_b.png';
    static FOOTBALL_POSITION_EMPTY: IEnumModel<number> = { key: null!, value: 'No position' };
}