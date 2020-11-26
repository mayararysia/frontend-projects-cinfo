import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Project } from '../project.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Project[] = [
  {id: 1, name: 'Hydrogen', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 2, name: 'Helium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 3, name: 'Lithium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 4, name: 'Beryllium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 5, name: 'Boron', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 6, name: 'Carbon', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 7, name: 'Nitrogen', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 8, name: 'Oxygen', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 9, name: 'Fluorine', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 10, name: 'Neon', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 11, name: 'Sodium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 12, name: 'Magnesium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 13, name: 'Aluminum', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 14, name: 'Silicon', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 15, name: 'Phosphorus', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 16, name: 'Sulfur', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 17, name: 'Chlorine', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 18, name: 'Argon', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 19, name: 'Potassium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
  {id: 20, name: 'Calcium', description: 'XX', professor: 'CCC', students: 'xx', period: 'xxx', status: 'Em Andamento'},
];

/**
 * Data source for the ProjectRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProjectRead2DataSource extends DataSource<Project> {
  data: Project[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Project[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Project[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Project[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
