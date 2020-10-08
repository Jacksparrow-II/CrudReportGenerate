import { Reg } from './../Models/Registration';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  Registration(Reg) {   
    return this.http.post(environment.apiBaseURI + "/api/Authentication/Registration", Reg) ;
  } 

}

