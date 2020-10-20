
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EditprofileService } from '../../Services/editprofile.service'; 
import { RegistrationService } from '../../Services/registration.service'; 
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  dispname : any;
  invList : any;

constructor(public router: Router,private editprofileService: EditprofileService,private registrationService: RegistrationService) {

}  

  ngOnInit(): void {

    this.display();

    // this.editprofileService.GetRegistrationDetails()
    // .subscribe((data) => this.invList=data);

    this.invList = localStorage.getItem('userId');
  }
  
  GetById(userId: number){
    this.router.navigate(['/Navbar/EditProfile',userId]);
  }

  display() {
    this.dispname = localStorage.getItem('firstName');
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Login']);
  }

}