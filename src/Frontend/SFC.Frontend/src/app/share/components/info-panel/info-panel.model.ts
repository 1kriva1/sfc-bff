import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IInfoPanelModel {
    value: number;
    title: string;
    description: string;
    icon: IconDefinition;
    background: string;
    iconBackground: string;
}