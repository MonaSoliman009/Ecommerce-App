import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { UserRoleService } from '../../../services/user-role.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../../services/language.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    FormsModule,

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit,OnDestroy {
  lang: string = '';
isLoggedIn:boolean=false
private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _userRoleService: UserRoleService,
    private _router: Router,
    private _translate: TranslateService,
    private _languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.getLanguage();
    this.getLoggedInStatus()
  }
  getLanguage() {
    this._languageService.getLanguage().pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.lang = language;
    });
  }
  getLoggedInStatus(){
    this._userRoleService.getLoggedIn().pipe(takeUntil(this.destroy$)).subscribe((status)=>{
      console.log(status);
      this.isLoggedIn=(status)?true:false

    })
  }
  logout() {
    this._userRoleService.clearRole();
    this._router.navigate(['/login']);
  }
  useLanguage(): void {
    this._languageService.changeLanguage(this.lang);
    this._translate.use(this.lang);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
