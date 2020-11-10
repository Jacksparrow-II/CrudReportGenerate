import { NavbarService } from './Services/navbar.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrudReportGenerate';
  dispname : any;

  constructor(public router: Router,public navbarService : NavbarService) {

    // Disable Right click in Webpage
    document.addEventListener('contextmenu', event => event.preventDefault());

   }

}
