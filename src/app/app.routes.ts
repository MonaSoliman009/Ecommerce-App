import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [
  {path:'',component:LoginComponent},
  {
    path: '',
    component: MainLayoutComponent,

    children: [
      {path:'admin-dashboard',component:AdminDashboardComponent},

    ],
  },
  { path: 'login', component: LoginComponent, title: 'Login page' },

  { path: '**', component: NotFoundComponent,title:'Not Found Page' },
];
