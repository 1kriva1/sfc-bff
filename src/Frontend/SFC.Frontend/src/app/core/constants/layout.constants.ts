import { ILayoutModel } from "../models/layout.model";

export class LayoutConstants {
    static FULL_LAYOUT_MODEL: ILayoutModel = { header: true, footer: true };
    static ONLY_HEADER_LAYOUT_MODEL: ILayoutModel = { header: true, footer: false };
    static ONLY_FOOTER_LAYOUT_MODEL: ILayoutModel = { header: false, footer: true };
    static ONLY_CONTENT_LAYOUT_MODEL: ILayoutModel = { header: false, footer: false };
}