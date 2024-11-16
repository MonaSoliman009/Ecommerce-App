import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'ecommerce';
  lang: string = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _translate: TranslateService,
    private _languageService: LanguageService
  ) {
    this._translate.addLangs(['ar', 'en']);
    this._translate.setDefaultLang(this._languageService.lang);
    this._translate.use(this._languageService.lang);
  }
  ngOnInit(): void {
    this.getLanguage();
  }

  getLanguage() {
    this._languageService.getLanguage().pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.lang = language;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
