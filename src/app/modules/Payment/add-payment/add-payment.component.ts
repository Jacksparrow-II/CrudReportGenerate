import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PaymentService } from './../../../Services/payment.service';
import { CrudReportService } from '../../../Services/crud-report.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Pay } from '../../../Models/Payment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  form = new FormGroup({
    paymentNo: new FormControl('',Validators.required),
    invoiceNo: new FormControl('',Validators.required),
    paymentDate: new FormControl('',Validators.required),
    paymentAmount: new FormControl('',Validators.required)
  })

  Pay: Pay = new Pay ();
  message:any;  

  constructor(private http: HttpClient,private paymentService: PaymentService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
  }

  public registerNow(){
    {
  
      let resp=this.paymentService.AddPayment(this.Pay);resp.subscribe((data)=>{this.message=(data)
      
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
    this.router.navigate(["/Navbar/ListPayment"]);
  }

  ClearData() {
    this.Pay.paymentNo = null;
    this.Pay.invoiceNo = null;
    this.Pay.paymentDate = null;
    this.Pay.paymentAmount = null;
  }


}
