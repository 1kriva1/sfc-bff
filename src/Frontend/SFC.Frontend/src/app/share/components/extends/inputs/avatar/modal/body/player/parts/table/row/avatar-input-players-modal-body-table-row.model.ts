import { IEnumModel } from "@share/models";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { empty } from "ngx-sfc-common";

export interface IAvatarInputPlayersModalBodyTableRowModel {
    position: IEnumModel<number> | empty;
    physicalCondition: number;
    player: IPlayerInfoModel;
}