import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthServiceService } from '../service/auth-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  firstName: string;
  lastName: string;
  userId: string;
  password: string;
  error: boolean = false;
  message: string;

  constructor(
    private _authService: AuthServiceService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private spinner: NgxSpinnerService
    ) { }


  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userId: ['',Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.signUpForm.controls;
  }

  signup(data : any){
    this.spinner.show();
    console.log("data passed from login form", this.signUpForm);
    if(this.signUpForm.invalid){
      return;
    }

    this._authService.postSignUp(this.signUpForm.value).subscribe(
      (res: any)=>{
        this.spinner.hide();
        console.log("this is response from service", res);
        if(res.signUp){
          this.router.navigateByUrl('/login')
        }
        else{
          this.error = true;
          this.message = res.message;
        }
      }
    );
  }

}
