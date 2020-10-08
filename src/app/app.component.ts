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

  constructor(public router: Router) {

    //this.display();
   }


  // display() {
  //   this.dispname = localStorage.getItem('firstName');
  // }

  // onLogout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/Login']);
  // }

}
