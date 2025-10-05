import { CoreConstants } from "@core/constants";
import { IPlayerModel } from "../../../models";

export function getPhoto(photo: string | null): string {
    return photo || CoreConstants.DEFAULT_AVATAR_PATH;
}

export function getFullName(model: IPlayerModel): string {
    return `${model.general.firstName} ${model.general.lastName}`;
}