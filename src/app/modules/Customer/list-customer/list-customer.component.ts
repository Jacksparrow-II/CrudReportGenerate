import { CustomerService } from './../../../Services/customer.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

declare var $;
declare var jQuery;

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  custid: any;

  constructor(private http: HttpClient,private customerService: CustomerService,private toastr: ToastrService,public router: Router) { }

  public custList: any;
  reid : any;
  term: string;
  DataTable: any;
  TableData: any;
  message:any; 
  data:any; 
  
  ngOnInit(): void {
    this.reloadData();
    this.gedDatafromsource();
  }

  reloadData() {
    this.customerService.GetCustomer()
      .subscribe((data) => this.custList=data);
  }

  gedDatafromsource(){
    {
     this.customerService.GetCustomer().subscribe(data => {

      this.TableData = data;
      var r=$('#table_Customer').DataTable({

        data: this.TableData,

        columns: [
          { data: 'customerNo'},
          { data: 'customerName'}, 
          {
            data: null,
            className: "dt-center",
            defaultContent: '<div class="btn-btn-sm"><a href="" class="btn btn-sm btn-primary method_update" title="Update" ><i class="fa fa-edit  edituserinfo" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="" class="btn btn-sm btn-danger method_delete" title="Delete"><i class="fa fa-trash Remove"></i></a></div>',
            orderable: false,
          },
        ],
      });


      //$("table_Customer tbody").unbind();
      
      $("tbody").on("click", "a.method_update", e => {
        e.preventDefault();

        var tr = $(e.target).closest("tr");
        var row = r.row(tr).data();
        this.GetupdateById(row.customerNo);
      });

      $("tbody").on("click", "a.method_delete", e => {
        e.preventDefault();
       
        var tr = $(e.target).closest("tr");
        var row = r.row(tr).data();
        
       // this.DeleteCustomer(row.customerNo)
        // if (confirm('Are you sure to delete this record ?'))
        // {
          
          Swal.fire({
            title: 'Are you sure to delete this Customer?',
            text: "You won't be able to revert this Customer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
       
            if (result.isConfirmed) {
       
        let resp= this.customerService.DeleteCustomer(row.customerNo);
        resp.subscribe((data)=>{
          this.custid=data
          if(this.custid == 1)
          {
            this.toastr.info('Deleted Successfully!');
            r.row(tr).remove().draw();
          }
          else if(data == -1)
          {
            this.toastr.warning('Please First Delete All Payment & Invoice of this Customer')     
          }  
          else
          {
            this.toastr.error('Something went wrong', 'Error');     
          }      
          this.reloadData()
        });
      } 
      else if (result.isDismissed) 
      {
        console.log('Clicked No, File is safe!');
      }
      })       
      });
      

      // $("tbody").on("click", "a.method_delete", e => {
      //   e.preventDefault();

      //   var tr = $(e.target).closest("tr");
      //   var row = r.row(tr).data();
        
      //   // const swalWithBootstrapButtons = Swal.mixin({
      //   //   customClass: {
      //   //     confirmButton: 'btn btn-success',
      //   //     cancelButton: 'btn btn-danger'
      //   //   },
      //   //   buttonsStyling: false
      //   // })
        
      //   // swalWithBootstrapButtons.fire({
      //   //   title: 'Are you sure?',
      //   //   text: "You won't be able to revert this!",
      //   //   icon: 'warning',
      //   //   showCancelButton: true,
      //   //   confirmButtonText: 'Yes, delete it!',
      //   //   cancelButtonText: 'No, cancel!',
      //   //   reverseButtons: true
      //   // }).then((result) => {
      //   //   if (result.isConfirmed) {
      //   //     swalWithBootstrapButtons.fire(
      //   //       'Deleted!',
      //   //       'Your file has been deleted.',
      //   //       'success'
      //   //     )
      //   //     let resp= this.customerService.DeleteCustomer(row.customerNo);
      //   //     resp.subscribe((data)=> {this.reid=data});
      //   //     r.row(tr).remove().draw();
      //   //   } 
      //   //   else if (
      //   //     /* Read more about handling dismissals below */
      //   //     result.dismiss === Swal.DismissReason.cancel
      //   //   ) {
      //   //     swalWithBootstrapButtons.fire(
      //   //       'Cancelled',
      //   //       'Your imaginary file is safe :)',
      //   //       'error'
      //   //     )
      //   //   }
      //   // })

      //   // Swal.fire({
      //   //   title: 'Are you sure?',
      //   //   text: 'You will not be able to recover this data!',
      //   //   icon: 'warning',
      //   //   showCancelButton: true,
      //   //   confirmButtonText: 'Yes, delete it!',
      //   //   cancelButtonText: 'No, keep it'
      //   // }).then((result) => {
      //   //   if (result.value) {
      //   //     Swal.fire(
      //   //       'Deleted!',
      //   //       'Your data been deleted.',
      //   //       'success'
      //   //     )
      //   //     if(this.message == -1)
      //   //     {
      //   //       this.toastr.success("First Delete invoice and payment of this CustomerNo");              
      //   //     }
      //   //     else if(this.message == 1)
      //   //     {
      //   //       let resp= this.customerService.DeleteCustomer(row.customerNo);
      //   //       resp.subscribe((data)=> {this.reid=data});
      //   //       r.row(tr).remove().draw();
      //   //     }
      //   //     else
      //   //     {
      //   //       this.toastr.success("Error !!!");
      //   //     }
            
      //   //   } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   //     Swal.fire(
      //   //       'Cancelled',
      //   //       'Your data is safe :)',
      //   //       'error'
      //   //     )
      //   //   }
      //   // })

        
      //   if(confirm('Are you sure you want to delete this record !'))
      //   {
      //     if(this.reid == 1)
      //     {
      //       let resp= this.customerService.DeleteCustomer(row.customerNo);
      //       resp.subscribe((data)=> {this.reid=data});
      //       r.row(tr).remove().draw();
      //       this.toastr.success("Deleted Sucessfully");
      //     }
      //     else if(this.reid == -1)
      //     {
      //       this.toastr.success("First Delete invoice and payment of this CustomerNo");   
      //     }
      //     else
      //     {
      //      this.toastr.success("Error !!!");
      //     }
      //   }
      // });


     })
    }
  }

  GetupdateById(customerNo: string){
    this.router.navigate(['/Navbar/UpdateCustomer',customerNo]);

  }
}