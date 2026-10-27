import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IEnumModel<T> {
    key: T;
    value: string;
    image?: string;
    icon?: IconDefinition;
}