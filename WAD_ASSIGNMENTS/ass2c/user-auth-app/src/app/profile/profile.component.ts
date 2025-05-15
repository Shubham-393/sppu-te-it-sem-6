// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
// export class ProfileComponent implements OnInit {
//   user: any = null;

//   ngOnInit() {
//     const storedUser = localStorage.getItem('loggedInUser');
//     if (storedUser) {
//       this.user = JSON.parse(storedUser);
//     }
//   }
// }

export class ProfileComponent {
  user: any;

  ngOnInit() {
    const userData = localStorage.getItem('loggedInUser');
    this.user = userData ? JSON.parse(userData) : null;
  }
}
