import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiResponse } from 'src/core/interfaces/api-response';
import { Gateway } from 'src/core/interfaces/gateway';
import { Project } from 'src/core/interfaces/project';
import { GatewaysService } from 'src/core/services/gateways.service';
import { ProjectsService } from 'src/core/services/projects.service';

@Component({
  selector: 'app-reports-header',
  templateUrl: './reports-header.component.html',
  styleUrls: ['./reports-header.component.scss'],
})
export class ReportsHeaderComponent implements OnInit {
  protected projectList: Project[] = [];
  protected gatewayList: Gateway[] = [];
  protected filtersForm: FormGroup = new FormGroup({});

  @Input() navOpened = false;

  constructor(
    private projectsService: ProjectsService,
    private gatewaysService: GatewaysService
  ) {}

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      project: new FormControl('AllProjects'),
      gateway: new FormControl('AllGateways'),
    });

    this.projectsService.getProjects().subscribe(
      (projects) => {
        const projectsData = (projects as ApiResponse<Project[]>)?.data;
        if (projectsData) this.projectList = projectsData;
      },
      (err) => (this.projectList = [])
    );

    this.gatewaysService.getGateways().subscribe(
      (gateways) => {
        const gatewaysData = (gateways as ApiResponse<Gateway[]>)?.data;
        if (gatewaysData) this.gatewayList = gatewaysData;
      },
      (err) => (this.gatewayList = [])
    );
  }
}
