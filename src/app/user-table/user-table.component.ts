import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AngularMaterialModule } from '../angular-material.module';
import { UserService } from '../services/user.service';
import { UserData } from '../data-response';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

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
  searchTextChanged: Subject<string> = new Subject<string>();
  isLoaded = false;

  getData() {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.getUsers(pageEvent);
  }

  getUsers(event: PageEvent) {
    // let searchQuery = this.searchQuery ? this.searchQuery : null;
    let requestIndex = event.pageIndex + 1;

    this.userService.getUsers(requestIndex, event.pageSize).subscribe(
      (res) => {
        this.paginator.length = res.total;
        let adjustedPage = res.page - 1;
        this.paginator.pageIndex = adjustedPage;
        this.paginator.pageSize = res.per_page;
        this.users = new MatTableDataSource<UserData>(res.data);
        this.isLoaded = true;
      },
      (error) => {
        this.isLoaded = false;
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getData();
  }

  filterUserData(filterText: any) {
    this.users.filter = filterText;
  }

  onsearchTextChanged(filterText: string) {
    if (this.searchTextChanged.observers.length == 0) {
      this.searchTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((query) => {
          this.filterUserData(query);
        });
    }
    this.searchTextChanged.next(filterText);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'avatar'];
}
