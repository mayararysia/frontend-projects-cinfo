import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  project: Project = {
    name: '',
    description: '',
    professor: '',
    students: '',
    period: '',
    status: ''
  };

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createProject(): void {
    this.projectService.create(this.project).subscribe(() => {
      this.projectService.showMessage('Projeto criado!');
      this.router.navigate(['/projects']);
    });
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}
