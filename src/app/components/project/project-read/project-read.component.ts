import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-read',
  templateUrl: './project-read.component.html',
  styleUrls: ['./project-read.component.css']
})
export class ProjectReadComponent implements OnInit {

  projects: Project[];
  displayedColumns =  ['id', 'name', 'professor', 'status', 'action'];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.read().subscribe(projects => {
      this.projects = projects;
      console.log(projects);
    });
  }
}
