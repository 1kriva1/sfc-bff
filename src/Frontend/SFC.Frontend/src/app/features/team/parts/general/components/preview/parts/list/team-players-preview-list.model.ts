import { IEnumModel } from "@core/types";
import { ITeamPlayersPreviewListPartModel } from "./parts/team-players-preview-list-part.model";

export interface ITeamPlayersPreviewListModel {
    position: IEnumModel<number>;
    players: ITeamPlayersPreviewListPartModel[];
}