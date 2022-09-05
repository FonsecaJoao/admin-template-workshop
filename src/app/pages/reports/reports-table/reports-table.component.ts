import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportFormattedData } from 'src/core/interfaces/report-formatted-data';
import {
  ReportProjectData,
  ReportProjectRow,
} from 'src/core/interfaces/report-project-data';
@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss'],
})
export class ReportsTableComponent implements OnChanges {
  protected panelOpenState = false;
  protected displayedColumns: string[] = [
    'created',
    'gatewayName',
    'paymentId',
    'amount',
  ];

  protected tableData: ReportProjectRow[] = [];

  @Input() navOpened = false;
  @Input() reportData: ReportFormattedData = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['reportData'].previousValue?.['title'] !==
      changes['reportData'].currentValue?.['title']
    ) {
      const reportTableDataArray = this.reportData.list?.values().next()
        .value.tableData;
      this.tableData = [...reportTableDataArray];
    }
  }

  trackByProjectName(index: number, item: ReportProjectData) {
    return item.projectName;
  }
}
