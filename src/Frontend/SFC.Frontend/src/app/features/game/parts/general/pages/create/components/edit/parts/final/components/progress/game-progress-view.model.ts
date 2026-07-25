import { IMapProgressModel } from "@share/utils";

export interface IGameProgressViewModel {
    teams:  IMapProgressModel;
    general: IMapProgressModel;
    inventary: IMapProgressModel;
    financial: IMapProgressModel;
}