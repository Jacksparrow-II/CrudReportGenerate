import { DataTablesModule } from 'angular-datatables';
import { InvoiceService } from './../../../Services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getLocaleDateTimeFormat } from '@angular/common';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


declare var $;
declare var jQuery;


@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  DataTable: any;
  TableData: any;
  public invList: any;
  reid : any;
  term: string;
  custid: any;

  constructor(private http: HttpClient,private invoiceService: InvoiceService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
    this.reloadData();
    this.gedDatafromsource();
  }

  reloadData() {
    this.invoiceService.GetInvoice()
      .subscribe((data) => this.invList=data);
  }

  // List Invoice
  gedDatafromsource(){
    {
     this.invoiceService.GetInvoice().subscribe(data => {

      this.TableData = data;
      var r=$('#table_Invoice').DataTable({

        data: this.TableData,

        columns: [
          { data: 'invoiceNo'},
          { data: 'customerNo'},
          { data: 'invoiceDate' ,
          render: function(data, type, row){
                if(type === "sort" || type === "type"){
                  return data;
                }
              return moment(data).format("DD-MMM-YYYY");
            }
          },
          { data: 'invoiceAmount', render: $.fn.dataTable.render.number(',', '.', 2, '$'), className: "dt-right"},
          { data: 'paymentDueDate',
          render: function(data, type, row){
                if(type === "sort" || type === "type"){
                  return data;
                }
              return moment(data).format("DD-MMM-YYYY");
            }
          },
          {
            data: null,
            className: "dt-center",
            defaultContent: '<div class="btn-btn-sm"><a href="" class="btn btn-sm btn-primary method_update" title="Update" ><i class="fa fa-edit  edituserinfo" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="" class="btn btn-sm btn-danger method_delete" title="Delete"><i class="fa fa-trash Remove"></i></a></div>',
            orderable: false,
          },
        ],
      });

      //Update Invoice
      $("tbody").on("click", "a.method_update", e => {
        e.preventDefault();

        var tr = $(e.target).closest("tr");
        var row = r.row(tr).data();
        this.GetupdateById(row.invoiceNo);
      });

      // Delete Invoice
      $("tbody").on("click", "a.method_delete", e => {
        e.preventDefault();
       
        var tr = $(e.target).closest("tr");
        var row = r.row(tr).data();
          
          Swal.fire({
            title: 'Are you sure to delete this Invoice?',
            text: "You won't be able to revert this Invoice!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
       
            if (result.isConfirmed) {
       
        let resp= this.invoiceService.DeleteInvoice(row.invoiceNo);
        resp.subscribe((data)=>{
          this.custid=data
          if(this.custid == 1)
          {
            this.toastr.info('Deleted Successfully!');
            r.row(tr).remove().draw();
          }
          else if(data == -1)
          {
            this.toastr.warning('Please First Delete All Payment of this Invoice')     
          }  
          else
          {
            this.toastr.error('Something went wrong', 'Error');     
          }      
          this.reloadData()
        });
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
      })       
      });
     })
    }
  }

  GetupdateById(invoiceNo: string){
    this.router.navigate(['/Navbar/UpdateInvoice',invoiceNo]);
  }

}



















      // $("tbody").on("click", "a.method_delete", e => {
      //   e.preventDefault();

      //   var tr = $(e.target).closest("tr");
      //   var row = r.row(tr).data();

      //   Swal.fire({
      //     title: 'Are you sure?',
      //     text: 'You will not be able to recover this data!',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonText: 'Yes, delete it!',
      //     cancelButtonText: 'No, keep it'
      //   }).then((result) => {
      //     if (result.value) {
      //       Swal.fire(
      //         'Deleted!',
      //         'Your data has been deleted.',
      //         'success'
      //       )
      //       let resp= this.invoiceService.DeleteInvoice(row.invoiceNo);
      //       resp.subscribe((data)=> {this.reid=data});
      //       r.row(tr).remove().draw();
      //     } 
      //     else if (result.dismiss === Swal.DismissReason.cancel) {
      //       Swal.fire(
      //         'Cancelled',
      //         'Your data is safe :)',
      //         'error'
      //       )
      //     }
      //   })

      //   // if(confirm('Are you sure you want to delete this record !'))
      //   // {
      //   //   let resp= this.invoiceService.DeleteInvoice(row.invoiceNo);
      //   //   resp.subscribe((data)=> {this.reid=data});
      //   //   r.row(tr).remove().draw();
      //   //   this.toastr.success("Deleted Sucessfully");
      //   // }
      // });