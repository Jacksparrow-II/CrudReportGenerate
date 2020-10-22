import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  Visible: boolean;

constructor(private http: HttpClient) {
  this.Visible = true;
 }

Hide()
{
  this.Visible = false;
}

Show()
{
  this.Visible = true;
}

}
