import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminGuard } from '../guards/admin.guard';
import { UserViewComponent } from './components/user-view/user-view.component';
import { userGuard } from '../guards/user.guard';

export const routes: Routes = [



      {path:'',redirectTo:'login',pathMatch:'full'},
      { path: 'login', component: LoginComponent, title: 'Login page' },

      {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[adminGuard],title:'Admin Dashboard'},
      {path:'user-view',component:UserViewComponent,canActivate:[userGuard],title:'User View'},




  { path: '**', component: NotFoundComponent,title:'Not Found Page' },
];
