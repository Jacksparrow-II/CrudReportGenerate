import { Inv } from './../../../Models/Invoice';
import { InvoiceService } from './../../../Services/invoice.service';
import { CustomerService } from './../../../Services/customer.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  form = new FormGroup({
    invoiceNo: new FormControl('',[Validators.required,Validators.pattern(/^\S*$/)]),
    customerNo: new FormControl('',Validators.required),
    invoiceDate: new FormControl('',Validators.required),
    invoiceAmount: new FormControl('',Validators.required)
  })

  Inv: Inv = new Inv ();
  message:any;   
  Customer:any;   
  TodayDate :any;
  Val: any;

  constructor(private http: HttpClient,private customerService: CustomerService,private invoiceService: InvoiceService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
    this.AutoIncreamnet();
    this.TodayDate  =new Date();
    this.Customer=this.customerService.GetCustomer().subscribe((data)=>this.Customer=data)
  }

  public AddInvoice(){
    if(this.Inv.invoiceAmount <= 0)
    {
      this.toastr.warning("Please Enter Invoice Amount Greater Than 0");
    }
    else
    {
      this.AddInvoiceDetails();
    }
  }

  // Add Invoice
  public AddInvoiceDetails(){
    {
      this.Inv.createdBy = localStorage.getItem('firstName');

      let resp=this.invoiceService.AddInvoice(this.Inv);resp.subscribe((data)=>{this.message=(data)
      
        if(this.message >= 1)
      {
        this.gotoList()
        this.toastr.success("Your record added Sucessfully!");
      }
      else if(this.message == -1)
      {
        this.toastr.warning("Oops ! Invoice No is already exist");
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
    this.router.navigate(["/ListInvoice"]);
  }

  AutoIncreamnet() {
    this.Val = this.invoiceService.AutoIncreamnet().subscribe((data)=>this.Val=data) 
  }

  ClearData() {
    this.Inv.invoiceNo = null;
    this.Inv.customerNo = null;
    this.Inv.invoiceDate = null;
    this.Inv.invoiceAmount = null;
  }

}
