import { Injectable } from '@angular/core';
import { isDefined, ObservableBehaviorModel } from 'ngx-sfc-common';
import { IPlayerViewModel } from './models/player-view.model';
import { IPlayerByUserModel } from '../general';

@Injectable({
  providedIn: 'root'
})
export class PlayerViewService {

  /* Properties */

  public playerId: ObservableBehaviorModel<number | null> = new ObservableBehaviorModel();

  public player: ObservableBehaviorModel<IPlayerViewModel | null> = new ObservableBehaviorModel();

  public get playerCreated(): boolean { return isDefined(this.playerId.value); }

  /* End Properties */

  public update(player: IPlayerByUserModel | null): void {
    const playerViewModel: IPlayerViewModel = {
      id: player?.Id!,
      profile: {
        general: {
          firstName: player?.Profile!.General.FirstName!,
          lastName: player?.Profile!.General.LastName!,
          photo: player?.Profile.General.Photo
        },
        football: {
          position: player?.Profile.Football.Position
        }
      }
    };

    this.player.subject.next(playerViewModel);
    this.playerId.subject.next(player?.Id!);
  }
}