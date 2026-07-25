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
export { IGetGameResponse } from './models/get/get-game.response';
export { IUpdateGameModel } from './models/update/update-game.model';
export { IUpdateGameRequest } from './models/update/update-game.request';
export { IUpdateGameResponse } from './models/update/update-game.response';
export { GameService } from './game.service';