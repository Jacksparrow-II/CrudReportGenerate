import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { MasterpageComponent } from './modules/masterpage/masterpage.component';
import { ListCustomerComponent } from './modules/Customer/list-customer/list-customer.component';
import { ListPaymentComponent } from './modules/Payment/list-payment/list-payment.component';
import { ListInvoiceComponent } from './modules/Invoice/list-invoice/list-invoice.component';
import { AddCustomerComponent } from './modules/Customer/add-customer/add-customer.component';
import { AddInvoiceComponent } from './modules/Invoice/add-invoice/add-invoice.component';
import { AddPaymentComponent } from './modules/Payment/add-payment/add-payment.component';
import { UpdateInvoiceComponent } from './modules/Invoice/update-invoice/update-invoice.component';
import { UpdateCustomerComponent } from './modules/Customer/update-customer/update-customer.component';
import { UpdatePaymentComponent } from './modules/Payment/update-payment/update-payment.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { EditProfileComponent } from './modules/edit-profile/edit-profile.component';

import { AuthGuard } from './modules/auth/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'Navbar', pathMatch: 'full' }, 

  { path: 'Login', component: LoginComponent }, 
  { path: 'Registration', component: RegistrationComponent }, 

{
  path: 'Navbar', component: NavbarComponent, children: [
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, 

    { path: 'Masterpage', component: MasterpageComponent,canActivate:[AuthGuard] }, 
    { path: 'Dashboard', component: DashboardComponent,canActivate:[AuthGuard] }, 
  
    { path: 'EditProfile', component: EditProfileComponent }, 
  
    { path: 'AddCustomer', component: AddCustomerComponent,canActivate:[AuthGuard] }, 
    { path: 'ListCustomer', component: ListCustomerComponent,canActivate:[AuthGuard] },
    { path: 'UpdateCustomer/:customerNo', component: UpdateCustomerComponent,canActivate:[AuthGuard] },
  
    { path: 'ListInvoice', component: ListInvoiceComponent,canActivate:[AuthGuard] },
    { path: 'AddInvoice', component: AddInvoiceComponent,canActivate:[AuthGuard] }, 
    { path: 'UpdateInvoice/:invoiceNo', component: UpdateInvoiceComponent,canActivate:[AuthGuard] },
  
    { path: 'ListPayment', component: ListPaymentComponent,canActivate:[AuthGuard] },
    { path: 'AddPayment', component: AddPaymentComponent,canActivate:[AuthGuard] }, 
    { path: 'UpdatePayment/:paymentNo', component: UpdatePaymentComponent,canActivate:[AuthGuard] },
  
    { path: 'ListReports', component: ReportsComponent,canActivate:[AuthGuard] },

    { path: '**', redirectTo: 'Dashboard' }
  ]
},
  { path: '**', redirectTo: 'Login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
