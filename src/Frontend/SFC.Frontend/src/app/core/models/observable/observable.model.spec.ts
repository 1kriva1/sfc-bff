import { ObservableModel } from "./observable.model";

describe('Core.Models:Observable', () => {
    fit('Should return default value', () => {
        const model = new ObservableModel();

        expect(model.value).toBeNull();
    });

    fit('Should return defined default value', () => {
        const defaultValue = 'default_value',
            model = new ObservableModel(defaultValue);

        expect(model.value).toEqual(defaultValue);
    });

    fit('Should set value', () => {
        const value = { data: 'value' },
            model = new ObservableModel();

        model.subject.next({ data: value });

        model.value$.subscribe(value => {
            expect(value).toEqual(value);
            expect(model.value).toEqual(value.data);
        });
    });
});