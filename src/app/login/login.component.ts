import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthServiceService } from '../service/auth-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  userId: string;
  password: string;
  error: boolean= false;
  message: string;

  constructor(
    private _authService: AuthServiceService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userId: ['',Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.loginForm.controls
  }

  login(data : any){
    if(this.loginForm.invalid){
      this.error = true;
      this.message = "Enter Email Id and Password."
      return;
    }
    this.spinner.show();
    this._authService.postLogin(this.loginForm.value).subscribe(
      (res: any)=>{
        this.spinner.hide();
        sessionStorage.setItem("userId", this.loginForm.value.userId);
        if(res.login){
          this.router.navigateByUrl('/home/chart1');
        }
        else{
          this.error = true;
          this.message = res.message;
        }
      }
    );
  }
}
