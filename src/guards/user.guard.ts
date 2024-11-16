import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';
export const userGuard: CanActivateFn = (route, state) => {
  let _userRoleService=inject(UserRoleService);
  let _router=inject(Router)
  if(_userRoleService.getRole()=='user'){
    return true;

  }else{
   _router.navigate(['/login'])
    return false
  }
};
