import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  productos: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.log('Error al obtener productos:', error);
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
    return `http://localhost:3000${ruta}`;
  }
}