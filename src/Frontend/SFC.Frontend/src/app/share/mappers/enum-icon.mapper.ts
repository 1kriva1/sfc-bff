import {
    faAsterisk, faBan, faCheck, faClock, faFutbol,
    faPersonCane, faPowerOff, faUserInjured, faXmark, IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";

export function mapInviteStatuses(id: number): IconDefinition | empty {
    switch (id) {
        case 0:
            return faClock;
        case 1:
            return faCheck;
        case 2:
            return faBan;
        case 3:
            return faXmark;
        default:
            return null;
    }
}

export function mapRequestStatuses(id: number): IconDefinition | empty {
    switch (id) {
        case 0:
            return faClock;
        case 1:
            return faCheck;
        case 2:
            return faXmark;
        case 3:
            return faBan;
        default:
            return null;
    }
}

export function mapTeamStatuses(id: number): IconDefinition | empty {
    switch (id) {
        case 0:
            return faAsterisk;
        case 1:
            return faFutbol;
        case 2:
            return faPowerOff;
        case 3:
            return faBan;
        default:
            return null;
    }
}

export function mapTeamPlayerStatuses(id: number): IconDefinition | empty {
    switch (id) {
        case 0:
            return faFutbol;
        case 1:
            return faUserInjured;
        case 2:
            return faPersonCane;
        case 3:
            return faBan;
        case 4:
            return faXmark;
        default:
            return null;
    }
}