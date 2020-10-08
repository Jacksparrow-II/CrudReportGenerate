import { RegistrationService } from './../../Services/registration.service';
import { Reg } from './../../Models/Registration';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    userName: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    usertype: new FormControl('',Validators.required),
    region: new FormControl('',Validators.required)
  })

  //Region = ['North','East','West','South'];

  // Data: Array<any> = [
  //   { name: 'Pear', value: 'pear' },
  //   { name: 'Plum', value: 'plum' },
  //   { name: 'Kiwi', value: 'kiwi' },
  //   { name: 'Apple', value: 'apple' }
  // ];  

  Reg: Reg = new Reg ();
  message:any;  

  constructor(private fb: FormBuilder,private http: HttpClient,private registrationService: RegistrationService,private toastr: ToastrService,public router: Router) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
   }

  ngOnInit(): void {
    //this.form = this.fb.group({
    //name: this.fb.array([])
  }

  selectedRegions:any=[];

  Regions=[
    {
      "key":"North",
      "value":"North"
    },
    {
      "key":"South",
      "value":"South"
    },
    {
      "key":"East",
      "value":"East"
    },
    {
      "key":"West",
      "value":"West"
    }
  ]

  onCheckboxChange(event){
    let index =this.selectedRegions.indexOf(event.target.value);
    if (index == -1){
      this.selectedRegions.push(event.target.value);
    }else{
      this.selectedRegions.splice(index,1) 
    }
    console.log(this.selectedRegions)
  }

  
  public registerNow(){
    {
  
      let resp=this.registrationService.Registration(this.Reg);resp.subscribe((data)=>{this.message=(data)
      
        if(this.message == 1)
      {
        this.Reg.region = this.selectedRegions.tostring();
        this.gotoLogin()
        this.toastr.success("Your record added Sucessfully!");
      }
      else if(this.message == -1)
      {
        this.toastr.warning("Oops ! User is already exist");
      }
      else
      {
        this.toastr.warning("Error !!!");
      }
      });
    }   
  }

  gotoLogin() {
    this.router.navigate(["/Login"]);
  }

  ClearData() {
    this.Reg.firstName = null;
    this.Reg.lastName = null;
    this.Reg.userName = null;
    this.Reg.password = null;
    this.Reg.dob = null;
    this.Reg.gender = null;
    this.Reg.usertype = null;
    this.Reg.region = null;
  }


}
