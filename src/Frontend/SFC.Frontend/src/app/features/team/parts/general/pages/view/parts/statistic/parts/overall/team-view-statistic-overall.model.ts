import { IInfoPanelModel } from "@share/components/info-panel/info-panel.model";

export interface ITeamViewStatisticOverallModel {
    panels: IInfoPanelModel[];
    resultsChartData: any;
    activitiesChartData: any;
    foulsChartData: any;
}