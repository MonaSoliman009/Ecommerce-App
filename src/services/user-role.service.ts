import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
private roleKey:string="role"
  constructor() { }


  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }


  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  clearRole(): void {
    localStorage.removeItem(this.roleKey);
  }


}
