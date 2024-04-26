import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserData, UserDetails } from '../data-response';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  userId: number;
  user?: UserDetails;
  isLoaded = false;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.userId = +idParam!;
    console.log(this.userId);
  }
  ngOnInit(): void {
    this.getUser(this.userId);
  }

  getUser(userId: number) {
    this.isLoaded = false;
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user.data;
        console.log(user);
        this.isLoaded = true;
      },

      (error) => {
        this.isLoaded = true;
        console.log(error);
      }
    );
  }
  name = 'Alexis Selorm Gbeckor-Kove';
}
