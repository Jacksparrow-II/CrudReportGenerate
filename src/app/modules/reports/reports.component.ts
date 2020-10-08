import { DataTablesModule } from 'angular-datatables';
import { ReportsService } from './../../Services/reports.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

declare var $;
declare var jQuery;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  DataTable: any;
  TableData: any;
  public invList: any;
  reid : any;
  term: string;

  constructor(private http: HttpClient,private reportsService: ReportsService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
    
    this.reloadData();
    this.gedDatafromsource();
  }

  reloadData() {
    this.reportsService.GetReport()
      .subscribe((data) => this.invList=data);
  }

  gedDatafromsource(){
    {
     this.reportsService.GetReport().subscribe(data => {

      this.TableData = data;
      var r=$('#table_Report').DataTable({

        data: this.TableData,

        columns: [
          { data: 'customerName'},
          { data: 'dateOfMonth',
                    render: function(data, type, row){
                if(type === "sort" || type === "type"){
                  return data;
                }
              return moment(data).format("MMM-YYYY");
            }
          },
          { data: 'noofInvoice'},
          { data: 'sales', render: $.fn.dataTable.render.number(',', '.', 2, '$'), className: "dt-right"},
          { data: 'payCollection', render: $.fn.dataTable.render.number(',', '.', 2, '$'), className: "dt-right"},
        ],
      });

     })
    }
  }
}







