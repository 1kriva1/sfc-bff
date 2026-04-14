import { IMapProgressModel } from "@share/utils";

export interface IGameEditProgressViewModel {
    teams:  IMapProgressModel;
    general: IMapProgressModel;
    inventary: IMapProgressModel;
    financial: IMapProgressModel;
}