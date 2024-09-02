import { IInformationEditModel } from "../../../components/edit/information/information-edit.model";

export interface IBaseEditPageModel {
    logo: File | null;
    information: IInformationEditModel;
    players: number[];
}