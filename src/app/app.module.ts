import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CrudReportService } from "./Services/crud-report.service";
import { CustomerService } from "./Services/customer.service";
import { InvoiceService } from "./Services/invoice.service";
import { PaymentService } from "./Services/payment.service";
import { ReportsService } from './Services/reports.service';
import { NavbarService } from './Services/navbar.service';

import { AddCustomerComponent } from './modules/Customer/add-customer/add-customer.component';
import { ListCustomerComponent } from './modules/Customer/list-customer/list-customer.component';
import { UpdateCustomerComponent } from './modules/Customer/update-customer/update-customer.component';
import { AddInvoiceComponent } from './modules/Invoice/add-invoice/add-invoice.component';
import { ListInvoiceComponent } from './modules/Invoice/list-invoice/list-invoice.component';
import { UpdateInvoiceComponent } from './modules/Invoice/update-invoice/update-invoice.component';
import { AddPaymentComponent } from './modules/Payment/add-payment/add-payment.component';
import { ListPaymentComponent } from './modules/Payment/list-payment/list-payment.component';
import { UpdatePaymentComponent } from './modules/Payment/update-payment/update-payment.component';
import { ReportsComponent } from './modules/reports/reports.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthInterceptor } from './modules/auth/auth.interceptor';
import { RegistrationComponent } from './modules/registration/registration.component';
import { EditProfileComponent } from './modules/edit-profile/edit-profile.component';

import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    ListCustomerComponent,
    UpdateCustomerComponent,
    AddInvoiceComponent,
    ListInvoiceComponent,
    UpdateInvoiceComponent,
    AddPaymentComponent,
    ListPaymentComponent,
    UpdatePaymentComponent,
    NavbarComponent,
    ReportsComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    EditProfileComponent,
 //   MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,  
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    // Ng2GoogleChartsModule,
    ChartsModule,
    GoogleChartsModule  

  ],
providers: [CrudReportService,CustomerService,InvoiceService,PaymentService,NavbarService,ReportsService,{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
