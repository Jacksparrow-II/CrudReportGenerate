import { Inv } from './../Models/Invoice';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

    Login(FormData) {   
      return this.http.post(environment.apiBaseURI + "/api/Authentication", FormData) ;
    } 

}
