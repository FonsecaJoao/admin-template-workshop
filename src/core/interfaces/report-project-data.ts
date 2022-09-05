export interface ReportProjectData {
  tableData: ReportProjectRow[];
  totalProjectAmount?: number;
  projectName?: string;
}

export interface ReportProjectRow {
  created: string;
  gatewayId: string;
  gatewayName: string;
  paymentId: string;
  amount: number;
}
