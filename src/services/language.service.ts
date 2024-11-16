import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  lang:string=localStorage.getItem('lang')||'en'
  private language:BehaviorSubject<string>=new BehaviorSubject<string>(this.lang)

  constructor() { }

  getLanguage():Observable<string>{
    return this.language.asObservable()
   }

   changeLanguage(newVal:string){
    localStorage.setItem('lang',newVal)
     this.language.next(newVal)
   }
}
