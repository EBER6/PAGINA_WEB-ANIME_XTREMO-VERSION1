import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {
  producto = {
    nombre: '',
    precio: 0,
    imagen: '',
    categoria: '',
    oferta: false,
    descripcion: ''
  };

  mensaje = '';
  archivoSeleccionado: File | null = null;
  previewImagen: string | null = null;

  constructor(private productoService: ProductoService) {}

  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.archivoSeleccionado = archivo;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImagen = reader.result as string;
      };
      reader.readAsDataURL(archivo);
    }
  }

  guardarProducto() {
    if (!this.archivoSeleccionado) {
      this.mensaje = 'Selecciona una imagen';
      return;
    }

    this.productoService.subirImagen(this.archivoSeleccionado).subscribe({
      next: (respuestaImagen) => {
        this.producto.imagen = respuestaImagen.ruta;

        this.productoService.agregarProducto(this.producto).subscribe({
          next: () => {
            this.mensaje = 'Producto guardado correctamente';

            this.producto = {
              nombre: '',
              precio: 0,
              imagen: '',
              categoria: '',
              oferta: false,
              descripcion: ''
            };

            this.archivoSeleccionado = null;
            this.previewImagen = null;
          },
          error: () => {
            this.mensaje = 'Error al guardar producto';
          }
        });
      },
      error: () => {
        this.mensaje = 'Error al subir la imagen';
      }
    });
  }
}