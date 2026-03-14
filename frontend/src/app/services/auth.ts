import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private adminEmail = 'admin@animextremo.com';
  private adminPassword = '123456';

  login(correo: string, password: string): boolean {
    if (correo === this.adminEmail && password === this.adminPassword) {
      localStorage.setItem('adminLogueado', 'true');
      return true;
    }
    return false;
  }

  estaLogueado(): boolean {
    return localStorage.getItem('adminLogueado') === 'true';
  }

  logout(): void {
    localStorage.removeItem('adminLogueado');
  }
}