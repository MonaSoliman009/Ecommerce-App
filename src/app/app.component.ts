import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  lang: string = '';

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
    this._languageService.getLanguage().subscribe((language) => {
      this.lang = language;
    });
  }
}
