import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
private roleKey:string="role"
isLogged:string|null=localStorage.getItem(this.roleKey)||null

private isLoggedIn:BehaviorSubject<string|null>=new BehaviorSubject<string|null>(this.isLogged)

  constructor() { }


  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
    this.isLoggedIn.next(role)

  }
  getLoggedIn():Observable<string|null>{
    return this.isLoggedIn.asObservable()
   }


  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  clearRole(): void {
    localStorage.removeItem(this.roleKey);
    this.isLoggedIn.next(null)

  }


}
