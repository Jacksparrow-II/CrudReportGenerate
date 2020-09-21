import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './Customer/add-customer/add-customer.component';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { UpdateCustomerComponent } from './Customer/update-customer/update-customer.component';
import { AddInvoiceComponent } from './Invoice/add-invoice/add-invoice.component';
import { UpdateInvoiceComponent } from './Invoice/update-invoice/update-invoice.component';
import { ListInvoiceComponent } from './Invoice/list-invoice/list-invoice.component';
import { AddPaymentComponent } from './Payment/add-payment/add-payment.component';
import { ListPaymentComponent } from './Payment/list-payment/list-payment.component';
import { UpdatePaymentComponent } from './Payment/update-payment/update-payment.component';



@NgModule({
  declarations: [CustomerComponent, AddCustomerComponent, ListCustomerComponent, UpdateCustomerComponent, AddInvoiceComponent, UpdateInvoiceComponent, ListInvoiceComponent, AddPaymentComponent, ListPaymentComponent, UpdatePaymentComponent],
  imports: [
    CommonModule
  ]
})
export class ModulesModule { }
