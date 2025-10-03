export interface IFormationEnumModel {
    key: number; // ID
    /* Link to formationPositions IDs
    [1, 3, 2],
    [6, 8, 8, 7],
    [11, 13, 12]
    */
    value: number[][];
    description: string;
    label: string;
    image:string;
}