import { IEnumModel } from "@core/types";

export interface ITeamEditSquadProgressModel {
    positions: ITeamEditSquadPositionProgressModel[];
    metadata: ITeamEditSquadMetadataProgressModel;
}

export interface ITeamEditSquadPositionProgressModel {
    position: IEnumModel<number>;
    count: number;
    percentage: number;
}

export interface ITeamEditSquadMetadataProgressModel {
    count: number;
    raiting: number;
}