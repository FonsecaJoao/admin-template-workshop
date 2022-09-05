import { Component, OnInit } from '@angular/core';
import { adaptReportDateBasedOnFilterValues } from 'src/app/utils/report.adapter';
import { ApiResponse } from 'src/core/interfaces/api-response';
import { Gateway } from 'src/core/interfaces/gateway';
import { Project } from 'src/core/interfaces/project';
import { Report } from 'src/core/interfaces/report';
import { ReportFormattedData } from 'src/core/interfaces/report-formatted-data';
import { ReportPayload } from 'src/core/interfaces/report-payload';
import { ReportsService } from 'src/core/services/reports.service';

interface Item {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  protected reportData: ReportFormattedData = {};
  protected openSideNav = false;
  protected menuItemList: Item[] = [
    { icon: 'assets/icons/project.svg', name: 'Projects' },
    { icon: 'assets/icons/menu-options.svg', name: 'Menu' },
    { icon: 'assets/icons/gateway.svg', name: 'Gateways' },
    { icon: 'assets/icons/chart.svg', name: 'Reports' },
    { icon: 'assets/icons/logout.svg', name: 'Logout' },
  ];
  protected hasResults = false;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {}

  onMenuIconClick(): void {
    this.openSideNav = !this.openSideNav;
  }

  requestReport(event: {
    project: string;
    gateway: string;
    fromDate: string;
    toDate: string;
    projectsData: Project[];
    gatewaysData: Gateway[];
  }): void {
    const payload: ReportPayload = {
      projectId: event.project === 'AllProjects' ? '' : event.project,
      gatewayId: event.gateway === 'AllGateways' ? '' : event.gateway,
      from: event.fromDate,
      to: event.toDate,
    };
    this.reportsService.sendReport(payload).subscribe((data) => {
      const reportData = (data as ApiResponse<Report[]>).data;

      if (reportData.length > 1) {
        this.reportData = adaptReportDateBasedOnFilterValues(
          reportData,
          payload,
          event.projectsData,
          event.gatewaysData
        );

        this.hasResults = true;
      } else {
        this.reportData = {};
      }
    });
  }
}
