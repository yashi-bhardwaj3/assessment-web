import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Chart1Component } from './dashboard/content/chart1/chart1.component';
import { Chart2Component } from './dashboard/content/chart2/chart2.component';
import { ContentComponent } from './dashboard/content/content.component';
import { ChartServiceService } from "./service/chart-service.service";
import { AuthServiceService } from './service/auth-service.service';

import { ChartsModule } from 'ng2-charts';
import {TabModule } from 'angular-tabs-component';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    Chart1Component,
    Chart2Component,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    TabModule,
    NgxSpinnerModule
  ],
  providers: [ChartServiceService,AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
