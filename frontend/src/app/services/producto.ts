import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';
  private uploadUrl = 'http://localhost:3000/api/upload';

  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarProducto(producto: any) {
    return this.http.post(this.apiUrl, producto);
  }

  subirImagen(archivo: File) {
    const formData = new FormData();
    formData.append('imagen', archivo);
    return this.http.post<any>(this.uploadUrl, formData);
  }
}