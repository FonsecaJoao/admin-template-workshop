import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiResponse } from 'src/core/interfaces/api-response';
import { Project } from 'src/core/interfaces/project';
import { ProjectsService } from 'src/core/services/projects.service';

@Component({
  selector: 'app-reports-header',
  templateUrl: './reports-header.component.html',
  styleUrls: ['./reports-header.component.scss'],
})
export class ReportsHeaderComponent implements OnInit {
  protected projectList: Project[] = [];
  protected filtersForm: FormGroup = new FormGroup({});
  @Input() navOpened = false;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      project: new FormControl('AllProjects'),
    });

    this.projectsService.getProjects().subscribe(
      (projects) => {
        const projectsData = (projects as ApiResponse<Project[]>)?.data;
        if (projectsData) this.projectList = projectsData;
      },
      (err) => (this.projectList = [])
    );
  }
}
