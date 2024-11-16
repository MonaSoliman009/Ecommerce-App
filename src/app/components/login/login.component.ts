import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../../models/iuser';
import { UserRoleService } from '../../../services/user-role.service';
import { GlobalService, MessageType } from '../../../services/global.service';
import { Router } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatToolbarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: IUser = {} as IUser;

  constructor(
    private _userRoleService: UserRoleService,
    private _globalService: GlobalService,
    private _router: Router
  ) {}
  login(myForm: NgForm) {
    let formVal = myForm.value;

    if (formVal.email == 'user' && formVal.password == 'user') {
      this._userRoleService.setRole('user');
      this._router.navigate(['/user-view'])

    } else if (formVal.email == 'admin' && formVal.password == 'admin') {
      this._userRoleService.setRole('admin');
      this._router.navigate(['/admin-dashboard'])
    } else {
      this._globalService._messageAlert(
        MessageType.Error,
        'Login Failed,Try Again'
      );
    }
  }
}
