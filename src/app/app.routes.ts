import { reqHandler } from './../server';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { AppRoutes } from './core/const/app-routes-name';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { autoLoginGuard } from './core/guards/auth/auto-login.guard';
export const routes: Routes = [
    {
        path: AppRoutes.AUTH, component: AuthLayoutComponent, children: [
            { path: "", redirectTo:AppRoutes.REGISTER , pathMatch:"full" },
            { path: AppRoutes.LOGIN, loadComponent: () => import('./core/pages/login/login.component').then((c) => c.LoginComponent), },
            { path: AppRoutes.REGISTER,canActivate:[autoLoginGuard], loadComponent: () => import('./core/pages/register/register.component').then((c) => c.RegisterComponent), },
            { path: AppRoutes.FORGETPASSWORD, loadComponent: () => import('./core/pages/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent), },
        ],
    },
    { path: "", redirectTo:AppRoutes.AUTH,pathMatch:"full"},
    { path: AppRoutes.HOME,canActivate:[authGuard] ,loadComponent: () =>  import('./features/pages/home/home.component').then((c) => c.HomeComponent), },
    { path: AppRoutes.CATEGORIES,canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/categories/categories.component').then((c) => c.CategoriesComponent), },
    { path: AppRoutes.BRAND,canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/brand/brand.component').then((c) => c.BrandComponent), },
    { path: AppRoutes.CHECKOUT+"/:cartId",canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/checkout/checkout.component').then((c) => c.CheckoutComponent), },
    { path: AppRoutes.CARTS,canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/carts/carts.component').then((c) => c.CartsComponent), },
    { path: AppRoutes.ORDERS,canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/orders/orders.component').then((c) => c.OrdersComponent), },
    { path: AppRoutes.PRODUCTS,canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/products/products.component').then((c) => c.ProductsComponent), },
    { path: AppRoutes.PRODUCTDETAIL+"/:id",canActivate:[authGuard] , loadComponent: () =>  import('./features/pages/product-detail/product-detail.component').then((c) => c.ProductDetailComponent), },
    { path: AppRoutes.FAVORITE, canActivate: [authGuard], loadComponent: () => import('./features/pages/wishlist/wishlist.component').then((c) => c.WishlistComponent) }, // ✅ Fixed missing comma
    { path:"**",component:NotFoundComponent}
];
