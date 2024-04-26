import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserTableDataSource, UserTableItem } from './user-table-datasource';
import { AngularMaterialModule } from '../angular-material.module';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
  standalone: true,
  imports: [AngularMaterialModule],
})
export class UserTableComponent implements OnInit, AfterViewInit {
  constructor(private userService: UserService) {}
  defaultPageIndex = 1;
  defaultPageSize = 10;
  searchQuery?: string;

  getData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    this.searchQuery = query;
    this.getUsers(pageEvent);
  }

  getUsers(event: PageEvent) {
    let searchQuery = this.searchQuery ? this.searchQuery : null;

    this.userService.getUsers(event.pageIndex).subscribe((users) => {
      console.log(users);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserTableItem>;
  dataSource = new UserTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
