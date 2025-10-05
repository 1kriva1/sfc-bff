import { IEnumModel } from "@core/types";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";
import { empty } from "ngx-sfc-common";

export interface IAvatarInputTeamPlayersModalBodyTableRowModel {
    position: IEnumModel<number> | empty;
    status: IEnumModel<number>;
    physicalCondition: number;
    player: IPlayerInfoModel;
}