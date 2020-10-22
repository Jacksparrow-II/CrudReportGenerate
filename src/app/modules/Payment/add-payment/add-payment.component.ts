import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PaymentService } from './../../../Services/payment.service';
import { InvoiceService } from './../../../Services/invoice.service';
import { CrudReportService } from '../../../Services/crud-report.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Pay } from '../../../Models/Payment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

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
  DuePayment : any;
  Invoice : any;
  temp : any;
  depList : any;
  show:boolean=false;

  constructor(private http: HttpClient,private invoiceService: InvoiceService,private paymentService: PaymentService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
    //this.Invoice=this.paymentService.GetInvoiceDetailsByNo(this.Pay.invoiceNo).subscribe((data)=>this.Invoice=data);    
    this.depList=this.invoiceService.GetInvoice().subscribe((data)=>this.depList=data);

  }

  public addpayment(){
    {
      //this.abs();
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

  abs(){
    this.Invoice=this.paymentService.GetInvoiceDetailsByNo(this.Pay.invoiceNo).subscribe((data)=>this.Invoice=data);    
   if( this.Pay.invoiceNo != undefined)
   {
     this.show=true;
   }
  }
  registerNow(){
  //  this.abs();
    this.registerNow1();
   // this.addpayment();
  }

  public registerNow1() {

   // this.abs();
    console.log(this.Invoice[0].invoiceAmount)
    this.DuePayment=(this.Invoice[0].invoiceAmount - this.Invoice[0].paymentAmount);
    if(this.DuePayment < this.Pay.paymentAmount)
    {
      Swal.fire({
        title: 'Are you sure to Add this Payment?',
        text: "Payment Amount is Greater than Invoice Amount",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!'
      }).then((result) => {
  
        if (result.isConfirmed) {
          this.addpayment();   
         } 
         else if (result.isDismissed) {
        this.toastr.warning('Payment Canceled!.');  
        console.log('Opps !!! Payment not Added');
        }
      })
    }
    else
    {
      this.addpayment();
    }

  }



  gotoList() {
    // this.router.navigateByUrl('/List-Employee', { skipLocationChange: true });
    this.router.navigate(["/ListPayment"]);
  }

  ClearData() {
    this.Pay.paymentNo = null;
    this.Pay.invoiceNo = null;
    this.Pay.paymentDate = null;
    this.Pay.paymentAmount = null;
  }


}
