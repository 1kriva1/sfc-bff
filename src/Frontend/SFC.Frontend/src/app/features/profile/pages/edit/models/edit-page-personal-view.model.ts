import { buildPlaceholder } from "@core/utils";
import { isDefined, isNullOrEmptyString } from "ngx-sfc-common";
import { ISelectValue } from "ngx-sfc-inputs";
import { EditPageLocalization } from "../edit.page.localization";
import { IEditModel } from "./edit.page.model";

export class EditPagePersonalViewModel {

    public firstName!: string;

    public lastName!: string;

    public position: ISelectValue | null = null;

    public city!: string;

    constructor(model: IEditModel) {
        this.firstName = isNullOrEmptyString(model.general.firstName)
            ? buildPlaceholder(EditPageLocalization.VIEW_MODEL.NAME) : model.general.firstName;
        this.lastName = isNullOrEmptyString(model.general.lastName)
            ? buildPlaceholder(EditPageLocalization.VIEW_MODEL.SURNAME) : model.general.lastName;
        this.position = !isDefined(model.football.position)
            ? { key: null, value: buildPlaceholder(EditPageLocalization.VIEW_MODEL.POSITION) } : model.football.position;
        this.city = isNullOrEmptyString(model.general.city)
            ? buildPlaceholder(EditPageLocalization.VIEW_MODEL.CITY) : model.general.city;
    }
}