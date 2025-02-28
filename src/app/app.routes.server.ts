import { RenderMode, ServerRoute } from '@angular/ssr';
import { AppRoutes } from './core/const/app-routes-name';

export const serverRoutes: ServerRoute[] = [
  {
    path: `${AppRoutes.CHECKOUT}/:cartId`,
    renderMode: RenderMode.Server
  },
  {
    path: `${AppRoutes.PRODUCTDETAIL}/:id`,
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
