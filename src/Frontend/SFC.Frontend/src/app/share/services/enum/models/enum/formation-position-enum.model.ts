export interface IFormationPositionEnumModel {
    key: number; // ID
    value: string; // for example: LB, GK, FW ...
    footballPosition: number; // FK to footballPositions enum
}