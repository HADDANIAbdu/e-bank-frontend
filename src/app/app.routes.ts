import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './forms/create-account/create-account.component';
import { UpdateAccountComponent } from './forms/update-account/update-account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerComponent } from './forms/create-customer/create-customer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/create', component: CreateAccountComponent },
      { path: 'accounts/update/:id', component: UpdateAccountComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/create', component: CreateCustomerComponent },
      { path: '', redirectTo: '/accounts', pathMatch: 'full' }
    ]
  }
];
