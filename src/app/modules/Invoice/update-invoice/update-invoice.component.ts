import { Inv } from './../../../Models/Invoice';
import { InvoiceService } from './../../../Services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {

  form = new FormGroup({
    invoiceNo: new FormControl('',Validators.required),
    customerNo: new FormControl('',Validators.required),
    invoiceDate: new FormControl('',Validators.required),
    invoiceAmount: new FormControl('',Validators.required)
    // paymentDueDate: new FormControl('',Validators.required)
  })

  Inv: Inv = new Inv ();
  message:any; 
  invoiceNo:string;
  public desobj : any;

  constructor(private http: HttpClient,public route: ActivatedRoute,private invoiceService: InvoiceService,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {

    this.desobj = new Inv();
    this.invoiceNo = this.route.snapshot.params['invoiceNo'];

    this.invoiceService.GetById(this.invoiceNo)
      .subscribe(data => {
        console.log(data)
        this.Inv = data;
      }, error => console.log(error));
  }

  public Updatedata(){
    if(this.Inv.invoiceAmount <= 0)
    {
      this.toastr.warning("Please Enter Invoice Amount Greater Than 0");
    }
    else
    {
      this.UpdateInvoiceDetails();
    }
  }

  //Update Invoice
  public UpdateInvoiceDetails(){
    {

      this.Inv.modifyBy = localStorage.getItem('firstName');
      
     let resp=this.invoiceService.UpdateInvoice(this.Inv,this.invoiceNo);
     resp.subscribe((data)=>{ this.message=(data)
       if( data == 1)
       {
         this.gotoList()
         this.toastr.success("Your record Update Sucessfully!");
       }
       else if( data == -1)
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
     this.router.navigateByUrl('/ListInvoice', { skipLocationChange: true });
     this.router.navigate(["/ListInvoice"]);
   }

}
