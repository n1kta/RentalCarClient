import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { CarListComponent } from './admin/car-list/car-list.component';
import { CustomerListComponent } from './admin/customer-list/customer-list.component';
import { RentalListComponent } from './admin/rental-list/rental-list.component';
import { ReturnListComponent } from './admin/return-list/return-list.component';
import { CarDetailsCustomerComponent } from './car-details-customer/car-details-customer.component';
import { CarListCustomerComponent } from './car-list-customer/car-list-customer.component';
import { CustomerReturnListComponent } from './customer-return-list/customer-return-list.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: CarListCustomerComponent },
  { path: 'car/:id', component: CarDetailsCustomerComponent, canActivate: [AuthGuard] },
  { path: 'returns', component: CustomerReturnListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'edit', component: EditCustomerComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'car-list'
      },
      {
        path: 'car-list',
        component: CarListComponent
      },
      {
        path: 'customer-list',
        component: CustomerListComponent
      },
      {
        path: 'rental-list',
        component: RentalListComponent
      },
      {
        path: 'return-list',
        component: ReturnListComponent
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
