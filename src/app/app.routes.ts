import { Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserTableComponent },
  { path: 'user/:id', component: UserPageComponent },
];
