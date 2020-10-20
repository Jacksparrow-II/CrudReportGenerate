import { CustomerService } from './../../../Services/customer.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { Router, ActivatedRoute } from '@angular/router';
import { Cust } from '../../../Models/Customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  form = new FormGroup({
    customerNo: new FormControl('',Validators.required),
    customerName: new FormControl('',Validators.required)
  })

  Cust: Cust = new Cust ();
  message:any; 
  customerNo:string;
  public desobj : any;

  constructor(private http: HttpClient,private customerService: CustomerService,public route: ActivatedRoute,private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {

    this.desobj = new Cust();
    this.customerNo = this.route.snapshot.params['customerNo'];

    this.customerService.GetById(this.customerNo)
      .subscribe(data => {
        console.log(data)
        this.Cust = data;
      }, error => console.log(error));
  }

  // Update Customer
  public Updatedata(){
    {
      
     let resp=this.customerService.UpdateCustomer(this.Cust,this.customerNo);
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
     this.router.navigateByUrl('/Navbar/ListCustomer', { skipLocationChange: true });
     this.router.navigate(["/Navbar/ListCustomer"]);
   }

}
