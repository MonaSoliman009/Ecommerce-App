import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { adminGuard } from '../guards/admin.guard';
import { UserViewComponent } from './components/user-view/user-view.component';
import { userGuard } from '../guards/user.guard';

export const routes: Routes = [
  {path:'',component:LoginComponent},
  {
    path: '',
    component: MainLayoutComponent,

    children: [
      {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[adminGuard],title:'Admin Dashboard'},
      {path:'user-view',component:UserViewComponent,canActivate:[userGuard],title:'User View'},

    ],
  },
  { path: 'login', component: LoginComponent, title: 'Login page' },

  { path: '**', component: NotFoundComponent,title:'Not Found Page' },
];
