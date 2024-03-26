import { Routes } from '@angular/router';
import { authGuard } from './authentication/auth-guard';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'details/:id',
    canActivate: [authGuard],
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'product/create',
    canActivate: [authGuard],
    component: ProductCreateComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(module => module.LoginComponent)
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
