import { EnumService } from "@share/services";
import { ENUM_SERVICE } from "@test/stubs";
import { IGetPlayerModel } from "../../../services/player/models/get";
import { IPlayerModel } from "./models";
import { mapPlayerModel } from "./view.page.mapper";

describe('Features.Player.View.Utils:Mapper', () => {
    fit('Should map available days', async () => {
        const model = getPlayerModel();
        model.Profile.General.Availability.Days = [1, 2];

        const result: IPlayerModel = await mapPlayerModel(model, ENUM_SERVICE as EnumService);

        expect(result.general.availability.days)
            .toEqual([{ key: 1, value: 'Monday' }, { key: 2, value: 'Tuesday' }]);
    });

    fit('Should map availability from and to values', async () => {
        const model = getPlayerModel();
        model.Profile.General.Availability.From = '14:10:00';
        model.Profile.General.Availability.To = '16:10:00';

        const result: IPlayerModel = await mapPlayerModel(model, ENUM_SERVICE as EnumService);

        expect(result.general.availability.from?.toTimeString())
            .toContain('14:10:00');
        expect(result.general.availability.to?.toTimeString())
            .toContain('16:10:00');
    });

    fit('Should map enum values', async () => {
        const model = getPlayerModel();
        model.Profile.Football.Position = 0;
        model.Profile.Football.AdditionalPosition = 1;
        model.Profile.Football.WorkingFoot = 0;
        model.Profile.Football.GameStyle = 0;

        const result: IPlayerModel = await mapPlayerModel(model, ENUM_SERVICE as EnumService);

        expect(result.football.position).toEqual({ key: 0, value: 'Goalkeeper', image:'app/core/assets/images/enums/position/0.png' });
        expect(result.football.additionalPosition).toEqual({ key: 1, value: 'Defender', image:'app/core/assets/images/enums/position/1.png' });
        expect(result.football.workingFoot).toEqual({ key: 0, value: 'Right', image:'app/core/assets/images/enums/foot/0.png' });
        expect(result.football.gameStyle).toEqual({ key: 0, value: 'Defend', image:'app/core/assets/images/enums/game-style/0.png' });
    });

    fit('Should map pure values', async () => {
        const model = getPlayerModel();

        const result: IPlayerModel = await mapPlayerModel(model, ENUM_SERVICE as EnumService);

        expect(result.general.firstName).toEqual('First name');
        expect(result.general.lastName).toEqual('Last name');
        expect(result.general.city).toEqual('City');
    });

    fit('Should map birthday', async () => {
        const model = getPlayerModel();
        model.Profile.General.Birthday = '1992-04-12'

        const result: IPlayerModel = await mapPlayerModel(model, ENUM_SERVICE as EnumService);

        expect(result.general.birthday).toEqual(new Date(1992, 3, 12, 3));
    });

    fit('Should map stats', async () => {
        const model = getPlayerModel();

        const result: IPlayerModel = await mapPlayerModel(model, ENUM_SERVICE as EnumService);

        expect(result.stats.value['0']).toEqual({ 0: 50, 1: 50 });
        expect(result.stats.value['1']).toEqual({
            2: 50,
            3: 50,
            4: 50,
            5: 50,
            6: 50,
            7: 50
        });        
        expect(result.stats.value['2']).toEqual({
            8: 50,
            9: 50,
            10: 50,
            11: 50,
            12: 50,
            13: 50
        });
        expect(result.stats.value['3']).toEqual({
            14: 50,
            15: 50,
            16: 50,
            17: 50,
            18: 50,
            19: 50
        });
        expect(result.stats.value['4']).toEqual({
            20: 50,
            21: 50,
            22: 50,
            23: 50,
            24: 50
        });
        expect(result.stats.value['5']).toEqual({
            25: 50,
            26: 50,
            27: 50,
            28: 50
        });        
    });

    function getPlayerModel(): IGetPlayerModel {
        return {
            Id: 1,
            Profile: {
                General: {
                    Photo: null,
                    FirstName: 'First name',
                    LastName: 'Last name',
                    Biography: null,
                    Birthday: null,
                    City: 'City',
                    Tags: null,
                    FreePlay: false,
                    Availability: {
                        From: null,
                        To: null,
                        Days: null
                    }
                },
                Football: {
                    Height: null,
                    Weight: null,
                    Position: null,
                    AdditionalPosition: null,
                    WorkingFoot: null,
                    Number: null,
                    GameStyle: null,
                    Skill: null,
                    WeakFoot: null,
                    PhysicalCondition: null,
                }
            },
            Stats: {
                Values: [
                    { Type: 0, Value: 50 },
                    { Type: 1, Value: 50 },
                    { Type: 3, Value: 50 },
                    { Type: 2, Value: 50 },
                    { Type: 4, Value: 50 },
                    { Type: 5, Value: 50 },
                    { Type: 6, Value: 50 },
                    { Type: 7, Value: 50 },
                    { Type: 8, Value: 50 },
                    { Type: 9, Value: 50 },
                    { Type: 10, Value: 50 },
                    { Type: 11, Value: 50 },
                    { Type: 12, Value: 50 },
                    { Type: 13, Value: 50 },
                    { Type: 14, Value: 50 },
                    { Type: 15, Value: 50 },
                    { Type: 16, Value: 50 },
                    { Type: 17, Value: 50 },
                    { Type: 18, Value: 50 },
                    { Type: 19, Value: 50 },
                    { Type: 20, Value: 50 },
                    { Type: 21, Value: 50 },
                    { Type: 22, Value: 50 },
                    { Type: 23, Value: 50 },
                    { Type: 24, Value: 50 },
                    { Type: 25, Value: 50 },
                    { Type: 26, Value: 50 },
                    { Type: 27, Value: 50 },
                    { Type: 28, Value: 50 }
                ]
            }
        }
    }
});