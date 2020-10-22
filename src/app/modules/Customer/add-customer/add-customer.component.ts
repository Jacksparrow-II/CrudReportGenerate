import { CustomerService } from './../../../Services/customer.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { Router, ActivatedRoute } from '@angular/router';
import { Cust } from '../../../Models/Customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
//Add Customer
  public registerNow(){
    {
  
      let resp=this.customerService.AddCustomer(this.Cust);resp.subscribe((data)=>{this.message=(data)
        if(this.message == 1)
      {
        this.gotoList()
        this.toastr.success("Your record added Sucessfully!");
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
  
// Go To List
  gotoList() {
    this.router.navigate(["/ListCustomer"]);
  }

// Clear Form Data
  ClearData() {
    this.Cust.customerNo = null;
    this.Cust.customerName = null;
  }

}
