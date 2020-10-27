import { Title } from '@angular/platform-browser';
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
  value: any;
  DisplayBarChart: any;
  DisplayPieChart: any;

  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  }[] = [];


  constructor(private reportsService: ReportsService,private http: HttpClient) {


}

  public DisplayChart = {
    title: 'Display Bar Chart',
    title1: 'Display Pie Chart',
    type: ChartType.BarChart,
    type1: ChartType.PieChart,
    data: [ ],
    columns: ['Element', 'Density'],
    options: {  
      'width':510,
      'height':400,
      animation: {
        colors: ['#a52714', '#0000ff', '#ff0000', '#00ff00'],
        duration: 2000,
        easing: 'ease-in-out',
        startup: true
      }
    }
  };


  ngOnInit(): void {

    this.display();

    this.DashboardChart();

  }

  DashboardChart()
  {
    this.value = this.reportsService.GetDashboardDetails().subscribe((data) => { this.value=data
      this.DisplayBarChart=[['Sales',this.value[0].totalSales],['Pay Collection',this.value[0].totalPayCollection]];
    //  this.DisplayBarChart=[['Sales',this.value[0].totalSales],['Pay Collection',this.value[0].totalSales]];
   
      this.DisplayPieChart=[['Due Payments',(this.value[0].totalSales-this.value[0].totalPayCollection)],['Pay Collection',this.value[0].totalPayCollection]];
      //console.log(this.DisplayBarChart);
    });
  }

  // Display Customer, Invoice and many more on dashboard
  display() {
    this.reportsService.GetDashboardDetails()
      .subscribe((data) => this.dispname=data);
  }


}































//*****************************************************************************************************//


    
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


//*****************************************************************************************************//
//Samart ar
// datalength:number;
//   GetChartDataSales(){   
//     this.data=this.reportsService.GetChartDetails().subscribe((data)=>{this.data = data
//       this.datalength=this.data.length;
//       var temp1=[];
//     if(this.data != null && this.datalength >0){
//       for(var i=0;i<this.datalength;i++)
//       {
//         var temp = [];
//         temp.push(this.data[i].dates);
//         temp.push(this.data[i].sales);
//         temp1.push(temp);
//       }
//     }    
//     this.data=temp1;
//     console.log([this.data])    
//     });
//   }



//*****************************************************************************************************//

// <!-- <table>
// <tr>
//   <td style="width: 50%;">
//     <div class="card-header">
//       <h4 class="card-title">Chart</h4>
//     </div>
//     <div id="chartDiv" class="PieChart" style="height: 300px;width:100%;">
//       <svg></svg>
//     </div>
//   </td>
// </tr>
// </table> -->

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



//*****************************************************************************************************//


 //<google-chart [data]="pieChart" style = "width: 550px; height: 400px; margin: 0 auto"></google-chart> -->

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