import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './forms/create-account/create-account.component';
import { UpdateAccountComponent } from './forms/update-account/update-account.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerComponent } from './forms/create-customer/create-customer.component';

export const routes: Routes = [
  { path: "accounts", component: AccountsComponent },
  { path :"customers", component : CustomersComponent},
  { path: "accounts/create", component: CreateAccountComponent },
  { path: "accounts/update/:id", component: UpdateAccountComponent },
  { path :"customers/create", component : CreateCustomerComponent},
];
