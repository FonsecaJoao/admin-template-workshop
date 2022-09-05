import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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

  @Output() onGenerateReportClick = new EventEmitter();

  constructor(
    private projectsService: ProjectsService,
    private gatewaysService: GatewaysService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'datepicker',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/date.svg')
    );
  }

  ngOnInit(): void {
    this.initialize();
  }

  protected clearDate(event: Event, key: string): void {
    event.stopPropagation();
    this.filtersForm.get(key)?.setValue(null);
  }

  protected submitForm(): void {
    const { project, gateway, fromDate, toDate } = this.filtersForm.controls;

    this.onGenerateReportClick.emit({
      project: project.value,
      gateway: gateway.value,
      fromDate: fromDate.value,
      toDate: toDate.value,
      projectsData: this.projectList,
      gatewaysData: this.gatewayList,
    });
  }

  private initialize() {
    this.initForm();
    this.requestData();
  }

  private initForm() {
    this.filtersForm = new FormGroup({
      project: new FormControl('AllProjects'),
      gateway: new FormControl('AllGateways'),
      fromDate: new FormControl({ value: '', disabled: true }),
      toDate: new FormControl({ value: '', disabled: true }),
    });
  }

  private requestData() {
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
