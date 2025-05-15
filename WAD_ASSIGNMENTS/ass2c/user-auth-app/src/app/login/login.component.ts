// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

//   loginUser() {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       if (
//         this.user.email === parsedUser.email &&
//         this.user.password === parsedUser.password
//       ) {
        
//         alert('Login successful!');
// localStorage.setItem('user', storedUser); // ✅ Reuse the same 'user' key
// window.dispatchEvent(new Event('storage')); // 🔁 Notify AppComponent
// this.router.navigate(['/profile']);

//       } else {
//         alert('Invalid credentials!');
//       }
//     } else {
//       alert('No registered user found!');
//     }
//   }
// }

loginUser() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const matchedUser = users.find((u: any) =>
    u.email === this.user.email && u.password === this.user.password
  );

  if (matchedUser) {
    alert('Login successful!');
    localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
    this.router.navigate(['/profile']);
  } else {
    alert('Invalid credentials!');
  }
}
}