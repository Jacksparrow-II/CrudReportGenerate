import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

constructor(public router: Router) {

    this.display();
  }

  display() {
    this.dispname = localStorage.getItem('firstName');
    //let resp= this.invoiceService.DeleteInvoice(row.invoiceNo);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Login']);
  }

}