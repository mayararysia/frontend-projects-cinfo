import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = "http://localhost:3000/projects";

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.baseUrl, project).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  read(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl);
  }

  readById(id: number): Observable<Project> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Project>(url);
  }

  update(project: Project): Observable<Project>{
    const url = `${this.baseUrl}/${project.id}`;
    return this.httpClient.put<Project>(url, project);
  }

  deleteById(id: number): Observable<Project> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Project>(url);
  }
}
