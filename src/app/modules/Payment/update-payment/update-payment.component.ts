import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { CrudReportService } from '../../../Services/crud-report.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Pay } from '../../../Models/Payment';
import { PaymentService } from './../../../Services/payment.service';
import { InvoiceService } from './../../../Services/invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {

  form = new FormGroup({
    paymentNo: new FormControl('',Validators.required),
    invoiceNo: new FormControl('',Validators.required),
    paymentDate: new FormControl('',Validators.required),
    paymentAmount: new FormControl('',Validators.required)
  })

  Pay: Pay = new Pay ();
  message:any; 
  paymentNo:string;
  public desobj : any;
  DuePayment : any;
  Invoice : any;
  temp : any;
  depList : any;
  old : any;
  show:boolean=false;

  constructor(private http: HttpClient,private invoiceService: InvoiceService,private paymentService: PaymentService,private toastr: ToastrService,public route: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {

    this.depList=this.invoiceService.GetInvoice().subscribe((data)=>this.depList=data);

    this.desobj = new Pay();
    this.paymentNo = this.route.snapshot.params['paymentNo'];
    this.GetPaymentById();

    this.paymentService.GetById(this.paymentNo)
      .subscribe(data => {
        console.log(data)
        this.Pay = data;
        this.Invoice=this.paymentService.GetInvoiceDetailsByNo(this.Pay.invoiceNo).subscribe((data)=>this.Invoice=data); 
        if( this.Pay.invoiceNo != undefined)
        {
          this.show=true;
        }
      }, error => console.log(error));    
      
  }

  public Adddata(){
    if(this.Pay.paymentAmount <= 0)
    {
      this.toastr.warning("Please Enter Invoice Amount Greater Than 0");
    }
    else
    {
      this.registerNow();
    }
  }

  public Updatedata(){
    {

    this.Pay.modifyBy = localStorage.getItem('firstName');
      
     let resp=this.paymentService.UpadtePayment(this.Pay,this.paymentNo);
     resp.subscribe((data)=>{ this.message=(data)
       if( data == 1)
       {
         this.gotoList()
         this.toastr.success("Your record Update Sucessfully!");
       }
       else if( data == -1)
       {
         this.toastr.warning("Oops ! Customer No is already exist");
       }
       else
       {
         this.toastr.warning("Error !!!");
       }
     });
    }
   }

   GetDetails(){
    this.Invoice=this.paymentService.GetInvoiceDetailsByNo(this.Pay.invoiceNo).subscribe((data)=>this.Invoice=data);    
   if( this.Pay.invoiceNo != undefined)
   {
     this.show=true;
   }
  }

  registerNow(){
  //  this.abs();
    this.registerNow1();
   // this.Updatedata();
  }

  public registerNow1() {

    console.log(this.Invoice[0].invoiceAmount)
    this.DuePayment=(this.Invoice[0].invoiceAmount - this.Invoice[0].paymentAmount) + this.old.paymentAmount;
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
          this.Updatedata();   
         } 
         else if (result.isDismissed) {
        this.toastr.warning('Payment Canceled!.');  
        console.log('Opps !!! Payment not Added');
        }
      })
    }
    else
    {
      this.Updatedata();
    }

  }

  GetPaymentById(){  
    this.paymentService.GetById(this.paymentNo)
    .subscribe(data => {
      this.old = data;
     }); 
    }

   gotoList() {
     this.router.navigateByUrl('/ListPayment', { skipLocationChange: true });
     this.router.navigate(["/ListPayment"]);
   }

}
