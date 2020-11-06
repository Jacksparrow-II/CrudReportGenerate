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
  chartdata: any;
  sdk: any;
  sdk1: any;
  sdk2: any;
  dispname: any;
  value: any;
  DisplayBarChart: any;
  DisplayPieChart: any;
  DisplayBarChart1: any;

  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  }[] = [];
  datalength: number;


  constructor(private reportsService: ReportsService,private http: HttpClient) {


}

  public DisplayChart = {
    title1: 'Display Column Chart of Sales and Payment Collection',
    title2: 'Display Pie Chart of Due Payments and Payment Collection',
    title3: 'Display Line Chart of Due Payments and Payment Collection',
    title4: 'Display Bar Chart of Payments Collection Month Wise',
    title5: 'Display Bar Chart of Sales Collection Month Wise',
    type: ChartType.ColumnChart,
    type1: ChartType.PieChart,
    type2: ChartType.LineChart,
    type3: ChartType.Bar,
    data: [ ],
    columns: ['Element', 'Density'],
    columns1: ['Month', 'sales', 'Payment'],
    options: {  
      isStacked:true,
      is3D:true,
      'width':510,
      'height':400,
      animation: {
        colors: ['#a52714', '#0000ff', '#ff0000', '#00ff00'],
        duration: 2000,
        easing: 'ease-in-out',
        startup: true
      }
    },
    options1: {  
      isStacked:true,
      is3D:true,
      'width':450,
      'height':255,
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

    this.GetChartDataSales();
    
  }

  DashboardChart()
  {
    this.value = this.reportsService.GetDashboardDetails().subscribe((data) => { this.value=data
      this.DisplayBarChart=[['Sales',this.value[0].totalSales],['Pay Collection',this.value[0].totalPayCollection]];
      this.DisplayBarChart1=[['Due Payments',(this.value[0].totalSales-this.value[0].totalPayCollection)],['Pay Collection',this.value[0].totalPayCollection]];
   
      this.DisplayPieChart=[['Due Payments',(this.value[0].totalSales-this.value[0].totalPayCollection)],['Pay Collection',this.value[0].totalPayCollection]];
      //console.log(this.DisplayBarChart);
    });
  }

  GetChartDataSales(){   
    this.chartdata=this.reportsService.GetChartDetails().subscribe((data)=>{this.chartdata = data
      this.datalength=this.chartdata.length;
      var sdk1=[];
      var sdk2=[];
    if(this.chartdata != null && this.datalength >0){
      for(var i=0;i<this.datalength;i++)
      {
        var sdk = [];
        sdk.push(new Date(this.chartdata[i].monthAndYearDate));
        sdk.push(this.chartdata[i].chartSales);
        //sdk.push((this.chartdata[i].chartPayment))
        sdk1.push(sdk);
        var sdkin = [];
        sdkin.push(new Date(this.chartdata[i].monthAndYearDate));
        sdkin.push(this.chartdata[i].chartPayment);
        //sdk.push((this.chartdata[i].chartSales))
        sdk2.push(sdkin);
      }
    }    
    this.sdk=sdk1;
    this.sdk1=sdk2;
    
    console.log([this.sdk])     
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




  
// <p-chart type="bar" [data]="data"></p-chart>
//   <button type="button" pButton (click)="update($event)"></button> -->
// <div id="chartContainer" style="height: 370px; width: 100%;"></div> -->
  
// <div id="chartDiv" class="PieChart" style="height: 300px;width:100%;">
//       <svg></svg>
// </div>