import { Pay } from './../Models/Payment';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ClearLocalStorage()
  {
    localStorage.clear();
    this.router.navigateByUrl('/Login');
    this.toastr.info("Please Login Again");
  }

  GetPayment() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Payment/GetPayment", {headers :tokenHeader })
    .pipe(
      tap(
        succ => { },
        err =>  {
          if (err.status == 401){
            this.ClearLocalStorage();
          }
        }

      )
    )
   } 

   AddPayment(Pay) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Payment/AddPaymentData", Pay, {headers :tokenHeader })
    .pipe(
      tap(
        succ => { },
        err =>  {
          if (err.status == 401){
            this.ClearLocalStorage();
          }
        }

      )
    )
   } 

   UpadtePayment(Pay:Pay,paymentNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Payment/UpdatePayment/" + paymentNo, Pay, {headers :tokenHeader })
    .pipe(
      tap(
        succ => { },
        err =>  {
          if (err.status == 401){
            this.ClearLocalStorage();
          }
        }

      )
    )  
  }  

   DeletePayment(paymentNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.delete(environment.apiBaseURI + "/api/Payment/DeletePayment/" + paymentNo, {headers :tokenHeader })
    .pipe(
      tap(
        succ => { },
        err =>  {
          if (err.status == 401){
            this.ClearLocalStorage();
          }
        }

      )
    )
  }  

  GetById(paymentNo:string): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })  
    return this.http.get(environment.apiBaseURI + "/api/Payment/PaymentById/" + paymentNo, {headers :tokenHeader })
    .pipe(
      tap(
        succ => { },
        err =>  {
          if (err.status == 401){
            this.ClearLocalStorage();
          }
        }

      )
    )
  }

  GetInvoiceDetailsByNo(id:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Payment/GetInvoiceDetails/" + id ,{headers :tokenHeader })
    .pipe(
      tap(
        succ => { },
        err =>  {
          if (err.status == 401){
            this.ClearLocalStorage();
          }
        }

      )
    )
   } 
   
}
