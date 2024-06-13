import { getMonths, getWeekDays } from "./enum.utils";

describe('Core.Utils:Enum', () => {
    describe('Week days', () => {
        fit('Should return week days', () => {
            const result = getWeekDays();

            expect(result).toEqual([
                { key: 0, value: 'Sunday' },
                { key: 1, value: 'Monday' },
                { key: 2, value: 'Tuesday' },
                { key: 3, value: 'Wednesday' },
                { key: 4, value: 'Thursday' },
                { key: 5, value: 'Friday' },
                { key: 6, value: 'Saturday' }
            ]);
        });

        fit('Should return specific week day', () => {
            const result = getWeekDays(4);

            expect(result).toEqual({ key: 4, value: 'Thursday' });
        });

        fit('Should return specific week days', () => {
            const result = getWeekDays([1, 6]);

            expect(result).toEqual([
                { key: 1, value: 'Monday' },
                { key: 6, value: 'Saturday' }
            ]);
        });

        fit('Should not find specific week day', () => {
            const result = getWeekDays(22);

            expect(result).toBeNull();
        });
    });

    describe('Months', () => {
        fit('Should return months', () => {
            const result = getMonths();

            expect(result).toEqual([
                { key: 0, value: 'January' },
                { key: 1, value: 'February' },
                { key: 2, value: 'March' },
                { key: 3, value: 'April' },
                { key: 4, value: 'May' },
                { key: 5, value: 'June' },
                { key: 6, value: 'July' },
                { key: 7, value: 'August' },
                { key: 8, value: 'September' },
                { key: 9, value: 'October' },
                { key: 10, value: 'November' },
                { key: 11, value: 'December' }
            ]);
        });

        fit('Should return short months', () => {
            const result = getMonths(null, true);

            expect(result).toEqual([
                { key: 0, value: 'Jan' },
                { key: 1, value: 'Feb' },
                { key: 2, value: 'Mar' },
                { key: 3, value: 'Apr' },
                { key: 4, value: 'May' },
                { key: 5, value: 'Jun' },
                { key: 6, value: 'Jul' },
                { key: 7, value: 'Aug' },
                { key: 8, value: 'Sep' },
                { key: 9, value: 'Oct' },
                { key: 10, value: 'Nov' },
                { key: 11, value: 'Dec' }
            ]);
        });

        fit('Should return specific month', () => {
            const result = getMonths(4);

            expect(result).toEqual({ key: 4, value: 'May' });
        });

        fit('Should return specific months', () => {
            const result = getMonths([1, 6]);

            expect(result).toEqual([
                { key: 1, value: 'February' },
                { key: 6, value: 'July' }
            ]);
        });

        fit('Should not find specific month', () => {
            const result = getMonths(22);

            expect(result).toBeNull();
        });
    });
});