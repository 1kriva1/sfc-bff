import { IInformationEditModel } from "../../../components/edit/information/information-edit.model";

export interface ICreatePageModel {
    logo: File | null;
    information: IInformationEditModel;
    players: number[];
}