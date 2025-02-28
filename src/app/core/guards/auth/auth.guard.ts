import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoutes } from '../../const/app-routes-name';

export const authGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router);
  if(typeof window !=='undefined'&& localStorage.getItem("userToken")){
    return true;
  }
  _router.navigate([AppRoutes.AUTH]);
  return false;
};
