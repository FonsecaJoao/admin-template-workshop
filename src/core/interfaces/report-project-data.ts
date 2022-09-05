export interface ReportProjectData {
  tableData: ReportProjectRow[];
  totalProjectAmount?: number;
  projectName?: string;
}

interface ReportProjectRow {
  created: string;
  gatewayId: string;
  gatewayName: string;
  paymentId: string;
  amount: number;
}
