import { EditprofileService } from './../../Services/editprofile.service';
import { RegistrationService } from './../../Services/registration.service';
import { EdtPro } from './../../Models/EditProfile';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    userName: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    usertype: new FormControl('',Validators.required)
    //region: new FormControl('',Validators.required)
  })

  //Region = ['North','East','West','South'];

  // Data: Array<any> = [
  //   { name: 'Pear', value: 'pear' },
  //   { name: 'Plum', value: 'plum' },
  //   { name: 'Kiwi', value: 'kiwi' },
  //   { name: 'Apple', value: 'apple' }
  // ];  

  EdtPro: EdtPro = new EdtPro ();
  message:any; 
  userId:number;
  public desobj : any;

  constructor(private fb: FormBuilder,public route: ActivatedRoute,private http: HttpClient,private editprofileService: EditprofileService,private toastr: ToastrService,public router: Router) {
    // this.form = this.fb.group({
    //   checkArray: this.fb.array([])
    // })
   }

  ngOnInit(): void {
    //this.form = this.fb.group({
    //name: this.fb.array([])

    this.desobj = new EdtPro();
    this.userId = this.route.snapshot.params['userId'];

    this.editprofileService.GetEditProfileById(this.userId)
      .subscribe(data => {
        console.log(data)
        this.EdtPro = data;
      }, error => console.log(error));
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
      this.selectedRegions.splice(index,1);
    }
    console.log(this.selectedRegions);
  }


  public registerNow(){
    {
          
     let resp=this.editprofileService.EditProfile(this.EdtPro,this.userId);
     resp.subscribe((data)=>{ this.message=(data)
       if( data == 1)
       {
         this.gotoLogin()
         this.toastr.success("Your Profile Update Sucessfully!");
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

  gotoLogin() {
    this.router.navigate(["/Login"]);
  }

  ClearData() {
    this.EdtPro.firstName = null;
    this.EdtPro.lastName = null;
    this.EdtPro.userName = null;
    this.EdtPro.password = null;
    this.EdtPro.dob = null;
    this.EdtPro.gender = null;
    this.EdtPro.usertype = null;
    this.EdtPro.region = null;
  }
}