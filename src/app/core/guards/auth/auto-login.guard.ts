import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoutes } from '../../const/app-routes-name';

export const autoLoginGuard: CanActivateFn = (route, state) => {
    const _router=inject(Router);
    if(typeof window !=='undefined'&& localStorage.getItem("userToken")){
      _router.navigate([AppRoutes.HOME]);
      return false;
    }
    return true;
};
