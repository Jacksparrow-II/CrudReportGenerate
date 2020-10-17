import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { EdtPro } from './../Models/EditProfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {

  constructor(private http: HttpClient) { }

  EditProfile(EdtPro:EdtPro,userId:number) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Dashboard/Editprofile/" + userId,EdtPro, {headers :tokenHeader });
  } 

  GetEditProfileById(userId:number): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') }) 
    return this.http.get(environment.apiBaseURI + "/api/Dashboard/GetEditprofileById/" + userId, {headers :tokenHeader });
  }
}
