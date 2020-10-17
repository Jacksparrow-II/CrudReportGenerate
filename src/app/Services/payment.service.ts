import { Pay } from './../Models/Payment';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  GetPayment() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Payment/GetPayment", {headers :tokenHeader });
   } 

   AddPayment(Pay) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Payment/AddPaymentData", Pay, {headers :tokenHeader });
   } 

   UpadtePayment(Pay:Pay,paymentNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Payment/UpdatePayment/" + paymentNo, Pay, {headers :tokenHeader });
  }  

   DeletePayment(paymentNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.delete(environment.apiBaseURI + "/api/Payment/DeletePayment/" + paymentNo, {headers :tokenHeader });
  }  

  GetById(paymentNo:string): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })  
    return this.http.get(environment.apiBaseURI + "/api/Payment/PaymentById/" + paymentNo, {headers :tokenHeader });
  }

  GetInvoiceDetailsByNo(id:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Payment/GetInvoiceDetails/" + id ,{headers :tokenHeader });
   } 
}
