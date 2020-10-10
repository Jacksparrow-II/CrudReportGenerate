import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../../Services/reports.service';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  data: any;
  dispname: any;

  constructor(private reportsService: ReportsService) {
    // this.data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //         {
    //             label: 'First Dataset',
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         },
    //         {
    //             label: 'Second Dataset',
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         }
    //     ]
    // }
}

  ngOnInit(): void {
    this.display();
  }

  display() {
    //this.dispname.reportsService();
    this.reportsService.GetDashboardDetails()
      .subscribe((data) => this.dispname=data);
  }

  update(event: Event) {
}

}
