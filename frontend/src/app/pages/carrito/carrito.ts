import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  productos: any[] = [];

  constructor(private carritoService: CarritoService) {
    this.productos = this.carritoService.obtenerCarrito();
  }

  eliminar(index: number) {
    this.carritoService.eliminarProducto(index);
    this.productos = this.carritoService.obtenerCarrito();
  }

  vaciar() {
    this.carritoService.vaciarCarrito();
    this.productos = this.carritoService.obtenerCarrito();
  }

  enviarWhatsApp() {
    let mensaje = ' *PEDIDO - ANIME XTREMO* %0A%0A';
    mensaje += ' *Productos:* %0A%0A';

    let total = 0;

    this.productos.forEach(p => {
      mensaje += ` ${p.nombre} %0A`;
      mensaje += ` S/${p.precio} %0A%0A`;
      total += p.precio;
    });

    mensaje += `%0A *Total: S/${total}* %0A%0A`;
    mensaje += 'Gracias por comprar en *Anime Xtremo* ';

    const numero = '51922389292';
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, '_blank');
  }

  getImagenUrl(ruta: string): string {
    if (!ruta) return '';
    if (ruta.startsWith('http')) return ruta;
    return `http://localhost:3000${ruta}`;
  }
}