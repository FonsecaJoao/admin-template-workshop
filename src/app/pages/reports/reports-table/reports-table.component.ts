import { Component, Input, OnInit } from '@angular/core';
import { ReportFormattedData } from 'src/core/interfaces/report-formatted-data';
import { ReportProjectData } from 'src/core/interfaces/report-project-data';
@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss'],
})
export class ReportsTableComponent implements OnInit {
  protected panelOpenState = false;
  protected displayedColumns: string[] = [
    'created',
    'gatewayName',
    'paymentId',
    'amount',
  ];

  @Input() navOpened = false;
  @Input() reportData: ReportFormattedData = {};

  constructor() {}

  ngOnInit(): void {}

  trackByProjectName(index: number, item: ReportProjectData) {
    return item.projectName;
  }
}
