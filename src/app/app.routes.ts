import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './forms/create-account/create-account.component';
import { UpdateAccountComponent } from './forms/update-account/update-account.component';

export const routes: Routes = [
  { path: "accounts", component: AccountsComponent },
  { path: "accounts/create", component: CreateAccountComponent },
  { path: "accounts/update/:id", component: UpdateAccountComponent }
];
