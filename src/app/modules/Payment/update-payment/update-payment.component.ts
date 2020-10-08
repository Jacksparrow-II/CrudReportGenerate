import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { CrudReportService } from '../../../Services/crud-report.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Pay } from '../../../Models/Payment';
import { PaymentService } from './../../../Services/payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient,private paymentService: PaymentService,private toastr: ToastrService,public route: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {

    this.desobj = new Pay();
    this.paymentNo = this.route.snapshot.params['paymentNo'];

    this.paymentService.GetById(this.paymentNo)
      .subscribe(data => {
        console.log(data)
        this.Pay = data;
      }, error => console.log(error));
  }

  public Updatedata(){
    {
      
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

   gotoList() {
     this.router.navigateByUrl('/Navbar/ListPayment', { skipLocationChange: true });
     this.router.navigate(["/Navbar/ListPayment"]);
   }

}
