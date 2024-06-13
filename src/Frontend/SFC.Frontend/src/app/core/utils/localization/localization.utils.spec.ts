import { getLongMonth, getShortMonth } from "./localization.utils";

describe('Core.Utils:Localization', () => {
    describe('Month', () => {
        fit('Should return short month', () => {
            const result = getShortMonth('dEc');

            expect(result).toEqual('Dec');
        });

        fit('Should return long month', () => {
            const result = getLongMonth('dEcember');

            expect(result).toEqual('December');
        });
    });
});