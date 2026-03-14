import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { Ofertas } from './pages/ofertas/ofertas';
import { Carrito } from './pages/carrito/carrito';
import { Login } from './pages/login/login';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { Contacto } from './pages/contacto/contacto';
import { ComoComprar } from './pages/como-comprar/como-comprar';
import { Ubicacion } from './pages/ubicacion/ubicacion';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'ofertas', component: Ofertas },
  { path: 'carrito', component: Carrito },
  { path: 'login', component: Login },
  { path: 'admin', component: AdminPanel, canActivate: [authGuard] },
  { path: 'contacto', component: Contacto },
  { path: 'como-comprar', component: ComoComprar },
  { path: 'ubicacion', component: Ubicacion }
];