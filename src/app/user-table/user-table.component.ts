import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularMaterialModule } from '../angular-material.module';
import { UserService } from '../services/user.service';
import { UserData } from '../data-response';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
  standalone: true,
  imports: [AngularMaterialModule],
})
export class UserTableComponent implements OnInit {
  constructor(private userService: UserService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public users!: MatTableDataSource<UserData>;
  defaultPageIndex = 0;
  defaultPageSize = 6;
  searchQuery?: string;

  getData() {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    console.log(pageEvent);
    console.log(this.paginator);
    this.getUsers(pageEvent);
  }

  getUsers(event: PageEvent) {
    // let searchQuery = this.searchQuery ? this.searchQuery : null;
    let requestIndex = event.pageIndex + 1;

    this.userService.getUsers(requestIndex, event.pageSize).subscribe((res) => {
      this.paginator.length = res.total;
      let adjustedPage = res.page - 1;
      this.paginator.pageIndex = adjustedPage;
      this.paginator.pageSize = res.per_page;
      this.users = new MatTableDataSource<UserData>(res.data);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'avatar'];
}
