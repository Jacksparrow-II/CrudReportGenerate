import { Repo } from './../Models/Report';
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
export class ReportsService {

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ClearLocalStorage()
  {
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');``
    localStorage.removeItem('token');
    this.router.navigateByUrl('/Login');
    this.toastr.info("Please Login Again");
  }

  GetReport() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Report/GetReports", {headers :tokenHeader })
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

  
  GetDashboardDetails() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Dashboard/GetDashboardDetails", {headers :tokenHeader })
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

  GetChartDetails() {   
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer '+ localStorage.getItem('token') })
    return this.http.get(environment.apiBaseURI + "/api/Dashboard/DisplayChart", {headers :tokenHeader })
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
