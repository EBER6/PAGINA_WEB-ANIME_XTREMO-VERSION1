import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css'
})
export class Ofertas implements OnInit {

  productos: any[] = [];
  ofertas: any[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas() {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.ofertas = this.productos.filter(p => p.oferta === true);
      },
      error: (error) => {
        console.log('Error al cargar ofertas:', error);
      }
    });
  }

  agregar(nombre: string, precio: number, imagen: string) {
    const producto = {
      nombre,
      precio,
      imagen,
      cantidad: 1
    };

    this.carritoService.agregarProducto(producto);
    alert('Producto agregado al carrito');
  }

  getImagenUrl(ruta: string): string {
    if (!ruta) return '';
    if (ruta.startsWith('http')) return ruta;
    if (ruta.startsWith('/uploads')) return `http://localhost:3000${ruta}`;
    return ruta;
  }
}