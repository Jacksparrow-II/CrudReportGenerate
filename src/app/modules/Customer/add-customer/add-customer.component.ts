import { CustomerService } from './../../../Services/customer.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { CrudReportService } from '../../../Services/crud-report.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Cust } from '../../../Models/Customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { ifError } from 'assert';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  form = new FormGroup({
    customerNo: new FormControl('',Validators.required),
    customerName: new FormControl('',[Validators.required])
  })

  Cust: Cust = new Cust ();
  message:any;  

  constructor(private http: HttpClient,private customerService: CustomerService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
  }

  public registerNow(){
    {
  
      let resp=this.customerService.AddCustomer(this.Cust);resp.subscribe((data)=>{this.message=(data)
        if(this.message == 1)
      {
        this.gotoList()
        this.toastr.success("Your record added Sucessfully!");
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: 'top-end',
        //   background: 'red',
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener('mouseenter', Swal.stopTimer)
        //     toast.addEventListener('mouseleave', Swal.resumeTimer)
        //   }
        // })
        
        // Toast.fire({
        //   icon: 'success',
        //   title: 'Your record added Sucessfully!'
        // })
      }
      else if(this.message == -1)
      {
        this.toastr.warning("Customer is already Exist");
      }
      else
      {
        this.toastr.warning("Error !!!");
      }
      });
    }   
  }
  
  gotoList() {
    // this.router.navigateByUrl('/List-Employee', { skipLocationChange: true });
    this.router.navigate(["/Navbar/ListCustomer"]);
  }

  ClearData() {
    this.Cust.customerNo = null;
    this.Cust.customerName = null;
  }

}
