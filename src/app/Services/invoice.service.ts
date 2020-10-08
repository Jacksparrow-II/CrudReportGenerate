import { Inv } from './../Models/Invoice';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  GetInvoice() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Invoice/GetInvoice", {headers :tokenHeader });
   }

  AddInvoice(Inv) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Invoice/AddInvoiceData", Inv, {headers :tokenHeader });
   } 

   UpdateInvoice(Inv:Inv,invoiceNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Invoice/UpdateInvoice/" + invoiceNo,Inv, {headers :tokenHeader });
  }  

   DeleteInvoice(invoiceNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.delete(environment.apiBaseURI + "/api/Invoice/DeleteInvoice/" + invoiceNo, {headers :tokenHeader });
  }  

  GetById(invoiceNo:string): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') }) 
    return this.http.get(environment.apiBaseURI + "/api/Invoice/InvoiceById/" + invoiceNo, {headers :tokenHeader });
  }

}
