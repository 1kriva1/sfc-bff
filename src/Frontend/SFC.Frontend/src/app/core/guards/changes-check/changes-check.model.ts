import { ChangesCheckService } from "./changes-check.service";

export interface IChangesCheckGuardModel {
  discardChanges: boolean;
  dirty: boolean;
}

export interface IChangesCheck {
  changesCheckService: ChangesCheckService;
}