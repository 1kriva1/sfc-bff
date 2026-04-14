export {
    IGameModel as IGameServiceModel,
    IGameProfileModel as IGameProfileServiceModel,
    IGameGeneralProfileModel as IGameGeneralProfileServiceModel,
    IGameFinancialProfileModel as IGameFinancialProfileServiceModel,
    IGameInventaryProfileModel as IGameInventaryProfileServiceModel
} from './models/common/game.model';
export { ICreateGameModel } from './models/create/create-game.model';
export { ICreateGameRequest } from './models/create/create-game.request';
export { ICreateGameResponse } from './models/create/create-game.response';
export { GameService } from './game.service';