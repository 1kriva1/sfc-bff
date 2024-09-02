import { IInformationEditModel } from "../../../components/edit/information/information-edit.model";

export interface IEditPageModel {
    logo: File | null;
    information: IInformationEditModel;
    players: number[];
}