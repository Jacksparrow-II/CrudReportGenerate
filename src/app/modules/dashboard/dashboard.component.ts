import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../../Services/reports.service';
import { HttpClient } from '@angular/common/http';
import { ChartType, Column } from 'angular-google-charts';
// import { ChartModule } from 'primeng/chart';
// import { GoogleChartInterface } from 'ng2-google-charts';
// import { ChartErrorEvent,ChartMouseLeaveEvent,ChartMouseOverEvent,ChartSelectionChangedEvent,ChartType,Column,GoogleChartComponent } from 'angular-google-charts';


declare var google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  data: any;
  dispname: any;

  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  }[] = [];

  constructor(private reportsService: ReportsService,private http: HttpClient) {
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

  public DisplayChart = {
    title: 'Display Chart',
    type: ChartType.LineChart,
    data: [
      ['Copper', 8.94],
      ['Silver', 10.49],
      ['Gold', 19.3],
      ['Platinum', 21.45]
    ],
    columns: ['Element', 'Density'],
    options: {
      //hAxis: {title: 'Month'},
      //vAxis: {title: 'Temperature'},   
      'width':550,
      'height':400,
      animation: {
        colors: ['#a52714', '#0000ff', '#ff0000', '#00ff00'],
        duration: 250,
        easing: 'ease-in-out',
        startup: true
      }
    }
  };


  ngOnInit(): void {
    this.display();

    // this.reportsService.GetChartDetails().subscribe(function (response) {
    //   google.charts.load('current', {
    //     packages: ['corechart']
    //   }).then(function () {
    //       var dataTable = new google.visualization.DataTable(response);

    //       var options = {
    //           title: 'Google Line Chart Example',
    //           width: 600,
    //           height: 370,
    //           columns: ['Time', 'Sales'],
    //           chartArea: { left: 40, top: 30},
    //           curveType: 'none',
    //           hAxis: {
    //               title: 'P\n\n\n\n',
    //               textStyle: {
    //                   fontName: 'Arial',
    //                   bold: false,
    //                   italic: false
    //               },
    //               titleTextStyle: {
    //                   fontName: 'Arial',
    //                   bold: false,
    //                   italic: false
    //               }
    //           },
    //           vAxis: {
    //               title: 'Likelihood',
    //               textStyle: {
    //                   bold: false,
    //                   italic: false
    //               },
    //               titleTextStyle: {
    //                 bold: false,
    //                 italic: false
    //             }
    //         },
    //     };

    //       var chart = new google.visualization.PieChart(document.getElementById("chartDiv"));
    //       chart.draw(dataTable, options);
    //   });
    // });
  }

  // Display Customer, Invoice and many more on dashboard
  display() {
    this.reportsService.GetDashboardDetails()
      .subscribe((data) => this.dispname=data);
  }

  // Google Chart
  // public pieChart: GoogleChartInterface = {
  //   chartType: 'PieChart',
  //   dataTable: [
  //     ['Task', 'Hours per Day'],
  //     ['Customer',     20],
  //     ['Invoice',      16],
  //     ['sales',  77],
  //     ['PayCollection', 48],
  //     ['store',    12]
  //   ],
  //   //firstRowIsData: true,
  //   options: {'title': 'Tasks',
  //   'width':650,
  //   'height':550},
  // };


}

