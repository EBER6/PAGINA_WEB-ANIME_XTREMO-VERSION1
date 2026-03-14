import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: any[] = [];

  agregarProducto(producto: any) {
    this.carrito.push(producto);
    console.log('Carrito actual:', this.carrito);
  }

  obtenerCarrito() {
    return this.carrito;
  }

  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);
  }

  vaciarCarrito() {
    this.carrito = [];
  }
}