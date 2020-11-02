import { NavbarService } from './../../Services/navbar.service';
import { LoginService } from './../../Services/login.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../Models/Login';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form = new FormGroup({
  //   userName: new FormControl('',[Validators.required, Validators.email]),
  //   password: new FormControl('',Validators.required)
  // })

  formModel = {
    userName: '',
    password: ''
  }

  disList: any;
  depList: any;
  Login: Login = new Login ();

  message:any;

  constructor(public http: HttpClient,private loginService: LoginService,public navbarService : NavbarService
    ,public router: Router,private toastr: ToastrService) {
    navbarService.Hide(); 
  
   }

  ngOnInit(): void {
  
    if (localStorage.getItem('token') != null)
    this.gotoList();
  }

  onSubmit(form: NgForm) {
    this.loginService.Login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('firstName', res.firstName);
        localStorage.setItem('userId', res.userId);
        this.toastr.success('Login Sucessfully')
        this.gotoList();
        this.navbarService.Show();
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.');
        else
          console.log(err);
      }
    );
  }

  gotoList() {
    this.router.navigate(["/Dashboard"]);
  }
}