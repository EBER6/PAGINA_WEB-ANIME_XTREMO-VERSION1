import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  nombre = '';
  correo = '';
  mensaje = '';
  mensajeExito = '';

  enviarFormulario() {

    if (!this.nombre.trim() || !this.correo.trim() || !this.mensaje.trim()) {
      this.mensajeExito = '⚠️ Completa todos los campos';
      return;
    }

    if (this.nombre.length < 3) {
      this.mensajeExito = '⚠️ El nombre es muy corto';
      return;
    }

    if (!this.validarCorreo(this.correo)) {
      this.mensajeExito = '⚠️ Correo no válido';
      return;
    }

    if (this.mensaje.length < 10) {
      this.mensajeExito = '⚠️ El mensaje debe tener al menos 10 caracteres';
      return;
    }

    // Simulación de envío
    this.mensajeExito = '✅ Mensaje enviado correctamente. Te responderemos pronto.';

    setTimeout(() => {
      this.mensajeExito = '';
    }, 4000);

    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }
}