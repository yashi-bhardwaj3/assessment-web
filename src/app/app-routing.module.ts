import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Chart1Component} from "./dashboard/content/chart1/chart1.component";
import { Chart2Component} from "./dashboard/content/chart2/chart2.component";

const routes: Routes = [
  {path :'', redirectTo:'/login', pathMatch: 'full'},
  {path: 'login', component : LoginComponent},
  {path: 'signup', component : SignupComponent},
  {path: 'home', component : DashboardComponent, children:[
      {path: 'chart1', component : Chart1Component},
      {path: 'chart2', component : Chart2Component},
  ]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
