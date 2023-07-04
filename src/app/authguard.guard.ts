import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

export const authguardGuard: CanActivateFn = (route, state) => {

  const router = Inject(Router);
  
  if(localStorage.getItem('token') ==='1'){
    return true;
  }
  
    // router.navigate([SigninComponent]);
    return false;
  
};
