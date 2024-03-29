import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Project } from '../project.model';
import { ProjectRead2DataSource} from './project-read2-datasource';

@Component({
  selector: 'app-project-read2',
  template: `
    <div class="mat-elevation-z8">
      <table mat-table class="full-width-table" matSort aria-label="Elements">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
          <td mat-cell *matCellDef="let row">{{row.id}}</td>
        </ng-container>
    
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
          <td mat-cell *matCellDef="let row">{{row.name}}</td>
        </ng-container>
    
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    
      <mat-paginator #paginator
          [length]="dataSource?.data.length"
          [pageIndex]="0"
          [pageSize]="50"
          [pageSizeOptions]="[25, 50, 100, 250]">
      </mat-paginator>
    </div>
    
  `,
  styles: [`
    .full-width-table {
      width: 100%;
    }
    
  `]
})
export class ProjectRead2Component implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Project>;
  dataSource: ProjectRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns =  ['id', 'name', 'professor', 'period', 'action'];

  ngOnInit() {
    this.dataSource = new ProjectRead2DataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
