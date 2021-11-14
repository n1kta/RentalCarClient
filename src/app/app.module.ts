import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { CarListComponent } from './admin/car-list/car-list.component';
import { CustomerListComponent } from './admin/customer-list/customer-list.component';
import { RentalListComponent } from './admin/rental-list/rental-list.component';
import { ReturnListComponent } from './admin/return-list/return-list.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CarListCustomerComponent } from './car-list-customer/car-list-customer.component';
import { CarDetailsCustomerComponent } from './car-details-customer/car-details-customer.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CustomerReturnListComponent } from './customer-return-list/customer-return-list.component';
import { FormatPipe } from './pipes/format.pipe';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CarListComponent,
    CustomerListComponent,
    RentalListComponent,
    ReturnListComponent,
    AdminPageComponent,
    HomeComponent,
    CarListCustomerComponent,
    CarDetailsCustomerComponent,
    CustomerReturnListComponent,
    FormatPipe,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    DataTablesModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
