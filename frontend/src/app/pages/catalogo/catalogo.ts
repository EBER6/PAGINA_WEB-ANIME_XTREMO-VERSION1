import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];

  busqueda = '';
  categoriaSeleccionada = 'todos';

  categorias: string[] = [
    'todos',
    'figuras',
    'polos',
    'accesorios',
    'posters',
    'llaveros',
    'ofertas'
  ];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
      },
      error: (error) => {
        console.log('Error al cargar catálogo:', error);
      }
    });
  }

  filtrarProductos() {
    let lista = [...this.productos];

    if (this.categoriaSeleccionada !== 'todos') {
      if (this.categoriaSeleccionada === 'ofertas') {
        lista = lista.filter(p => p.oferta === true);
      } else {
        lista = lista.filter(
          p => p.categoria?.toLowerCase() === this.categoriaSeleccionada.toLowerCase()
        );
      }
    }

    if (this.busqueda.trim() !== '') {
      lista = lista.filter(p =>
        p.nombre?.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }

    this.productosFiltrados = lista;
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.filtrarProductos();
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