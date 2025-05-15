
// src/app/app.component.ts
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule, NgIf],
//   templateUrl: './app.component.html'
// })
// export class AppComponent implements OnInit {
//   isLoggedIn: boolean = false;

//   ngOnInit() {
//     this.checkLogin();
//     window.addEventListener('storage', this.checkLogin.bind(this)); // listen to login/logout
//   }

//   checkLogin() {
//     const user = localStorage.getItem('user');
//     this.isLoggedIn = !!user;
//   }

//   logout() {
//     localStorage.removeItem('user');
//     this.isLoggedIn = false;
//     window.location.href = '/login';
//   }
// }

// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLogin();
    window.addEventListener('storage', this.checkLogin.bind(this)); // listen to changes across tabs
  }

  checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    this.isLoggedIn = !!loggedInUser;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
