// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

//   registerUser() {
//     localStorage.setItem('user', JSON.stringify(this.user));
//     alert('User registered!');
//   }
// }

constructor(private router: Router) {}

registerUser() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userExists = users.find((u: any) => u.email === this.user.email);

  if (userExists) {
    alert('User already exists!');
    return;
  }

  users.push(this.user);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful!');
  this.router.navigate(['/login']);
}

}
