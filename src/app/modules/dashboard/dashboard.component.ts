import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../../Services/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  dispname: any;

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.display();
  }

  display() {
    //this.dispname.reportsService();
    this.reportsService.GetDashboardDetails()
      .subscribe((data) => this.dispname=data);
  }

}
