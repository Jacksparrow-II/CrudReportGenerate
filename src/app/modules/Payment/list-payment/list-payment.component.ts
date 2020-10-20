import { PaymentService } from './../../../Services/payment.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { CrudReportService } from '../../../Services/crud-report.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Pay } from '../../../Models/Payment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { Title } from "@angular/platform-browser";
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

declare var $;
declare var jQuery;

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {

  
  DataTable: any;
  TableData: any;
  //Title: any = "Payment";

  constructor(private http: HttpClient,private paymentService: PaymentService,private toastr: ToastrService,public router: Router) { }

  public payList: any;
  reid : any;
  term: string;

  ngOnInit(): void {
    this.gedDatafromsource();
  }

  gedDatafromsource(){
    {
     this.paymentService.GetPayment().subscribe(data => {

      this.TableData = data;
      var r=$('#table_Payment').DataTable({

        data: this.TableData,

        columns: [
          { data: 'paymentNo'},
          { data: 'invoiceNo'},
          { data: 'paymentDate',
          render: function(data, type, row){
                if(type === "sort" || type === "type"){
                  return data;
                }
              return moment(data).format("DD-MMM-YYYY");
            }
          },
          { data: 'paymentAmount', render: $.fn.dataTable.render.number(',', '.', 2, '$'), className: "dt-right"},
          {
            data: null,
            className: "dt-center",
            defaultContent: '<div class="btn-btn-sm"><a href="" class="btn btn-sm btn-primary method_update" title="Update" ><i class="fa fa-edit  edituserinfo" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="" class="btn btn-sm btn-danger method_delete" title="Delete"><i class="fa fa-trash Remove"></i></a></div>',
            orderable: false,
          },
        ]
      });
      //$("table_Customer tbody").unbind();
      
      $("tbody").on("click", "a.method_update", e => {
        e.preventDefault();

        var tr = $(e.target).closest("tr");
        var row = r.row(tr).data();
        this.GetupdateById(row.paymentNo);
      });

      $("tbody").on("click", "a.method_delete", e => {
        e.preventDefault();

        var tr = $(e.target).closest("tr");
        var row = r.row(tr).data();
        
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            let resp= this.paymentService.DeletePayment(row.paymentNo);
            resp.subscribe((data)=> {this.reid=data});
            r.row(tr).remove().draw();
          } 
          else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your data is safe :)',
              'error'
            )
          }
        })
      });
     })
    }
  }

  GetupdateById(paymentNo: string){
    this.router.navigate(['/Navbar/UpdatePayment',paymentNo]);

  }
}