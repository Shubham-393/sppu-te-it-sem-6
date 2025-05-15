// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  register(user: any): boolean {
    localStorage.setItem(user.email, JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): any {
    const user = localStorage.getItem(email);
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(parsed));
        return parsed;
      }
    }
    return null;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
