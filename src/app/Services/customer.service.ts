import { Cust } from './../Models/Customer';
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
export class CustomerService {

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ClearLocalStorage()
  {
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Login');
    this.toastr.info("Please Login Again");
  }

  GetCustomer() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Customer/GetCustomer", {headers :tokenHeader })
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

   AddCustomer(Cust:Cust) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Customer/AddCustomerData", Cust, {headers :tokenHeader })
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

   UpdateCustomer(Cust:Cust,customerNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Customer/UpdateCustomer/" + customerNo, Cust, {headers :tokenHeader })
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

  DeleteCustomer(customerNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.delete(environment.apiBaseURI + "/api/Customer/DeleteCustomer/" + customerNo, {headers :tokenHeader })
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

  AutoIncreamnet() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Customer/AutoIncrementCustomerNo", {headers :tokenHeader })
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

  GetById(customerNo:string): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Customer/CustomerById/" + customerNo, {headers :tokenHeader })
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
