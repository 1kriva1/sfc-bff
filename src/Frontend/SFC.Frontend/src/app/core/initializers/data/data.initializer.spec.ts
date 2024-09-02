import { EnumService, IdentityService } from "@share/services";
import { IEnumsModel } from "@share/services/enum/models/enums.model";
import { Observable, of } from "rxjs";
import { DataInitializer } from "./data.initializer";

describe('Core.Initializer:Data', () => {
    let identityServiceStub: Partial<IdentityService> = {};
    let enumServiceStub: Partial<EnumService> = {};
    let initializer: DataInitializer = new DataInitializer(
        identityServiceStub as IdentityService,
        enumServiceStub as EnumService
    );

    fit('Should return empty observable', () => {
        identityServiceStub.getIsAuthenticated = () => of(false);

        const result: Observable<IEnumsModel> = initializer.init();

        expect(result).not.toBeNull();
    });

    fit('Should return player response', (done) => {
        const enumsModel: IEnumsModel = {
            footballPositions: [
                { key: 0, value: 'Goalkeeper' },
                { key: 1, value: 'Defender' },
                { key: 2, value: 'Midfielder' },
                { key: 3, value: 'Forward' }
            ],
            gameStyles: [],
            statCategories: [],
            statSkills: [],
            statTypes: [],
            workingFoots: [],
            badgeTypes: [],
            gameStatuses: [],
            teamStatuses: [],
            shirts:[]
        };
        identityServiceStub.getIsAuthenticated = () => of(true);
        (enumServiceStub as any).load = () => of(enumsModel);

        initializer.init().subscribe(model => {
            expect(model).toBeDefined();
            expect(model.footballPositions).toEqual(enumsModel.footballPositions);
            done();
        });
    });
});