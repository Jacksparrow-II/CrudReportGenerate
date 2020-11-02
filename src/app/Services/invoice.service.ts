import { Inv } from './../Models/Invoice';
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
export class InvoiceService {

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ClearLocalStorage()
  {
    localStorage.clear();
    this.router.navigateByUrl('/Login');
    this.toastr.info("Please Login Again");
  }

  GetInvoice() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Invoice/GetInvoice", {headers :tokenHeader })
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

  AddInvoice(Inv) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Invoice/AddInvoiceData", Inv, {headers :tokenHeader })
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

   UpdateInvoice(Inv:Inv,invoiceNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Invoice/UpdateInvoice/" + invoiceNo,Inv, {headers :tokenHeader })
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

   DeleteInvoice(invoiceNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.delete(environment.apiBaseURI + "/api/Invoice/DeleteInvoice/" + invoiceNo, {headers :tokenHeader })
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
    return this.http.get(environment.apiBaseURI + "/api/Invoice/AutoIncrementInvoiceNo", {headers :tokenHeader })
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

  GetById(invoiceNo:string): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') }) 
    return this.http.get(environment.apiBaseURI + "/api/Invoice/InvoiceById/" + invoiceNo, {headers :tokenHeader })
    
  }

}
