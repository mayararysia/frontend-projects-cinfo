import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  project: Project;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.readById(id).subscribe( project  => {
      this.project = project;
    });
  }

  updateProject(): void {
    this.projectService.update(this.project).subscribe(() => {
      this.projectService.showMessage('Projeto alterado!');
      this.router.navigate(['/projects']);
    });
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }

}
