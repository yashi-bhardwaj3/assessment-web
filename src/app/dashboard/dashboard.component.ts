import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _authService: AuthServiceService,
    private router : Router) { }

  ngOnInit() {
    if(!sessionStorage.getItem("userId")){
      this.router.navigateByUrl('/login');
    }
  }

  logOut(){
    this._authService.postlogOut(sessionStorage.getItem("userId"))
    .subscribe((res: any)=>{
      console.log("inside logout",res);
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    });
  }

}
