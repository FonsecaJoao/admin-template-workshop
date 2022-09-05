import { Component, OnInit } from '@angular/core';
import { adaptReportDateBasedOnFilterValues } from 'src/app/utils/report.adapter';
import { ApiResponse } from 'src/core/interfaces/api-response';
import { Gateway } from 'src/core/interfaces/gateway';
import { Project } from 'src/core/interfaces/project';
import { Report } from 'src/core/interfaces/report';
import { ReportFormattedData } from 'src/core/interfaces/report-formatted-data';
import { ReportPayload } from 'src/core/interfaces/report-payload';
import { User } from 'src/core/interfaces/user';
import { ReportsService } from 'src/core/services/reports.service';
import { UsersService } from 'src/core/services/users.service';

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
  protected userInfo: { initials: string; name: string } = {
    initials: '',
    name: '',
  };
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
  protected noResultsContent: {
    title: string;
    description: string;
    imagePath: string;
  } = {
    title: 'No results',
    description:
      'Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown.',
    imagePath: 'assets/imgs/no-results.svg',
  };

  constructor(
    private reportsService: ReportsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      const userData = users as ApiResponse<User[]>;
      const { firstName, lastName } = userData.data[0];
      this.userInfo = {
        initials: firstName?.slice(0, 1) + lastName?.slice(0, 1),
        name: firstName + ' ' + lastName,
      };
    });
  }

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

        this.noResultsContent = {
          title: 'No results',
          description:
            'Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown.',
          imagePath: 'assets/imgs/no-results.svg',
        };

        this.hasResults = true;
      } else {
        this.reportData = {};
        this.hasResults = false;
      }
    });
  }
}
