import { Cust } from './../Models/Customer';import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudReportService {
  
  updateCustomer(Cust: Cust) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  GetCustomer() {   
    //var tokenHeader = new HttpHeaders
    return this.http.get(environment.apiBaseURI + "/api/Customer/GetCustomer");
   } 

  GetInvoice() {   
    //var tokenHeader = new HttpHeaders
    return this.http.get(environment.apiBaseURI + "/api/Invoice/GetInvoice");
   } 

  GetPayment() {   
    //var tokenHeader = new HttpHeaders
    return this.http.get(environment.apiBaseURI + "/api/Payment/GetPayment");
   } 

   AddCustomer(Cust) {   
    //var tokenHeader = new HttpHeaders
    return this.http.post(environment.apiBaseURI + "/api/Customer/AddCustomerData", Cust);
   } 

   AddInvoice(Cust) {   
    //var tokenHeader = new HttpHeaders
    return this.http.post(environment.apiBaseURI + "/api/Invoice/AddInvoiceData", Cust);
   } 

   AddPayment(Cust) {   
    //var tokenHeader = new HttpHeaders
    return this.http.post(environment.apiBaseURI + "/api/Payment/AddPaymentData", Cust);
   } 

}
