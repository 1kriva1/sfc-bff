import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type IEnumModel<T> = {
    key: T;
    value: string;
    image?: string;
    icon?: IconDefinition;
}