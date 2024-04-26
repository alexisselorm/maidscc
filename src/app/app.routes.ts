import { Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';

export const routes: Routes = [
  { path: 'users', component: UserTableComponent },
  { path: 'users/:id', component: UserTableComponent },
];
