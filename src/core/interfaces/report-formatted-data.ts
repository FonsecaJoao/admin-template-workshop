import { ReportProjectData } from './report-project-data';

export interface ReportFormattedData {
  list?: Map<string, ReportProjectData>;
  totalAmount?: number;
  title?: string;
}
