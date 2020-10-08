import { Cust } from './../Models/Customer';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  GetCustomer() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Customer/GetCustomer", {headers :tokenHeader });
   } 

   AddCustomer(Cust:Cust) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Customer/AddCustomerData", Cust, {headers :tokenHeader });
   } 

   UpdateCustomer(Cust:Cust,customerNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Customer/UpdateCustomer/" + customerNo, Cust, {headers :tokenHeader });
  }  

  DeleteCustomer(customerNo:string) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.delete(environment.apiBaseURI + "/api/Customer/DeleteCustomer/" + customerNo, {headers :tokenHeader });
  }  

  GetById(customerNo:string): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Customer/CustomerById/" + customerNo, {headers :tokenHeader });
  }

}
