import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { InviteTeamPlayerService, InviteTeamPlayerStoreService, ITeamPlayerExistResponse, ITeamPlayerInviteExistRequest, ITeamPlayerInviteExistResponse, PlayerViewService, TeamPlayerService } from "@share/services";
import { LoaderService } from "ngx-sfc-common";
import { Observable, distinctUntilChanged, map, catchError, of, finalize } from "rxjs";

export class InviteTeamPlayerMainEditValidation {
    static playerAlreadyInTeamAsync(teamId: number, teamPlayerService: TeamPlayerService, loaderService?: LoaderService, controlId?: string): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            loaderService?.show(controlId);

            const playerId: number = control.value;

            return teamPlayerService.exist(teamId, playerId).pipe(
                distinctUntilChanged(),
                map((result: ITeamPlayerExistResponse) => result.Exist ? { sfcPlayerAlreadyInTeam: true } : null),
                catchError(() => of({ sfcValidationError: true })),
                finalize(() => loaderService?.hide(controlId))
            );
        };
    }

    static playerAlreadyHadActiveTeamInviteAsync(teamId: number, teamPlayerInviteService: InviteTeamPlayerService, loaderService?: LoaderService, controlId?: string): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            loaderService?.show(controlId);

            const playerId: number = control.value,
                request: ITeamPlayerInviteExistRequest = { Status: 0 };

            return teamPlayerInviteService.exist(teamId, playerId, request).pipe(
                distinctUntilChanged(),
                map((result: ITeamPlayerInviteExistResponse) => result.Exist ? { sfcPlayerAlreadyHadActiveTeamInvite: true } : null),
                catchError(() => of({ sfcValidationError: true })),
                finalize(() => loaderService?.hide(controlId))
            );
        };
    }

    static playerAlreadyInTeam(playerViewService: PlayerViewService): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const playerId: number = control.value;
            return playerViewService.playerId.value === playerId ? { sfcPlayerAlreadyInTeam: true } : null;
        };
    }

    static playerAlreadyHadActiveTeamInvite(inviteTeamPlayerStoreService: InviteTeamPlayerStoreService): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const playerId: number = control.value;
            return inviteTeamPlayerStoreService.exist(playerId) ? { sfcPlayerAlreadyHadActiveTeamInvite: true } : null;
        };
    }
}