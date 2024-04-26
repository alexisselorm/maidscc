import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {}
