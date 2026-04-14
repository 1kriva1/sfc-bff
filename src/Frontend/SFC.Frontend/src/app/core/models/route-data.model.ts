import { ILayoutModel } from "./layout.model";
import { IScrollModel } from "./scroll.model";
import { IThemeModel } from "./theme.model";

export interface IRouteDataModel {
    layout: ILayoutModel;
    theme?: IThemeModel;
    scroll?: IScrollModel;
}