import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  password = '';
  mensaje = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ingresar() {
    const acceso = this.authService.login(this.correo, this.password);

    if (acceso) {
      this.mensaje = '';
      this.router.navigate(['/admin']);
    } else {
      this.mensaje = 'Correo o contraseña incorrectos';
    }
  }
}