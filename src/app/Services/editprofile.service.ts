import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { EdtPro } from './../Models/EditProfile';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ClearLocalStorage()
  {
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Login');
    this.toastr.info("Please Login Again");
  }

  EditProfile(EdtPro:EdtPro,userId:number) {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.post(environment.apiBaseURI + "/api/Dashboard/Editprofile/" + userId,EdtPro, {headers :tokenHeader })
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
  
  GetRegistrationDetails() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Authentication/GetLogindetails", {headers :tokenHeader })
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

  GetEditProfileById(userId:number): Observable<any> { 
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') }) 
    return this.http.get(environment.apiBaseURI + "/api/Dashboard/GetEditprofileById/" + userId, {headers :tokenHeader })
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
