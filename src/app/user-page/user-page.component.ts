import { Component } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent {
  userId?: number;
  constructor(private userService: UserService) {}

  getUser(userId: number) {}
  name = 'Alexis Selorm Gbeckor-Kove';
}
