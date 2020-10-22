import { InvoiceService } from './../../../Services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { Inv } from '../../../Models/Invoice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  form = new FormGroup({
    invoiceNo: new FormControl('',Validators.required),
    customerNo: new FormControl('',Validators.required),
    invoiceDate: new FormControl('',Validators.required),
    invoiceAmount: new FormControl('',Validators.required)
  })

  Inv: Inv = new Inv ();
  message:any;   

  constructor(private http: HttpClient,private invoiceService: InvoiceService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
  }

  // Add Invoice
  public AddInvoiceDetails(){
    {
      let resp=this.invoiceService.AddInvoice(this.Inv);resp.subscribe((data)=>{this.message=(data)
      
        if(this.message == 1)
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

  ClearData() {
    this.Inv.invoiceNo = null;
    this.Inv.customerNo = null;
    this.Inv.invoiceDate = null;
    this.Inv.invoiceAmount = null;
  }

}
