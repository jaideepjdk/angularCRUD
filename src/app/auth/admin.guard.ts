import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import  jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const jwttoken = localStorage.getItem("access_token");
      const role: string[] = jwtDecode(jwttoken)['Role'];
      var index = role.findIndex(x=>x.toLowerCase() === String('admin'));
      console.log(jwttoken,'\n',role,'\n', index)
      if(index <=0){
        return true;
      }else{
        return false;
      }
  }
  
}
